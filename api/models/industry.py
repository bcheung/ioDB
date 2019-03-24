from api.db import db


class Industry3dModel(db.Model):
    __tablename__ = 'industries_3d'
    id = db.Column(db.String(), primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    industries_4d = db.relationship('Industry4dModel', backref='industry_3d')

    def __init__(self, id, title, total_employment, hourly_mean, hourly_median, annual_mean, annual_median, description=''):
        self.id = id
        self.title = title
        self.description = description
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median


class Industry4dModel(db.Model):
    __tablename__ = 'industries_4d'
    id = db.Column(db.String(), primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)

    industry_3d_id = db.Column(db.String(), db.ForeignKey('industries_3d.id'))
    # industry_3d = db.relationship('Industry3dModel')

    def __init__(self, id, title, total_employment, hourly_mean, hourly_median, annual_mean, annual_median, description=''):
        self.id = id
        self.title = title
        self.description = description
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median
