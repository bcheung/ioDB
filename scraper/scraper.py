from industry import Industry
from industryOcc import IndustryOcc
from location import Location
from locationOcc import LocationOcc
from occupation import Occupation
import csv
import locale
import psycopg2


Industries = []
Occupations = []
Cities = []


locale.setlocale( locale.LC_ALL, 'en_US.UTF-8')


# Populating our Industry table
with open('IndustryData.csv', 'r') as f:
    count = 0
    reader = csv.reader(f)
    for line in reader:
        if count > 0:
            industry_data = line
            if industry_data[2] == "00-0000":
                id = industry_data[0]
                name = industry_data[1]
                tEmployed = locale.atoi(industry_data[5])
                aMean = industry_data[10]
                aMean = locale.atoi(industry_data[10])
                aPct10 = locale.atoi(industry_data[17])
                aPct25 = locale.atoi(industry_data[18])
                aMedian = locale.atoi(industry_data[19])
                aPct75 = locale.atoi(industry_data[20])
                aPct90 = industry_data[21]
                if aPct90 != "#":
                    aPct90 = locale.atoi(aPct90)
                else:
                    aPct90 = 208000
                hMean = locale.atof(industry_data[9])
                hPct10 = locale.atof(industry_data[12])
                hPct25 = locale.atof(industry_data[13])
                hMedian = locale.atof(industry_data[14])
                hPct75 = locale.atof(industry_data[15])

                hPct90 = industry_data[16]
                if hPct90 != "#":
                    hPct90 = locale.atof(hPct90)
                else:
                    hPct90 = 100.00
                ind = Industry(id, name, tEmployed, hMean, hPct10, hPct25, hMedian, hPct75, hPct90, aMean, aPct10,
                aPct25, aMedian, aPct75, aPct90)

                # ADD TO INDUSTRIES TABLE

                ind.save_to_db()
            else:

                # This part populates our ioconnections table

                if industry_data[4] == "major" or industry_data[4] == "detailed":
                    connection = psycopg2.connect(user='postgres', database='ioDBTest', host='localhost')
                    with connection.cursor() as cursor:
                        cursor.execute('INSERT INTO ioconns (industry_id, occupation_id) VALUES (%s, %s)',
                                       (industry_data[0], industry_data[2]))

                    connection.commit()
                    connection.close()
        count += 1




