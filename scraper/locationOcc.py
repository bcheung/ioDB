import psycopg2

class LocationOcc:
    def __init__(self, id, name, location_id, group, temployed, jobs1000, locquotient,
                 hmean, hpct10, hpct25, hmedian, hpct75, hpct90, amean, apct10, apct25, amedian, apct75, apct90):
        self.id = id
        self.name = name
        self.location_id = location_id
        self.group = group
        self.temployed = temployed
        self.jobs1000 = jobs1000
        self.locquotient = locquotient
        self.hmean = hmean
        self.hpct10 = hpct10
        self.hpct25 = hpct25
        self.hmedian = hmedian
        self.hpct75 = hpct75
        self.hpct90 = hpct90
        self.amean = amean
        self.apct10 = apct10
        self.apct25 = apct25
        self.amedian = amedian
        self.apct75 = apct75
        self.apct90 = apct90

    def save_to_db(self):
        connection = psycopg2.connect(user='postgres', database='ioDBTest', host='localhost')
        with connection.cursor() as cursor:
            cursor.execute('INSERT INTO loccupations '
                           'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, '
                           '%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                           (self.id, self.name, self.location_id, self.group, self.temployed, self.jobs1000, self.locquotient,
                            self.hmean, self.hpct10, self.hpct25, self.hmedian, self.hpct75, self.hpct90,
                            self.amean, self.apct10, self.apct25, self.amedian, self.apct75, self.apct90))
        connection.commit()
        connection.close()

