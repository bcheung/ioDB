from industry import Industry
from occupation import Occupation
from city import City
from locationOcc import LocationOcc
import csv
import locale


Industries = []
Occupations = []
Cities = []


locale.setlocale( locale.LC_ALL, 'en_US.UTF-8')


# Populating our Industry objects
with open('IndustryData.csv', 'r') as f:
    count = 0
    reader = csv.reader(f)
    for line in reader:
        if count > 0:
            industry_data = line
            if industry_data[2] == "00-0000":
                id = industry_data[0]
                name = industry_data[1]
                tot_emp = industry_data[5].split(",")
                tEmployed = locale.atoi(industry_data[5])
                aMean = locale.atof(industry_data[10])
                aMedian = locale.atof(industry_data[19])
                ind = Industry(id, name, tEmployed, aMean, aMedian)
                Industries.append(ind)
            else:
                for industry in Industries:
                    if industry.name == industry_data[1]:
                        if industry_data[4] != "detailed":
                            industry.occupations.append(industry_data[3])
        count += 1



# Populating our Occupation database
with open('IndustryData.csv', 'r') as f:
    count = 0
    reader = csv.reader(f)
    for line in reader:
        if count > 0:
            occupation_data = line
            print(occupation_data)
            if occupation_data[2] != "00-0000":
                if occupation_data[4] != "detailed":
                    id = occupation_data[2]
                    name = occupation_data[3]
                    employed = occupation_data[5]
                    if employed != "**":
                        employed = locale.atoi(employed)
                    else:
                        employed = locale.atoi("0")
                    aMean = occupation_data[10]
                    if aMean == "*" or aMean == "#":
                        aMean = locale.atof("0.0")
                    else:
                        aMean = locale.atof(aMean)
                    aMedian = occupation_data[19]
                    if aMedian == "*" or aMedian == "#":
                        aMedian = locale.atof("0.0")
                    else:
                        aMedian = locale.atof(aMedian)
                    industry = occupation_data[1]
                    isPresent = False
                    for occupation in Occupations:
                        if occupation.id == id:
                            isPresent = True
                            occupation.totalEmployed += employed
                            occupation.aMeans.append(aMean)
                            occupation.aMedians.append(aMedian)
                            occupation.industries.append(industry)
                            break
                    if isPresent is False:
                        o = Occupation(id, name)
                        o.totalEmployed += employed
                        o.aMedians.append(aMedian)
                        o.aMeans.append(aMean)
                        o.industries.append(industry)
                        Occupations.append(o)
        count += 1
    for occupation in Occupations:
        occupation.aMean = sum(occupation.aMeans) / len(occupation.aMeans)
        occupation.aMedian = sum(occupation.aMedians) / len(occupation.aMedians)


with open('Metropolitan.csv', 'r') as f:
    count = 0
    reader = csv.reader(f)
    for line in reader:
        if count > 0:
            location_data = line
            print(location_data)
            if location_data[3] == "00-0000":
                id = location_data[1]
                area = location_data[2].split(",")
                name = area[0]
                state = location_data[0]
                tEmployed = locale.atoi(location_data[6])
                aMean = locale.atof(location_data[11])
                aMedian = locale.atof(location_data[20])
                city = City(id, name, state, tEmployed, aMean, aMedian)
                Cities.append(city)
            else:
                if location_data[5] != "major":
                    id = location_data[3]
                    name = location_data[4]

                    employed = location_data[6]
                    if employed == "**":
                        employed = locale.atoi("0")
                    else:
                        employed = locale.atoi(employed)

                    quotient = location_data[9]
                    if quotient == "**":
                        quotient = locale.atof("0.0")
                    else:
                        quotient = locale.atof(quotient)

                    aMean = location_data[11]
                    if aMean == "*" or aMean == "#":
                        aMean = locale.atof("0.0")
                    else:
                        aMean = locale.atof(aMean)

                    aMedian = location_data[20]
                    if aMedian == "*" or aMedian == "#":
                        aMedian = locale.atof("0.0")
                    else:
                        aMedian = locale.atof(aMedian)

                    link = LocationOcc(id, name, employed, quotient, aMean, aMedian)
                    for city in Cities:
                        if city.id == location_data[1]:
                            city.occupations.append(link)
        count += 1


