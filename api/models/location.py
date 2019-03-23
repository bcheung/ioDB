from db import db


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
