import datetime
import logging
import os
import socket

from flask import Flask, request, jsonify
import sqlalchemy
from sqlalchemy.inspection import inspect
from sqlalchemy import desc

import config
from config import app, db
from constants import all_model_switcher, all_schema_switcher, model_switcher, schema_switcher, joined_model_switcher, joined_schema_switcher, primary_key_switcher, joined_primary_key_switcher
from models.visit import Visit
from models.occupation import OccupationMajorModel, OccupationDetailedModel, OccupationMajorSchema, OccupationDetailedSchema
from models.industry import Industry3dModel, Industry4dModel, Industry3dSchema, Industry4dSchema
from models.location import StateModel, MetroAreaModel, StateSchema, MetroAreaSchema
from models.industry_occupation import Ind3dOccMajorModel, Ind4dOccMajorModel, Ind3dOccDetailedModel, Ind4dOccDetailedModel, Ind3dOccMajorSchema, Ind4dOccMajorSchema, Ind3dOccDetailedSchema, Ind4dOccDetailedSchema
from models.location_occupation import StateOccMajorModel, MetroAreaOccMajorModel, StateOccDetailedModel, MetroAreaOccDetailedModel, StateOccMajorSchema, MetroAreaOccMajorSchema, StateOccDetailedSchema, MetroAreaOccDetailedSchema


def is_ipv6(addr):
    """Checks if a given address is an IPv6 address."""
    try:
        socket.inet_pton(socket.AF_INET6, addr)
        return True
    except socket.error:
        return False

# @app.before_first_request
# def create_tables():
#     db.create_all()


@app.route('/api/')
def index():
    user_ip = request.remote_addr

    # Keep only the first two octets of the IP address.
    if is_ipv6(user_ip):
        user_ip = ':'.join(user_ip.split(':')[:2])
    else:
        user_ip = '.'.join(user_ip.split('.')[:2])

    visit = Visit(
        user_ip=user_ip,
        timestamp=datetime.datetime.utcnow()
    )

    db.session.add(visit)
    db.session.commit()

    visits = Visit.query.order_by(sqlalchemy.desc(Visit.timestamp)).limit(10)
    results = [
        'Time: {} Addr: {}'.format(x.timestamp, x.user_ip)
        for x in visits]
    output = 'Last 10 visits:\n{}'.format('\n'.join(results))

    return output, 200, {'Content-Type': 'text/plain; charset=utf-8'}


@app.route('/api/table/<tablename>')
def get_table(tablename):
    data = []
    model = all_model_switcher.get(tablename, None)
    schema = all_schema_switcher.get(tablename, None)
    if model != None and schema != None:
        for instance in model.query.all():
            data.append(schema().dump(instance).data)
    return jsonify(data)


@app.route('/api/instance/<tablename>/<id>')
def get_instance(tablename, id):
    data = {}
    model = model_switcher.get(tablename, None)
    schema = schema_switcher.get(tablename, None)
    if model != None and schema != None:
        instance = model.query.get(id)
        data = schema().dump(instance).data
    return jsonify(data)


@app.route('/api/joined_instance/<tablename>/<key_model>/<id>')
def get_joined_instance(tablename, key_model, id):
    data = []
    model = joined_model_switcher.get(tablename, None)
    schema = joined_schema_switcher.get(tablename, None)
    key = primary_key_switcher.get(key_model, None)
    if model != None and schema != None and key != None:
        for instance in model.query.filter_by(**{key: id}).all():
            data.append(schema().dump(instance).data)
    return jsonify(data)


@app.route('/api/joined_row/<tablename>/<id_1>/<id_2>')
def get_joined_row(tablename, id_1, id_2):
    data = {}
    model = joined_model_switcher.get(tablename, None)
    schema = joined_schema_switcher.get(tablename, None)
    if model != None and schema != None:
        instance = model.query.get((id_1, id_2))
        data = schema().dump(instance).data
    return jsonify(data)


@app.route('/api/list/<tablename>')
def get_list(tablename):
    data = []
    model = model_switcher.get(tablename, None)
    if model != None:
        for instance in model.query.with_entities(model.id, model.title):
            data.append({'id': instance.id, 'title': instance.title})
    return jsonify(data)


@app.route('/api/top_ten/<tablename>/<column_name>')
def get_top_ten(tablename, column_name):
    data = []
    model = model_switcher.get(tablename, None)
    if model != None:
        for instance in model.query.with_entities(model.id, model.title, column_name).order_by(desc(column_name)).limit(10):
            data.append({'id': instance.id, 'title': instance.title,
                         column_name: getattr(instance, column_name)})
    return jsonify(data)


@app.route('/api/joined_top_ten/<tablename>/<key_model>/<id>/<column_name>')
def get_joined_top_ten(tablename, key_model, id, column_name):
    data = []
    model = joined_model_switcher.get(tablename, None)
    schema = joined_schema_switcher.get(tablename, None)
    key = primary_key_switcher.get(key_model, None)
    if model != None and schema != None:
        for instance in model.query.filter_by(**{key: id}).order_by(desc(column_name)).limit(10):
            data.append(schema().dump(instance).data)
    return jsonify(data)


@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500


if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    # from config import db
    # db.init_app(app)
    app.run(host='127.0.0.1', port=8080, debug=True)
