from config import db, ma


class OccupationDetailedModel(db.Model):
    __tablename__ = 'occupations_detailed'
    id = db.Column(db.String(), primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
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

    occupation_major_id = db.Column(
        db.String(), db.ForeignKey('occupations_major.id'))
    # occupations_detailed = db.relationship(
    #     'OccupationMajorModel', foreign_keys=occupation_major_id)

    def __init__(self, id, title, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90, description=''):
        self.id = id
        self.title = title
        self.description = description
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


class OccupationDetailedSchema(ma.ModelSchema):
    class Meta:
        model = OccupationDetailedModel
        sqla_session = db.session
        include_fk = True
        include_fk = True


class OccupationMajorModel(db.Model):
    __tablename__ = 'occupations_major'
    id = db.Column(db.String(), primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
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

    occupations_detailed = db.relationship(
        'OccupationDetailedModel', backref='occupation_major')

    def __init__(self, id, title, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90, description=''):
        self.id = id
        self.title = title
        self.description = description
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


class OccupationMajorSchema(ma.ModelSchema):
    class Meta:
        model = OccupationMajorModel
        sqla_session = db.session
        include_fk = True
