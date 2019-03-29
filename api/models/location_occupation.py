from config import db, ma
from marshmallow import fields


class StateOccMajorModel(db.Model):
    __tablename__ = 'state_occ_major'
    state_id = db.Column(db.String(2), db.ForeignKey(
        'states.id'), primary_key=True)
    occupation_major_id = db.Column(db.String(), db.ForeignKey(
        'occupations_major.id'), primary_key=True)

    total_employment = db.Column(db.Integer)
    jobs_1000 = db.Column(db.Float)
    loc_quotient = db.Column(db.Float)
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

    state = db.relationship(
        'StateModel', backref='occupations_major')
    occupation_major = db.relationship(
        'OccupationMajorModel', backref='states')

    def __init__(self, total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90):
        self.total_employment = total_employment
        self.jobs_1000 = jobs_1000
        self.loc_quotient = loc_quotient
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


class StateOccMajorSchema(ma.ModelSchema):
    state = fields.Nested(
        'self', only=["id", "title"])
    occupation_major = fields.Nested(
        'self', only=["id", "title"])

    class Meta:
        model = StateOccMajorModel
        sqla_session = db.session


class MetroAreaOccMajorModel(db.Model):
    __tablename__ = 'metro_area_occ_major'
    metro_area_id = db.Column(db.String(), db.ForeignKey(
        'metro_areas.id'), primary_key=True)
    occupation_major_id = db.Column(db.String(), db.ForeignKey(
        'occupations_major.id'), primary_key=True)

    total_employment = db.Column(db.Integer)
    jobs_1000 = db.Column(db.Float)
    loc_quotient = db.Column(db.Float)
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

    metro_area = db.relationship(
        'MetroAreaModel', backref='occupations_major')
    occupation_major = db.relationship(
        'OccupationMajorModel', backref='metro_areas')

    def __init__(self, total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90):
        self.total_employment = total_employment
        self.jobs_1000 = jobs_1000
        self.loc_quotient = loc_quotient
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


class MetroAreaOccMajorSchema(ma.ModelSchema):
    metro_area = fields.Nested(
        'self', only=["id", "title"])
    occupation_detailed = fields.Nested(
        'self', only=["id", "title"])

    class Meta:
        model = MetroAreaOccMajorModel
        sqla_session = db.session


class StateOccDetailedModel(db.Model):
    __tablename__ = 'state_occ_detailed'
    state_id = db.Column(db.String(2), db.ForeignKey(
        'states.id'), primary_key=True)
    occupation_detailed_id = db.Column(db.String(), db.ForeignKey(
        'occupations_detailed.id'), primary_key=True)

    total_employment = db.Column(db.Integer)
    jobs_1000 = db.Column(db.Float)
    loc_quotient = db.Column(db.Float)
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

    state = db.relationship(
        'StateModel', backref='occupations_detailed')
    occupation_detailed = db.relationship(
        'OccupationDetailedModel', backref='states')

    def __init__(self, total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90):
        self.total_employment = total_employment
        self.jobs_1000 = jobs_1000
        self.loc_quotient = loc_quotient
        self.hourly_mean = hourly_mean
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


class StateOccDetailedSchema(ma.ModelSchema):
    state = fields.Nested(
        'self', only=["id", "title"])
    occupation_detailed = fields.Nested(
        'self', only=["id", "title"])

    class Meta:
        model = StateOccDetailedModel
        sqla_session = db.session


class MetroAreaOccDetailedModel(db.Model):
    __tablename__ = 'metro_area_occ_detailed'
    metro_area_id = db.Column(db.String(), db.ForeignKey(
        'metro_areas.id'), primary_key=True)
    occupation_detailed_id = db.Column(db.String(), db.ForeignKey(
        'occupations_detailed.id'), primary_key=True)

    total_employment = db.Column(db.Integer)
    jobs_1000 = db.Column(db.Float)
    loc_quotient = db.Column(db.Float)
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

    metro_area = db.relationship(
        'MetroAreaModel', backref='occupations_detailed')
    occupation_detailed = db.relationship(
        'OccupationDetailedModel', backref='metro_areas')

    def __init__(self, total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90):
        self.total_employment = total_employment
        self.jobs_1000 = jobs_1000
        self.loc_quotient = loc_quotient
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


class MetroAreaOccDetailedSchema(ma.ModelSchema):
    metro_area = fields.Nested(
        'self', only=["id", "title"])
    occupation_detailed = fields.Nested(
        'self', only=["id", "title"])

    class Meta:
        model = MetroAreaOccDetailedModel
        sqla_session = db.session
