from config import db, ma


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
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    state = db.relationship(
        'StateModel', backref='occupations_major')
    occupation_major = db.relationship(
        'OccupationMajorModel', backref='states')

    def __init__(self, total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_median, annual_mean, annual_median):
        self.total_employment = total_employment
        self.jobs_1000 = jobs_1000
        self.loc_quotient = loc_quotient
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median


class StateOccMajorSchema(ma.ModelSchema):
    class Meta:
        model = StateOccMajorModel
        sqla_session = db.session


class MetroAreaOccMajorModel(db.Model):
    __tablename__ = 'metro_area_occ_major'
    metro_area_id = db.Column(db.Integer, db.ForeignKey(
        'metro_areas.id'), primary_key=True)
    occupation_major_id = db.Column(db.String(), db.ForeignKey(
        'occupations_major.id'), primary_key=True)

    total_employment = db.Column(db.Integer)
    jobs_1000 = db.Column(db.Float)
    loc_quotient = db.Column(db.Float)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    metro_area = db.relationship(
        'MetroAreaModel', backref='occupations_major')
    occupation_major = db.relationship(
        'OccupationMajorModel', backref='metro_areas')

    def __init__(self, total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_median, annual_mean, annual_median):
        self.total_employment = total_employment
        self.jobs_1000 = jobs_1000
        self.loc_quotient = loc_quotient
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median


class MetroAreaOccMajorSchema(ma.ModelSchema):
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
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    state = db.relationship(
        'StateModel', backref='occupations_detailed')
    occupation_detailed = db.relationship(
        'OccupationDetailedModel', backref='states')

    def __init__(self, total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_median, annual_mean, annual_median):
        self.total_employment = total_employment
        self.jobs_1000 = jobs_1000
        self.loc_quotient = loc_quotient
        self.hourly_mean = hourly_mean
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median


class StateOccDetailedSchema(ma.ModelSchema):
    class Meta:
        model = StateOccDetailedModel
        sqla_session = db.session


class MetroAreaOccDetailedModel(db.Model):
    __tablename__ = 'metro_area_occ_detailed'
    metro_area_id = db.Column(db.Integer, db.ForeignKey(
        'metro_areas.id'), primary_key=True)
    occupation_detailed_id = db.Column(db.String(), db.ForeignKey(
        'occupations_detailed.id'), primary_key=True)

    total_employment = db.Column(db.Integer)
    jobs_1000 = db.Column(db.Float)
    loc_quotient = db.Column(db.Float)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    metro_area = db.relationship(
        'MetroAreaModel', backref='occupations_detailed')
    occupation_detailed = db.relationship(
        'OccupationDetailedModel', backref='metro_areas')

    def __init__(self, total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_median, annual_mean, annual_median):
        self.total_employment = total_employment
        self.jobs_1000 = jobs_1000
        self.loc_quotient = loc_quotient
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median


class MetroAreaOccDetailedSchema(ma.ModelSchema):
    class Meta:
        model = MetroAreaOccDetailedModel
        sqla_session = db.session
