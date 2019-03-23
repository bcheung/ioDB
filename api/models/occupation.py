from db import db


class OccupationModel(db.Model):
    __tablename__ = 'ocupations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    description = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    annual_mean = db.Column(db.Integer)
    annual_median = db.Column(db.Integer)

    def __init__(self, id, name, description, total_employment, annual_mean, annual_median):
        self.id = id
        self.name = name
        self.description = ""
        self.total_employment = total_employment
        self.annual_mean = annual_mean
        self.annual_median = annual_median
