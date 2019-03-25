import datetime
import logging
import os
import socket

from flask import Flask, request, jsonify
import sqlalchemy

import config
from config import app, db
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


all_model_switcher = {
    'occupations_major': OccupationMajorModel,
    'occupations_detailed': OccupationDetailedModel,
    'industries_3d': Industry3dModel,
    'industries_4d': Industry4dModel,
    'states': StateModel,
    'metro_areas': MetroAreaModel,
    'ind_3d_occ_major': Ind3dOccMajorModel,
    'ind_4d_occ_major': Ind4dOccMajorModel,
    'ind_3d_occ_detailed': Ind3dOccDetailedModel,
    'ind_4d_occ_detailed': Ind4dOccDetailedModel,
    'state_occ_major': StateOccMajorModel,
    'metro_area_occ_major': MetroAreaOccMajorModel,
    'state_occ_detailed': StateOccDetailedModel,
    'metro_area_occ_detailed': MetroAreaOccDetailedModel
}

all_schema_switcher = {
    'occupations_major': OccupationMajorSchema,
    'occupations_detailed': OccupationDetailedSchema,
    'industries_3d': Industry3dSchema,
    'industries_4d': Industry4dSchema,
    'states': StateSchema,
    'metro_areas': MetroAreaSchema,
    'ind_3d_occ_major': Ind3dOccMajorSchema,
    'ind_4d_occ_major': Ind4dOccMajorSchema,
    'ind_3d_occ_detailed': Ind3dOccDetailedSchema,
    'ind_4d_occ_detailed': Ind4dOccDetailedSchema,
    'state_occ_major': StateOccMajorSchema,
    'metro_area_occ_major': MetroAreaOccMajorSchema,
    'state_occ_detailed': StateOccDetailedSchema,
    'metro_area_occ_detailed': MetroAreaOccDetailedSchema
}

model_switcher = {
    'occupations_major': OccupationMajorModel,
    'occupations_detailed': OccupationDetailedModel,
    'industries_3d': Industry3dModel,
    'industries_4d': Industry4dModel,
    'states': StateModel,
    'metro_areas': MetroAreaModel
}

schema_switcher = {
    'occupations_major': OccupationMajorSchema,
    'occupations_detailed': OccupationDetailedSchema,
    'industries_3d': Industry3dSchema,
    'industries_4d': Industry4dSchema,
    'states': StateSchema,
    'metro_areas': MetroAreaSchema
}


@app.route('/api/<tablename>')
def get_table(tablename):
    data = []
    model = all_model_switcher.get(tablename, None)
    schema = all_schema_switcher.get(tablename, None)
    if model != None and schema != None:
        for instance in model.query.all():
            data.append(schema().dump(instance).data)
    return jsonify(data)


@app.route('/api/list/<tablename>')
def list_table(tablename):
    data = []
    model = model_switcher.get(tablename, None)
    if model != None:
        for instance in model.query.with_entities(model.id, model.title):
            data.append({'value': instance.id, 'label': instance.title})
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
