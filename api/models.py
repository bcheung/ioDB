from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Visit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime())
    user_ip = db.Column(db.String(46))

    def __init__(self, timestamp, user_ip):
        self.timestamp = timestamp
        self.user_ip = user_ip


class Industry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    description = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    annual_mean = db.Column(db.Integer)
    annual_median = db.Column(db.Integer)
    occupations = []

    def __init__(self, id, name, description, total_employment, annual_mean, annual_median):
        self.id = id
        self.name = name
        self.description = ""
        self.total_employment = total_employment
        self.annual_mean = annual_mean
        self.annual_median = annual_median
        self.occupations = []


class Occupation(db.Model):
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


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    location = db.Column(db.String())
    total_population = db.Column(db.Integer)
    occpations = []

    def __init__(self, id, name, total_population):
        self.id = id
        self.name = name
        self.location = ""
        self.total_population = total_population
        self.occupations = []
