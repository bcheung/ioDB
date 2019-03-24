import csv
import locale
from api.db import db, create_app
from api.models.visit import Visit
from api.models.industry import Industry3dModel, Industry4dModel
from api.models.occupation import OccupationMajorModel, OccupationDetailedModel
from api.models.location import StateModel, MetroAreaModel
from api.models.industry_occupation import Ind3dOccMajorModel, Ind4dOccMajorModel, Ind3dOccDetailedModel, Ind4dOccDetailedModel
from api.models.location_occupation import StateOccMajorModel, MetroAreaOccMajorModel, StateOccDetailedModel, MetroAreaOccDetailedModel


locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')


def populate_occupations():
    with app.app_context():
        line_cnt = major_cnt = detailed_cnt = 0
        with open('sqlalchemy_scraper/national_occupations_by_group.csv', 'r') as f:
            reader = csv.reader(f)
            for line in reader:
                if line_cnt > 0:
                    occupation_data = line
                    occ_group = occupation_data[2]
                    if occ_group == "major" or occ_group == "detailed":
                        id = occupation_data[0]
                        title = occupation_data[1]
                        total_employment = locale.atoi(occupation_data[3])
                        hourly = occupation_data[19]
                        annual = occupation_data[18]
                        if annual == "TRUE":
                            hourly_mean = -1.0
                            hourly_median = -1.0
                            annual_mean = 208000 if occupation_data[6] == '#' else locale.atoi(
                                occupation_data[6])
                            annual_median = 208000 if occupation_data[15] == '#' else locale.atoi(
                                occupation_data[15])
                        elif hourly == "TRUE":
                            hourly_mean = 100.0 if occupation_data[5] == '#' else locale.atof(
                                occupation_data[5])
                            hourly_median = 100.0 if occupation_data[10] == '#' else locale.atof(
                                occupation_data[10])
                            annual_mean = -1
                            annual_median = -1
                        else:
                            hourly_mean = 100.0 if occupation_data[5] == '#' else locale.atof(
                                occupation_data[5])
                            hourly_median = 100.0 if occupation_data[10] == '#' else locale.atof(
                                occupation_data[10])
                            annual_mean = 208000 if occupation_data[6] == '#' else locale.atoi(
                                occupation_data[6])
                            annual_median = 208000 if occupation_data[15] == '#' else locale.atoi(
                                occupation_data[15])

                        if occ_group == "major":
                            occupation = OccupationMajorModel(
                                id, title, total_employment, hourly_mean, hourly_median, annual_mean, annual_median)
                            occupation_major = occupation
                            major_cnt += 1
                        else:
                            occupation = OccupationDetailedModel(
                                id, title, total_employment, hourly_mean, hourly_median, annual_mean, annual_median)
                            occupation_major.occupations_detailed.append(
                                occupation)
                            detailed_cnt += 1
                        db.session.add(occupation)
                line_cnt += 1
        db.session.commit()
        return line_cnt, major_cnt, detailed_cnt


def populate_industries():
    # Populating our Industry table
    with open('industry_3d.csv', 'r') as f:
        count = 0
        reader = csv.reader(f)
        for line in reader:
            if count > 0:
                industry_data = line
                if industry_data[2] == "00-0000":   # industry total
                    id = industry_data[0]
                    title = industry_data[1]
                    total_employment = locale.atoi(industry_data[5])
                    hourly_mean = locale.atof(industry_data[9])
                    hourly_median = locale.atof(industry_data[14])
                    annual_mean = locale.atoi(industry_data[10])
                    annual_median = locale.atoi(industry_data[19])
                    industry3d = Industry3dModel(
                        id, title, total_employment, hourly_mean, hourly_median, annual_mean, annual_median)
                    # ADD TO INDUSTRIES TABLE
                    db.session.add(industry3d)
                    db.session.commit()
                else:
                    # populate industry_3d_occupation association table
                    if industry_data[4] == "major" or industry_data[4] == "detailed":
                        id = industry_data[0]
                    title = industry_data[1]
                    total_employment = locale.atoi(industry_data[5])
                    hourly_mean = locale.atof(industry_data[9])
                    hourly_median = locale.atof(industry_data[14])
                    annual_mean = locale.atoi(industry_data[10])
                    annual_median = locale.atoi(industry_data[19])
                    industry3d = Industry3dModel(
                        id, title, total_employment, hourly_mean, hourly_median, annual_mean, annual_median)
                    # ADD TO INDUSTRIES TABLE
                    db.session.add(industry3d)
            count += 1
        db.session.commit()


if __name__ == '__main__':
    app = create_app()
    app.app_context().push()
    with app.app_context():
        print('Creating all database tables...')
        db.create_all()
        print('Done creating tables!')
        line_cnt, major_cnt, detailed_cnt = populate_occupations()
        print('Done populating tables! line_cnt: {}, major_cnt: {}, detailed_cnt: {}'.format(
            line_cnt, major_cnt, detailed_cnt))
