from config import db, ma


class Ind3dOccMajorModel(db.Model):
    __tablename__ = 'ind_3d_occ_major'
    industry_3d_id = db.Column(db.String(), db.ForeignKey(
        'industries_3d.id'), primary_key=True)
    occupation_major_id = db.Column(db.String(), db.ForeignKey(
        'occupations_major.id'), primary_key=True)

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

    industry_3d = db.relationship(
        'Industry3dModel', backref='occupations_major')
    occupation_major = db.relationship(
        'OccupationMajorModel', backref='industries_3d')

    def __init__(self, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90):
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


class Ind3dOccMajorSchema(ma.ModelSchema):
    class Meta:
        model = Ind3dOccMajorModel
        sqla_session = db.session


class Ind4dOccMajorModel(db.Model):
    __tablename__ = 'ind_4d_occ_major'
    industry_4d_id = db.Column(db.String(), db.ForeignKey(
        'industries_4d.id'), primary_key=True)
    occupation_major_id = db.Column(db.String(), db.ForeignKey(
        'occupations_major.id'), primary_key=True)

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

    industry_4d = db.relationship(
        'Industry4dModel', backref='occupations_major')
    occupation_major = db.relationship(
        'OccupationMajorModel', backref='industries_4d')

    def __init__(self, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90):
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


class Ind4dOccMajorSchema(ma.ModelSchema):
    class Meta:
        model = Ind4dOccMajorModel
        sqla_session = db.session


class Ind3dOccDetailedModel(db.Model):
    __tablename__ = 'ind_3d_occ_detailed'
    industry_3d_id = db.Column(db.String(), db.ForeignKey(
        'industries_3d.id'), primary_key=True)
    occupation_detailed_id = db.Column(db.String(), db.ForeignKey(
        'occupations_detailed.id'), primary_key=True)

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

    industry_3d = db.relationship(
        'Industry3dModel', backref='occupations_detailed')
    occupation_detailed = db.relationship(
        'OccupationDetailedModel', backref='industries_3d')

    def __init__(self, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90):
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


class Ind3dOccDetailedSchema(ma.ModelSchema):
    class Meta:
        model = Ind3dOccDetailedModel
        sqla_session = db.session


class Ind4dOccDetailedModel(db.Model):
    __tablename__ = 'ind_4d_occ_detailed'
    industry_4d_id = db.Column(db.String(), db.ForeignKey(
        'industries_4d.id'), primary_key=True)
    occupation_detailed_id = db.Column(db.String(), db.ForeignKey(
        'occupations_detailed.id'), primary_key=True)

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

    industry_4d = db.relationship(
        'Industry4dModel', backref='occupations_detailed')
    occupation_detailed = db.relationship(
        'OccupationDetailedModel', backref='industries_4d')

    def __init__(self, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90):
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


class Ind4dOccDetailedSchema(ma.ModelSchema):
    class Meta:
        model = Ind4dOccDetailedModel
        sqla_session = db.session
