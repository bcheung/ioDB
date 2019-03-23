from db import db


class StateModel(db.Model):
    __tablename__ = 'states'
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(2))
    name = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    total_population = db.Column(db.Integer)

    metro_areas = db.relationship('MetroAreaModel', backref='state')

    def __init__(self, id, state, name, total_employment, total_population):
        self.id = id
        self.state = state
        self.name = name
        self.total_employment = total_employment
        self.total_population = total_population


class MetroAreaModel(db.Model):
    __tablename__ = 'metro_areas'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    total_population = db.Column(db.Integer)

    state_id = db.Column(db.Integer, db.ForeignKey('states.id'))
    # state = db.relationship('StateModel')

    def __init__(self, id, name, total_employment, total_population):
        self.id = id
        self.name = name
        self.total_employment = total_employment
        self.total_population = total_population