# Populating our Industry Occupation table
with open('IndustryData.csv', 'r') as f:
    count = 0
    reader = csv.reader(f)
    for line in reader:
        if count > 0:
            occupation_data = line
            if occupation_data[2] != "00-0000":
                if occupation_data[4] == "detailed" or occupation_data[4] == "major":
                    id = occupation_data[2]
                    name = occupation_data[3]
                    industry_id = occupation_data[0]
                    group = occupation_data[4]
                    temp = occupation_data[5]
                    if temp != "**":
                        temp = locale.atoi(temp)
                    else:
                        temp = locale.atoi("0")
                    pct_total = occupation_data[7]
                    if pct_total == "~" or pct_total == "**":
                        pct_total = 0.0
                    else:
                        pct_total = locale.atof(pct_total)
                    aMean = occupation_data[10]
                    if aMean == "*":
                        aMean = locale.atoi("0")
                    elif aMean == "#":
                        aMean = 208000
                    else:
                        aMean = locale.atoi(aMean)
                    aPct10 = occupation_data[17]
                    if aPct10 == "*":
                        aPct10 = locale.atoi("0")
                    elif aPct10 == "#":
                        aPct10 = 208000
                    else:
                        aPct10 = locale.atoi(aPct10)
                    aPct25 = occupation_data[18]
                    if aPct25 == "*":
                        aPct25 = locale.atoi("0")
                    elif aPct25 == "#":
                        aPct25 = 208000
                    else:
                        aPct25 = locale.atoi(aPct25)
                    aMedian = occupation_data[19]
                    if aMedian == "*":
                        aMedian = locale.atoi("0")
                    elif aMedian == "#":
                        aMedian = 208000
                    else:
                        aMedian = locale.atoi(aMedian)
                    aPct75 = occupation_data[20]
                    if aPct75 == "*":
                        aPct75 = locale.atoi("0")
                    elif aPct75 == "#":
                        aPct75 = 208000
                    else:
                        aPct75 = locale.atoi(aPct75)
                    aPct90 = occupation_data[21]
                    if aPct90 == "*":
                        aPct90 = locale.atoi("0")
                    elif aPct90 == "#":
                        aPct90 = 208000
                    else:
                        aPct90 = locale.atof(aPct90)
                    hMean = occupation_data[9]
                    if hMean == "*":
                        hMean = locale.atof("0.0")
                    elif hMean == "#":
                        hMean = 100.00
                    else:
                        hMean = locale.atof(hMean)
                    hPct10 = occupation_data[12]
                    if hPct10 == "*":
                        hPct10 = locale.atof("0.0")
                    elif hPct10 == "#":
                        hPct10 = 100.00
                    else:
                        hPct10 = locale.atof(hPct10)
                    hPct25 = occupation_data[13]
                    if hPct25 == "*":
                        hPct25 = locale.atof("0.0")
                    elif hPct25 == "#":
                        hPct25 = 100.00
                    else:
                        hPct25 = locale.atof(hPct25)
                    hMedian = occupation_data[14]
                    if hMedian == "*":
                        hMedian = locale.atof("0.0")
                    elif hMedian == "#":
                        hMedian = 100.00
                    else:
                        hMedian = locale.atof(hMedian)
                    hPct75 = occupation_data[15]
                    if hPct75 == "*":
                        hPct75 = locale.atof("0.0")
                    elif hPct75 == "#":
                        hPct75 = 100.00
                    else:
                        hPct75 = locale.atof(hPct75)
                    hPct90 = occupation_data[16]
                    if hPct90 == "*":
                        hPct90 = locale.atof("0.0")
                    elif hPct90 == "#":
                        hPct90 = 100.00
                    else:
                        hPct90 = locale.atof(hPct90)
                    indOcc = IndustryOcc(id, name, industry_id, group, temp, pct_total, hMean, hPct10,
                                         hPct25, hMedian, hPct75, hPct90, aMean, aPct10, aPct25, aMedian,
                                         aPct75, aPct90)
                    indOcc.save_to_db()

        count += 1



#
with open('Metropolitan.csv', 'r') as f:
    count = 0
    reader = csv.reader(f)
    for line in reader:
        if count > 0:
            location_data = line
            if location_data[3] == "00-0000":
                id = location_data[1]
                area = location_data[2].split(",")
                name = area[0]
                type = "city"
                state = location_data[0]
                tEmployed = locale.atoi(location_data[6])
                aMean = locale.atoi(location_data[11])
                apct10 = locale.atoi(location_data[18])
                apct25 = locale.atoi(location_data[19])
                aMedian = locale.atoi(location_data[20])
                apct75 = locale.atoi(location_data[21])
                apct90 = locale.atoi(location_data[22])
                hmean = locale.atof(location_data[10])
                hpct10 = locale.atof(location_data[13])
                hpct25 = locale.atof(location_data[14])
                hmedian = locale.atof(location_data[15])
                hpct75 = locale.atof(location_data[16])
                hpct90 = locale.atof(location_data[17])

                city = Location(id, name, type, state, tEmployed, hmean, hpct10, hpct25, hmedian, hpct75, hpct90,
                                aMean, apct10, apct25, aMedian, apct75, apct90)
                city.save_to_db()
            else:
                connection = psycopg2.connect(user='postgres', database='ioDBTest', host='localhost')
                with connection.cursor() as cursor:
                    cursor.execute('INSERT INTO loconns (location_id, occupation_id) '
                                   'VALUES (%s, %s)',
                                   (location_data[1], location_data[3]))
                connection.commit()
                connection.close()
        count += 1


