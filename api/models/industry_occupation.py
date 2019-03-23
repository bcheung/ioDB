from db import db


class Ind3dOccMajorModel(db.Model):
    __tablename__ = 'ind_3d_occu_major'
    industry_3d_id = db.Column(db.Integer, db.ForeignKey(
        'industries_3d.id'), primary_key=True)
    occupation_major_id = db.Column(db.Integer, db.ForeignKey(
        'occupations_major.id'), primary_key=True)

    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    industry_3d = db.relationship(
        'Industry3dModel', backref='occupations_major')
    occupation_major = db.relationship(
        'OccupationMajorModel', backref='industries_3d')

    def __init__(self, total_employment, hourly_mean, hourly_median, annual_mean, annual_median):
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median


class Ind4dOccMajorModel(db.Model):
    __tablename__ = 'ind_4d_occu_major'
    industry_4d_id = db.Column(db.Integer, db.ForeignKey(
        'industries_4d.id'), primary_key=True)
    occupation_major_id = db.Column(db.Integer, db.ForeignKey(
        'occupations_major.id'), primary_key=True)

    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    industry_4d = db.relationship(
        'Industry4dModel', backref='occupations_major')
    occupation_major = db.relationship(
        'OccupationMajorModel', backref='industries_4d')

    def __init__(self, total_employment, hourly_mean, hourly_median, annual_mean, annual_median):
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median


class Ind3dOccDetailedModel(db.Model):
    __tablename__ = 'ind_3d_occu_detailed'
    industry_3d_id = db.Column(db.Integer, db.ForeignKey(
        'industries_3d.id'), primary_key=True)
    occupation_detailed_id = db.Column(db.Integer, db.ForeignKey(
        'occupations_detailed.id'), primary_key=True)

    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    industry_3d = db.relationship(
        'Industry3dModel', backref='occupations_detailed')
    occupation_detailed = db.relationship(
        'OccupationDetailedModel', backref='industries_3d')

    def __init__(self, total_employment, hourly_mean, hourly_median, annual_mean, annual_median):
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median


class Ind4dOccDetailedModel(db.Model):
    __tablename__ = 'ind_4d_occu_detailed'
    industry_4d_id = db.Column(db.Integer, db.ForeignKey(
        'industries_4d.id'), primary_key=True)
    occupation_detailed_id = db.Column(db.Integer, db.ForeignKey(
        'occupations_detailed.id'), primary_key=True)

    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    industry_4d = db.relationship(
        'Industry4dModel', backref='occupations_detailed')
    occupation_detailed = db.relationship(
        'OccupationDetailedModel', backref='industries_4d')

    def __init__(self, total_employment, hourly_mean, hourly_median, annual_mean, annual_median):
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median
