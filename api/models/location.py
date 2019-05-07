from config import db, ma
from marshmallow import fields


class MetroAreaModel(db.Model):
    __tablename__ = 'metro_areas'
    id = db.Column(db.String(), primary_key=True)
    title = db.Column(db.String())
    state_symbol = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_10 = db.Column(db.Float)
    hourly_25 = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    hourly_75 = db.Column(db.Float)
    hourly_90 = db.Column(db.Float)
    annual_mean = db.Column(db.Integer)
    annual_10 = db.Column(db.Integer)
    annual_25 = db.Column(db.Integer)
    annual_median = db.Column(db.Integer)
    annual_75 = db.Column(db.Integer)
    annual_90 = db.Column(db.Integer)
    total_population = db.Column(db.Integer)

    state_id = db.Column(db.String(2), db.ForeignKey('states.id'))

    def __init__(self, id, title, state_symbol, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90, total_population=0):
        self.id = id
        self.title = title
        self.state_symbol = state_symbol
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_10 = hourly_10
        self.hourly_25 = hourly_25
        self.hourly_median = hourly_median
        self.hourly_75 = hourly_75
        self.hourly_90 = hourly_90
        self.annual_mean = annual_mean
        self.annual_10 = annual_10
        self.annual_25 = annual_25
        self.annual_median = annual_median
        self.annual_75 = annual_75
        self.annual_90 = annual_90
        self.total_population = total_population


class MetroAreaSchema(ma.ModelSchema):
    states = fields.Nested(
        'self', only=["id", "title"])

    class Meta:
        model = MetroAreaModel
        sqla_session = db.session


class StateModel(db.Model):
    __tablename__ = 'states'
    id = db.Column(db.String(2), primary_key=True)
    state_symbol = db.Column(db.String)
    title = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_10 = db.Column(db.Float)
    hourly_25 = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    hourly_75 = db.Column(db.Float)
    hourly_90 = db.Column(db.Float)
    annual_mean = db.Column(db.Integer)
    annual_10 = db.Column(db.Integer)
    annual_25 = db.Column(db.Integer)
    annual_median = db.Column(db.Integer)
    annual_75 = db.Column(db.Integer)
    annual_90 = db.Column(db.Integer)
    total_population = db.Column(db.Integer)

    metro_areas = db.relationship('MetroAreaModel', backref='states')

    def __init__(self, id, state_symbol, title, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90, total_population=0):
        self.id = id
        self.state_symbol = state_symbol
        self.title = title
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_10 = hourly_10
        self.hourly_25 = hourly_25
        self.hourly_median = hourly_median
        self.hourly_75 = hourly_75
        self.hourly_90 = hourly_90
        self.annual_mean = annual_mean
        self.annual_10 = annual_10
        self.annual_25 = annual_25
        self.annual_median = annual_median
        self.annual_75 = annual_75
        self.annual_90 = annual_90
        self.total_population = total_population


class StateSchema(ma.ModelSchema):
    metro_areas = fields.Nested(
        'self', only=["id", "title"], many=True)

    class Meta:
        model = StateModel
        sqla_session = db.session
        include_fk = True