with open('Metropolitan.csv', 'r') as f:
    count = 0
    reader = csv.reader(f)
    for line in reader:
        if count > 0:
            location_data = line
            if location_data[3] != "00-0000":
                id = location_data[3]
                name = location_data[4]
                location_id = location_data[1]
                group = location_data[5]
                temployed = location_data[6]
                if temployed == "**":
                    temployed = 0
                else:
                    temployed = locale.atoi(temployed)

                jobs1000 = location_data[8]
                if jobs1000 == "**":
                    jobs1000 = 0.0
                else:
                    jobs1000 = locale.atof(jobs1000)

                locquotient = location_data[9]
                if locquotient == "**":
                    locquotient = 0.0
                else:
                    locquotient = locale.atof(locquotient)

                hmean = location_data[10]
                if hmean == "*":
                    hmean = 0.0
                elif hmean == "#":
                    hmean = 100.00
                else:
                    hmean = locale.atof(hmean)

                hpct10 = location_data[13]
                if hpct10 == "*":
                    hpct10 = 0.0
                elif hpct10 == "#":
                    hpct10 = 100.00
                else:
                    hpct10 = locale.atof(hpct10)

                hpct25 = location_data[14]
                if hpct25 == "*":
                    hpct25 = 0.0
                elif hpct25 == "#":
                    hpct25 = 100.00
                else:
                    hpct25 = locale.atof(hpct25)

                hmedian = location_data[15]
                if hmedian == "*":
                    hmedian = 0.0
                elif hmedian == "#":
                    hmedian = 100.00
                else:
                    hmedian = locale.atof(hmedian)

                hpct75 = location_data[16]
                if hpct75 == "*":
                    hpct75 = 0.0
                elif hpct75 == "#":
                    hpct75 = 100.00
                else:
                    hpct75 = locale.atof(hpct75)

                hpct90 = location_data[17]
                if hpct90 == "*":
                    hpct90 = 0.0
                elif hpct90 == "#":
                    hpct90 = 100.00
                else:
                    hpct90 = locale.atof(hpct90)

                amean = location_data[11]
                if amean == "*":
                    amean = 0
                elif amean == "#":
                    amean = 208000
                else:
                    amean = locale.atoi(amean)

                apct10 = location_data[18]
                if apct10 == "*":
                    apct10 = 0
                elif apct10 == "#":
                    apct10 = 208000
                else:
                    apct10 = locale.atoi(apct10)

                apct25 = location_data[19]
                if apct25 == "*":
                    apct25 = 0
                elif apct25 == "#":
                    apct25 = 208000
                else:
                    apct25 = locale.atoi(apct25)

                amedian = location_data[20]
                if amedian == "*":
                    amedian = 0
                elif amedian == "#":
                    amedian = 208000
                else:
                    amedian = locale.atoi(amedian)

                apct75 = location_data[21]
                if apct75 == "*":
                    apct75 = 0
                elif apct75 == "#":
                    apct75 = 208000
                else:
                    apct75 = locale.atoi(apct75)

                apct90 = location_data[22]
                if apct90 == "*":
                    apct90 = 0
                elif apct90 == "#":
                    apct90 = 208000
                else:
                    apct90 = locale.atoi(apct90)

                locOcc = LocationOcc(id, name, location_id, group, temployed, jobs1000, locquotient, hmean,
                                     hpct10, hpct25, hmedian, hpct75, hpct90, amean, apct10, apct25, amedian,
                                     apct75, apct90)

                locOcc.save_to_db()
        count += 1


