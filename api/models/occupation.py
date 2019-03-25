from config import db, ma


class OccupationDetailedModel(db.Model):
    __tablename__ = 'occupations_detailed'
    id = db.Column(db.String(), primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    occupation_major_id = db.Column(
        db.String(), db.ForeignKey('occupations_major.id'))
    # occupations_detailed = db.relationship(
    #     'OccupationMajorModel', foreign_keys=occupation_major_id)

    def __init__(self, id, title, total_employment, hourly_mean, hourly_median, annual_mean, annual_median, description=''):
        self.id = id
        self.title = title
        self.description = description
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median


class OccupationDetailedSchema(ma.ModelSchema):
    class Meta:
        model = OccupationDetailedModel
        sqla_session = db.session


class OccupationMajorModel(db.Model):
    __tablename__ = 'occupations_major'
    id = db.Column(db.String(), primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    occupations_detailed = db.relationship(
        'OccupationDetailedModel', backref='occupation_major')

    def __init__(self, id, title, total_employment, hourly_mean, hourly_median, annual_mean, annual_median, description=''):
        self.id = id
        self.title = title
        self.description = description
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median


class OccupationMajorSchema(ma.ModelSchema):
    class Meta:
        model = OccupationMajorModel
        sqla_session = db.session
