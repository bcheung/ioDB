import psycopg2

class IndustryOcc:
    def __init__(self, id, name, industry_id, group, temp, pct_total, hMean, hPct10, hPct25, hMedian, hPct75, hPct90, aMean,
                 aPct10, aPct25, aMedian, aPct75, aPct90):
        self.id = id
        self.name = name
        self.industry_id = industry_id
        self.group = group
        self.temp = temp
        self.pct_total = pct_total
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

    def save_to_db(self):
        connection = psycopg2.connect(user='postgres', database='ioDBTest', host='localhost')
        with connection.cursor() as cursor:
            cursor.execute('INSERT INTO ioccupations '
                           'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, '
                           '%s, %s, %s, %s, %s, %s)',
                           (self.id, self.name, self.industry_id, self.group, self.temp, self.pct_total, self.hMean, self.hPct10,
                            self.hPct25, self.hMedian, self.hPct75, self.hPct90, self.aMean, self.aPct10, self.aPct25, self.aMedian,
                            self.aPct75, self.aPct90))
        connection.commit()
        connection.close()