with open('state.csv', 'r') as f:
    count = 0
    reader = csv.reader(f)
    for line in reader:
        if count > 0:
            location_data = line
            if location_data[3] == "00-0000":
                id = location_data[0]
                name = location_data[2]
                type = "state"
                state = location_data[1]
                tEmployed = locale.atoi(location_data[6])
                aMean = locale.atoi(location_data[11])
                apct10 = locale.atoi(location_data[18])
                apct25 = locale.atoi(location_data[19])
                aMedian = locale.atoi(location_data[20])
                apct75 = locale.atoi(location_data[21])
                apct90 = locale.atoi(location_data[22])
                hmean = locale.atof(location_data[10])
                hpct10 = locale.atof(location_data[13])
                hpct25 = locale.atof(location_data[14])
                hmedian = locale.atof(location_data[15])
                hpct75 = locale.atof(location_data[16])
                hpct90 = locale.atof(location_data[17])

                city = Location(id, name, type, state, tEmployed, hmean, hpct10, hpct25, hmedian, hpct75, hpct90,
                                aMean, apct10, apct25, aMedian, apct75, apct90)
                city.save_to_db()

                Cities.append(city)
            else:
                connection = psycopg2.connect(user='postgres', database='ioDBTest', host='localhost')
                with connection.cursor() as cursor:
                    cursor.execute('INSERT INTO loconns (location_id, occupation_id) '
                                   'VALUES (%s, %s)',
                                   (location_data[0], location_data[3]))
                connection.commit()
                connection.close()
        count += 1


with open('state.csv', 'r') as f:
    count = 0
    reader = csv.reader(f)
    for line in reader:
        if count > 0:
            location_data = line
            if location_data[3] != "00-0000":
                id = location_data[3]
                name = location_data[4]
                location_id = location_data[0]
                group = location_data[5]
                temployed = location_data[6]
                if temployed == "**":
                    temployed = 0
                else:
                    temployed = locale.atoi(temployed)

                jobs1000 = location_data[8]
                if jobs1000 == "**":
                    jobs1000 = 0.0
                else:
                    jobs1000 = locale.atof(jobs1000)

                locquotient = location_data[9]
                if locquotient == "**":
                    locquotient = 0.0
                else:
                    locquotient = locale.atof(locquotient)

                hmean = location_data[10]
                if hmean == "*":
                    hmean = 0.0
                elif hmean == "#":
                    hmean = 100.00
                else:
                    hmean = locale.atof(hmean)

                hpct10 = location_data[13]
                if hpct10 == "*":
                    hpct10 = 0.0
                elif hpct10 == "#":
                    hpct10 = 100.00
                else:
                    hpct10 = locale.atof(hpct10)

                hpct25 = location_data[14]
                if hpct25 == "*":
                    hpct25 = 0.0
                elif hpct25 == "#":
                    hpct25 = 100.00
                else:
                    hpct25 = locale.atof(hpct25)

                hmedian = location_data[15]
                if hmedian == "*":
                    hmedian = 0.0
                elif hmedian == "#":
                    hmedian = 100.00
                else:
                    hmedian = locale.atof(hmedian)

                hpct75 = location_data[16]
                if hpct75 == "*":
                    hpct75 = 0.0
                elif hpct75 == "#":
                    hpct75 = 100.00
                else:
                    hpct75 = locale.atof(hpct75)

                hpct90 = location_data[17]
                if hpct90 == "*":
                    hpct90 = 0.0
                elif hpct90 == "#":
                    hpct90 = 100.00
                else:
                    hpct90 = locale.atof(hpct90)

                amean = location_data[11]
                if amean == "*":
                    amean = 0
                elif amean == "#":
                    amean = 208000
                else:
                    amean = locale.atoi(amean)

                apct10 = location_data[18]
                if apct10 == "*":
                    apct10 = 0
                elif apct10 == "#":
                    apct10 = 208000
                else:
                    apct10 = locale.atoi(apct10)

                apct25 = location_data[19]
                if apct25 == "*":
                    apct25 = 0
                elif apct25 == "#":
                    apct25 = 208000
                else:
                    apct25 = locale.atoi(apct25)

                amedian = location_data[20]
                if amedian == "*":
                    amedian = 0
                elif amedian == "#":
                    amedian = 208000
                else:
                    amedian = locale.atoi(amedian)

                apct75 = location_data[21]
                if apct75 == "*":
                    apct75 = 0
                elif apct75 == "#":
                    apct75 = 208000
                else:
                    apct75 = locale.atoi(apct75)

                apct90 = location_data[22]
                if apct90 == "*":
                    apct90 = 0
                elif apct90 == "#":
                    apct90 = 208000
                else:
                    apct90 = locale.atoi(apct90)

                locOcc = LocationOcc(id, name, location_id, group, temployed, jobs1000, locquotient, hmean,
                                     hpct10, hpct25, hmedian, hpct75, hpct90, amean, apct10, apct25, amedian,
                                     apct75, apct90)

                locOcc.save_to_db()

                Occupations.append(locOcc)
        count += 1


