import datetime
import logging
import os
import socket

from flask import Flask, request, jsonify
import sqlalchemy

import config
from config import app, db
from models.visit import Visit
from models.industry import Industry3dModel, Industry4dModel
from models.occupation import OccupationMajorModel, OccupationDetailedModel, OccupationMajorSchema, OccupationDetailedSchema
from models.location import StateModel, MetroAreaModel
from models.industry_occupation import Ind3dOccMajorModel, Ind4dOccMajorModel, Ind3dOccDetailedModel, Ind4dOccDetailedModel
from models.location_occupation import StateOccMajorModel, MetroAreaOccMajorModel, StateOccDetailedModel, MetroAreaOccDetailedModel


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


@app.route('/api/hello')
def hello_world():
    return 'Hello, World!'


@app.route('/api/occupations_major')
def occupations_major():
    occ_major_schema = OccupationMajorSchema()
    data = []
    for occupation in OccupationMajorModel.query.all():
        data.append(occ_major_schema.dump(occupation).data)
    return jsonify(data)


@app.route('/api/list/occupations_major')
def list_occupations_major():
    data = []
    for occupation in OccupationMajorModel.query.with_entities(OccupationMajorModel.id, OccupationMajorModel.title):
        data.append({'value': occupation.id, 'label': occupation.title})
    return jsonify(data)


@app.route('/api/list/industries_3d')
def list_industries_3d():
    data = []
    for industry in Industry3dModel.query.with_entities(Industry3dModel.id, Industry3dModel.title):
        data.append({'value': industry.id, 'label': industry.title})
    return jsonify(data)


@app.route('/api/list/states')
def list_states():
    data = []
    for state in StateModel.query.with_entities(StateModel.id, StateModel.name):
        data.append({'value': state.id, 'label': state.name})
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
