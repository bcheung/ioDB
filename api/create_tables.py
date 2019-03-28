import csv
import locale
# from config import db, create_app
import config
from config import db, ma
from models.visit import Visit
from models.industry import Industry3dModel, Industry4dModel
from models.occupation import OccupationMajorModel, OccupationDetailedModel
# , OccupationMajorSchema, OccupationDetailedSchema
from models.location import StateModel, MetroAreaModel
from models.industry_occupation import Ind3dOccMajorModel, Ind4dOccMajorModel, Ind3dOccDetailedModel, Ind4dOccDetailedModel
from models.location_occupation import StateOccMajorModel, MetroAreaOccMajorModel, StateOccDetailedModel, MetroAreaOccDetailedModel


locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')


def populate_occupations():
    # populate occupations_major and occupations_detailed tables
    line_cnt = major_cnt = detailed_cnt = 0
    with open('data/national_occupations_by_group.csv', 'r') as f:
        reader = csv.reader(f)
        for line in reader:
            if line_cnt > 0:
                occupation_data = line
                occ_group = occupation_data[2]
                if occ_group == "major" or occ_group == "detailed":
                    occ_code = occupation_data[0]
                    title = occupation_data[1]
                    total_employment = parse_int(occupation_data[3])
                    hourly_mean = parse_float(occupation_data[5])
                    hourly_10 = parse_float(occupation_data[8])
                    hourly_25 = parse_float(occupation_data[9])
                    hourly_median = parse_float(occupation_data[10])
                    hourly_75 = parse_float(occupation_data[11])
                    hourly_90 = parse_float(occupation_data[12])
                    annual_mean = parse_int(occupation_data[6])
                    annual_10 = parse_int(occupation_data[13])
                    annual_25 = parse_int(occupation_data[14])
                    annual_median = parse_int(occupation_data[15])
                    annual_75 = parse_int(occupation_data[16])
                    annual_90 = parse_int(occupation_data[17])
                    if occ_group == "major":    # occupations_major table
                        occupation = OccupationMajorModel(
                            occ_code, title, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                        occupation_major = occupation
                        major_cnt += 1
                    else:   # occupations_detailed table
                        occupation = OccupationDetailedModel(
                            occ_code, title, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                        # link occupation_detailed to occupation_major
                        occupation_major.occupations_detailed.append(
                            occupation)
                        detailed_cnt += 1
                    # insert into database
                    db.session.add(occupation)
            line_cnt += 1
    db.session.commit()
    return line_cnt, major_cnt, detailed_cnt


def populate_occupation_descriptions_2010():
    # populate occupation descriptions
    line_cnt = detailed_cnt = 0
    with open('data/soc_2010_definitions.csv', 'r') as f:
        reader = csv.reader(f)
        for line in reader:
            if line_cnt > 0:
                occupation_data = line
                occ_code = occupation_data[0]
                description = occupation_data[2]
                # occupations_detailed table
                occupation = OccupationDetailedModel.query.get(occ_code)
                if occupation != None:
                    occupation.description = description
                    detailed_cnt += 1
            line_cnt += 1
    db.session.commit()
    return line_cnt, detailed_cnt


def populate_occupation_descriptions_2018():
    # populate occupation descriptions
    line_cnt = detailed_cnt = same = diff = 0
    with open('data/soc_2018_definitions.csv', 'r') as f:
        reader = csv.reader(f)
        for line in reader:
            if line_cnt > 0:
                occupation_data = line
                occ_group = occupation_data[0]
                if occ_group == "Detailed":
                    occ_code = occupation_data[1]
                    description = occupation_data[3]
                    # occupations_detailed table
                    occupation = OccupationDetailedModel.query.get(occ_code)
                    if occupation != None:
                        if occupation.description == "":
                            occupation.description = description
                            detailed_cnt += 1
                        elif occupation.description == description:
                            same += 1
                        else:
                            diff += 1
            line_cnt += 1
    db.session.commit()
    return line_cnt, detailed_cnt, same, diff


def populate_industries_3d():
    # Populate industries_3d, ind_3d_occ_major, ind_3d_occ_detailed tables
    with open('data/industries_3d.csv', 'r') as f:
        line_cnt = ind_3d_cnt = major_cnt = detailed_cnt = 0
        reader = csv.reader(f)
        for line in reader:
            if line_cnt > 0:
                industry_data = line
                industry_3d_id = industry_data[0]
                title = industry_data[1]
                occ_code = industry_data[2]
                occ_group = industry_data[4]
                total_employment = parse_int(industry_data[5])
                hourly_mean = parse_float(industry_data[9])
                hourly_10 = parse_float(industry_data[12])
                hourly_25 = parse_float(industry_data[13])
                hourly_median = parse_float(industry_data[14])
                hourly_75 = parse_float(industry_data[15])
                hourly_90 = parse_float(industry_data[16])
                annual_mean = parse_int(industry_data[10])
                annual_10 = parse_int(industry_data[17])
                annual_25 = parse_int(industry_data[18])
                annual_median = parse_int(industry_data[19])
                annual_75 = parse_int(industry_data[20])
                annual_90 = parse_int(industry_data[21])
                if occ_group == 'total':    # industries_3d table
                    industry_3d = Industry3dModel(
                        industry_3d_id, title, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                    db.session.add(industry_3d)
                    ind_3d_cnt += 1
                elif occ_group == 'major':  # ind_3d_occ_major
                    ind_3d_occ_major = Ind3dOccMajorModel(
                        total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                    ind_3d_occ_major.industry_3d_id = industry_3d_id
                    ind_3d_occ_major.occupation_major_id = occ_code
                    db.session.add(ind_3d_occ_major)
                    major_cnt += 1
                elif occ_group == 'detailed':   # ind_3d_occ_detailed
                    ind_3d_occ_detailed = Ind3dOccDetailedModel(
                        total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                    ind_3d_occ_detailed.industry_3d_id = industry_3d_id
                    ind_3d_occ_detailed.occupation_detailed_id = occ_code
                    db.session.add(ind_3d_occ_detailed)
                    detailed_cnt += 1
            line_cnt += 1
        db.session.commit()
        return line_cnt, ind_3d_cnt, major_cnt, detailed_cnt


def populate_industries_4d():
    # Populate industries_4d, ind_4d_occ_major, ind_4d_occ_detailed tables
    with open('data/industries_4d.csv', 'r') as f:
        line_cnt = ind_4d_cnt = major_cnt = detailed_cnt = 0
        reader = csv.reader(f)
        for line in reader:
            if line_cnt > 0:
                industry_data = line
                industry_4d_id = industry_data[0]
                if industry_4d_id[3:6] != "000":
                    title = industry_data[1]
                    occ_code = industry_data[2]
                    occ_group = industry_data[4]
                    total_employment = parse_int(industry_data[5])
                    hourly_mean = parse_float(industry_data[9])
                    hourly_10 = parse_float(industry_data[12])
                    hourly_25 = parse_float(industry_data[13])
                    hourly_median = parse_float(industry_data[14])
                    hourly_75 = parse_float(industry_data[15])
                    hourly_90 = parse_float(industry_data[16])
                    annual_mean = parse_int(industry_data[10])
                    annual_10 = parse_int(industry_data[17])
                    annual_25 = parse_int(industry_data[18])
                    annual_median = parse_int(industry_data[19])
                    annual_75 = parse_int(industry_data[20])
                    annual_90 = parse_int(industry_data[21])
                    if occ_group == 'total':    # industries_4d table
                        industry_4d = Industry4dModel(
                            industry_4d_id, title, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                        db.session.add(industry_4d)
                        # find industry_3d and link industry_4d
                        industry_3d = Industry3dModel.query.filter_by(
                            id=(industry_4d_id[0:3] + '000')).first()
                        industry_3d.industries_4d.append(industry_4d)
                        ind_4d_cnt += 1
                    elif occ_group == 'major':  # ind_4d_occ_major table
                        ind_4d_occ_major = Ind4dOccMajorModel(
                            total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                        ind_4d_occ_major.industry_4d_id = industry_4d_id
                        ind_4d_occ_major.occupation_major_id = occ_code
                        db.session.add(ind_4d_occ_major)
                        major_cnt += 1
                    elif occ_group == 'detailed':   # ind_4d_occ_detailed table
                        ind_4d_occ_detailed = Ind4dOccDetailedModel(
                            total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                        ind_4d_occ_detailed.industry_4d_id = industry_4d_id
                        ind_4d_occ_detailed.occupation_detailed_id = occ_code
                        db.session.add(ind_4d_occ_detailed)
                        detailed_cnt += 1
            line_cnt += 1
        db.session.commit()
        return line_cnt, ind_4d_cnt, major_cnt, detailed_cnt


def populate_industry_descriptions():
    # populate industry descriptions
    line_cnt = ind_3d_cnt = ind_4d_cnt = 0
    null = False
    with open('data/2017_NAICS_Descriptions_edited.csv', 'r') as f:
        reader = csv.reader(f)
        for line in reader:
            if line_cnt > 0:
                industry_data = line
                industry_id = industry_data[0]
                description = industry_data[2]
                id_len = len(industry_id)
                if id_len == 3:
                    industry_id = industry_id + "000"
                    industry = Industry3dModel.query.get(industry_id)
                    if industry != None:
                        if description == "NULL":
                            null = True
                        else:
                            industry.description = description
                            ind_3d_cnt += 1
                elif id_len == 4:
                    industry_id = industry_id + "00"
                    industry = Industry4dModel.query.get(industry_id)
                    if industry != None:
                        if description == "NULL":
                            null = True
                        else:
                            industry.description = description
                            ind_4d_cnt += 1
                elif null:
                    null = False
                    industry.description = description
                    ind_4d_cnt += 1
            line_cnt += 1
    db.session.commit()
    return line_cnt, ind_3d_cnt, ind_4d_cnt


def get_state_population(state):
    with open('data/States.csv', 'r') as f:
        line_cnt = 0
        reader = csv.reader(f)
        for line in reader:
            if line_cnt > 0:
                data = line
                name = data[0]
                population = parse_int(data[1])
                if name == state:
                    return population
            line_cnt += 1
        return 0


def populate_states():
    # Populate states, states_occ_major, states_occ_detailed tables
    with open('data/occupations_by_state.csv', 'r') as f:
        line_cnt = states_cnt = major_cnt = detailed_cnt = 0
        reader = csv.reader(f)
        for line in reader:
            if line_cnt > 0:
                state_data = line
                state_id = state_data[0]
                state_symbol = state_data[1]
                name = state_data[2]
                occ_code = state_data[3]
                occ_group = state_data[5]
                total_employment = parse_int(state_data[6])
                jobs_1000 = parse_float(state_data[8])
                loc_quotient = parse_float(state_data[9])
                hourly_mean = parse_float(state_data[10])
                hourly_10 = parse_float(state_data[13])
                hourly_25 = parse_float(state_data[14])
                hourly_median = parse_float(state_data[15])
                hourly_75 = parse_float(state_data[16])
                hourly_90 = parse_float(state_data[17])
                annual_mean = parse_int(state_data[11])
                annual_10 = parse_int(state_data[18])
                annual_25 = parse_int(state_data[19])
                annual_median = parse_int(state_data[20])
                annual_75 = parse_int(state_data[21])
                annual_90 = parse_int(state_data[22])
                if occ_group == 'total':    # states table
                    total_population = get_state_population(name)
                    state = StateModel(
                        state_id, state_symbol, name, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90, total_population)
                    db.session.add(state)
                    states_cnt += 1
                elif occ_group == 'major':  # state_occ_major table
                    state_occ_major = StateOccMajorModel(
                        total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                    state_occ_major.state_id = state_id
                    state_occ_major.occupation_major_id = occ_code
                    db.session.add(state_occ_major)
                    major_cnt += 1
                elif occ_group == 'detailed':   # state_occ_detailed table
                    state_occ_detailed = StateOccDetailedModel(
                        total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                    state_occ_detailed.state_id = state_id
                    state_occ_detailed.occupation_detailed_id = occ_code
                    db.session.add(state_occ_detailed)
                    detailed_cnt += 1
            line_cnt += 1
        db.session.commit()
        return line_cnt, states_cnt, major_cnt, detailed_cnt


def populate_metro_areas():
    # Populate metro_areas, metro_areas_occ_major, metro_areas_occ_detailed tables
    with open('data/occupations_by_metropolitan_areas.csv', 'r') as f:
        line_cnt = metro_areas_cnt = major_cnt = detailed_cnt = 0
        reader = csv.reader(f)
        for line in reader:
            if line_cnt > 0:
                metro_data = line
                state_symbol = metro_data[0]
                metro_area_id = metro_data[1]
                name = metro_data[2]
                occ_code = metro_data[3]
                occ_group = metro_data[5]
                total_employment = parse_int(metro_data[6])
                jobs_1000 = parse_float(metro_data[8])
                loc_quotient = parse_float(metro_data[9])
                hourly_mean = parse_float(metro_data[10])
                hourly_10 = parse_float(metro_data[13])
                hourly_25 = parse_float(metro_data[14])
                hourly_median = parse_float(metro_data[15])
                hourly_75 = parse_float(metro_data[16])
                hourly_90 = parse_float(metro_data[17])
                annual_mean = parse_int(metro_data[11])
                annual_10 = parse_int(metro_data[18])
                annual_25 = parse_int(metro_data[19])
                annual_median = parse_int(metro_data[20])
                annual_75 = parse_int(metro_data[21])
                annual_90 = parse_int(metro_data[22])
                if occ_group == 'total':    # metro_areas table
                    metro_area = MetroAreaModel(
                        metro_area_id, name, state_symbol, total_employment, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                    db.session.add(metro_area)
                    # find state and link metro_area
                    state = StateModel.query.filter_by(
                        state_symbol=(state_symbol)).first()
                    state.metro_areas.append(metro_area)
                    metro_areas_cnt += 1
                elif occ_group == 'major':  # metro_area_occ_major table
                    metro_area_occ_major = MetroAreaOccMajorModel(
                        total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                    metro_area_occ_major.metro_area_id = metro_area_id
                    metro_area_occ_major.occupation_major_id = occ_code
                    db.session.add(metro_area_occ_major)
                    major_cnt += 1
                elif occ_group == 'detailed':   # metro_area_occ_detailed table
                    metro_area_occ_detailed = MetroAreaOccDetailedModel(
                        total_employment, jobs_1000, loc_quotient, hourly_mean, hourly_10, hourly_25, hourly_median, hourly_75, hourly_90, annual_mean, annual_10, annual_25, annual_median, annual_75, annual_90)
                    metro_area_occ_detailed.metro_area_id = metro_area_id
                    metro_area_occ_detailed.occupation_detailed_id = occ_code
                    db.session.add(metro_area_occ_detailed)
                    detailed_cnt += 1
            line_cnt += 1
        db.session.commit()
        return line_cnt, metro_areas_cnt, major_cnt, detailed_cnt


def parse_float(value):
    try:
        return locale.atof(value)
    except ValueError:
        switcher = {
            '**': -1.0,
            '*': -1.0,
            '#': 100.0
        }
        return switcher.get(value, 0.0)


def parse_int(value):
    try:
        return locale.atoi(value)
    except ValueError:
        switcher = {
            '**': -1,
            '*': -1,
            '#': 208000
        }
        return switcher.get(value, 0)


if __name__ == '__main__':
    # app = create_app()
    # app.app_context().push()
    # with app.app_context():
    print('Creating all database tables...')
    db.create_all()
    print('Done creating tables!')
    line_cnt, major_cnt, detailed_cnt = populate_occupations()
    print('Done populating occupation tables! line_cnt: {}, major_cnt: {}, detailed_cnt: {}'.format(
        line_cnt, major_cnt, detailed_cnt))
    line_cnt, detailed_cnt = populate_occupation_descriptions_2010()
    print('Done populating occupation 2010 descriptions! line_cnt: {}, detailed_cnt: {}'.format(
        line_cnt, detailed_cnt))
    line_cnt, detailed_cnt, same, diff = populate_occupation_descriptions_2018()
    print('Done populating occupation 2018 descriptions! line_cnt: {}, detailed_cnt: {}, same: {}, diff: {}'.format(
        line_cnt, detailed_cnt, same, diff))
    line_cnt, ind_3d_cnt, major_cnt, detailed_cnt = populate_industries_3d()
    print('Done populating industry 3d tables! line_cnt: {}, ind_3d_cnt: {} major_cnt: {}, detailed_cnt: {}'.format(
        line_cnt, ind_3d_cnt, major_cnt, detailed_cnt))
    line_cnt, ind_4d_cnt, major_cnt, detailed_cnt = populate_industries_4d()
    print('Done populating industry 4d tables! line_cnt: {}, ind_4d_cnt: {} major_cnt: {}, detailed_cnt: {}'.format(
        line_cnt, ind_4d_cnt, major_cnt, detailed_cnt))
    line_cnt, ind_3d_cnt, ind_4d_cnt = populate_industry_descriptions()
    print('Done populating industry descriptions! line_cnt: {}, ind_3d_cnt: {} ind_4d_cnt: {}'.format(
        line_cnt, ind_3d_cnt, ind_4d_cnt))
    line_cnt, state_cnt, major_cnt, detailed_cnt = populate_states()
    print('Done populating state tables! line_cnt: {}, state_cnt: {} major_cnt: {}, detailed_cnt: {}'.format(
        line_cnt, state_cnt, major_cnt, detailed_cnt))
    line_cnt, metro_areas_cnt, major_cnt, detailed_cnt = populate_metro_areas()
    print('Done populating metro areas tables! line_cnt: {}, metro_areas_cnt: {} major_cnt: {}, detailed_cnt: {}'.format(
        line_cnt, metro_areas_cnt, major_cnt, detailed_cnt))
