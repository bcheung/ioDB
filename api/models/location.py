from config import db, ma


class MetroAreaModel(db.Model):
    __tablename__ = 'metro_areas'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)
    total_population = db.Column(db.Integer)

    state_id = db.Column(db.String(2), db.ForeignKey('states.id'))

    def __init__(self, id, title, total_employment, hourly_mean, hourly_median, annual_mean, annual_median, total_population=0):
        self.id = id
        self.title = title
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median
        self.total_population = total_population


class MetroAreaSchema(ma.ModelSchema):
    class Meta:
        model = MetroAreaModel
        sqla_session = db.session


class StateModel(db.Model):
    __tablename__ = 'states'
    id = db.Column(db.String(2), primary_key=True)
    title = db.Column(db.String())
    total_employment = db.Column(db.Integer)
    hourly_mean = db.Column(db.Float)
    hourly_median = db.Column(db.Float)
    annual_mean = db.Column(db.Float)
    annual_median = db.Column(db.Float)
    total_population = db.Column(db.Integer)

    metro_areas = db.relationship('MetroAreaModel', backref='state')

    def __init__(self, id, title, total_employment, hourly_mean, hourly_median, annual_mean, annual_median, total_population=0):
        self.id = id
        self.title = title
        self.total_employment = total_employment
        self.hourly_mean = hourly_mean
        self.hourly_median = hourly_median
        self.annual_mean = annual_mean
        self.annual_median = annual_median
        self.total_population = total_population


class StateSchema(ma.ModelSchema):
    class Meta:
        model = StateModel
        sqla_session = db.session
