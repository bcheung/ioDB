import psycopg2

class Industry:
    def __init__(self, id, name, tEmployed, hMean, hPct10, hPct25, hMedian, hPct75, hPct90, aMean, aPct10, aPct25, aMedian, aPct75, aPct90):
        self.id = id
        self.name = name
        self.tEmployed = tEmployed
        self.hMean = hMean
        self.hPct10 = hPct10
        self.hPct25 = hPct25
        self.hMedian = hMedian
        self.hPct75 = hPct75
        self.hPct90 = hPct90
        self.aMean = aMean
        self.aPct10 = aPct10
        self.aPct25 = aPct25
        self.aMedian = aMedian
        self.aPct75 = aPct75
        self.aPct90 = aPct90

    def __repr__(self):
        return "<Industry {}>".format(self.id)

    def save_to_db(self):
        connection = psycopg2.connect(user='postgres', database='ioDBTest', host='localhost')
        with connection.cursor() as cursor:
            cursor.execute('INSERT INTO industries '
                           'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                           (self.id, self.name, self.tEmployed, self.hMean, self.hPct10, self.hPct25, self.hMedian, self.hPct75, self.hPct90,
                            self.aMean, self.aPct10, self.aPct25, self.aMedian, self.aPct75, self.aPct90))

        connection.commit()
        connection.close()





