with open('OccupationData.csv', 'r') as f:
    count = 0
    reader = csv.reader(f)
    for line in reader:
        if count > 0:
            occupation_data = line
            if occupation_data[4] == "Cross-industry":
                if occupation_data[8] != "minor" and occupation_data[8] != "broad":
                    id = occupation_data[6]
                    name = occupation_data[7]
                    group = occupation_data[8]
                    temployed = occupation_data[9]
                    if temployed == "**":
                        temployed = 0
                    else:
                        temployed = locale.atoi(temployed)
                    hmean = occupation_data[14]
                    if hmean == "*":
                        hmean = 0.0
                    elif hmean == "#":
                        hmean = 100.00
                    else:
                        hmean = locale.atof(hmean)
                    hpct10 = occupation_data[17]
                    if hpct10 == "*":
                        hpct10 = 0.0
                    elif hpct10 == "#":
                        hpct10 = 100.00
                    else:
                        hpct10 = locale.atof(hpct10)
                    hpct25 = occupation_data[18]
                    if hpct25 == "*":
                        hpct25 = 0.0
                    elif hpct25 == "#":
                        hpct25 = 100.00
                    else:
                        hpct25 = locale.atof(hpct25)
                    hmedian = occupation_data[19]
                    if hmedian == "*":
                        hmedian = 0.0
                    elif hmedian == "#":
                        hmedian = 100.00
                    else:
                        hmedian = locale.atof(hmedian)
                    hpct75 = occupation_data[20]
                    if hpct75 == "*":
                        hpct75 = 0.0
                    elif hpct75 == "#":
                        hpct75 = 100.00
                    else:
                        hpct75 = locale.atof(hpct75)
                    hpct90 = occupation_data[21]
                    if hpct90 == "*":
                        hpct90 = 0.0
                    elif hpct90 == "#":
                        hpct90 = 100.00
                    else:
                        hpct90 = locale.atof(hpct90)
                    amean = occupation_data[15]
                    if amean == "*":
                        amean = 0
                    elif amean == "#":
                        amean = 208000
                    else:
                        amean = locale.atoi(amean)
                    apct10 = occupation_data[22]
                    if apct10 == "*":
                        apct10 = 0
                    elif apct10 == "#":
                        apct10 = 208000
                    else:
                        apct10 = locale.atoi(apct10)
                    apct25 = occupation_data[23]
                    if apct25 == "*":
                        apct25 = 0
                    elif apct25 == "#":
                        apct25 = 208000
                    else:
                        apct25 = locale.atoi(apct25)
                    amedian = occupation_data[24]
                    if amedian == "*":
                        amedian = 0
                    elif amedian == "#":
                        amedian = 208000
                    else:
                        amedian = locale.atoi(amedian)
                    apct75 = occupation_data[25]
                    if apct75 == "*":
                        apct75 = 0
                    elif apct75 == "#":
                        apct75 = 208000
                    else:
                        apct75 = locale.atoi(apct75)
                    apct90 = occupation_data[26]
                    if apct90 == "*":
                        apct90 = 0
                    elif apct90 == "#":
                        apct90 = 208000
                    else:
                        apct90 = locale.atoi(apct90)
                    occ = Occupation(id, name, group, temployed, hmean, hpct10, hpct25, hmedian,
                                     hpct75, hpct90, amean, apct10, apct25, amedian, apct75, apct90)
                    occ.save_to_db()
            else:
                break
        count += 1
