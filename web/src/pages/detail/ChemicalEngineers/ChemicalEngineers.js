import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Container, Row, Col } from 'reactstrap';
import { OccupationComponent } from '../../../components/OccupationComponent';
import './ChemicalEngineers.css';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYW1ldGh5c3QtZWU0NjFsIiwiYSI6ImNqdDdxYWxzZzAwcXc0NG91NnJ4Z2t4bnMifQ.1M-jA2MKBuUbXoy3bIMxlw';

const info = {
    info: {
        occupation: 'Chemical Engineers',
        naics: '(17-2041)',
        description:
            'Design chemical plant equipment and devise processes for manufacturing chemicals and products, such as gasoline, synthetic rubber, plastics, detergents, cement, paper, and pulp, by applying principles and technology of chemsitry, physics, and engineering.',
        meanWage: 'Annual mean wage: $112,430'
    },
    percentile: {
        title: 'Annual Percentile Wages',
        headers: [10, 25, 50, 75, 90],
        values: [62230, 79030, 102160, 131030, 169080]
    },
    industries: {
        headers: ['Industry Name', 'NAICS', 'Employment', 'Annual Mean', 'Annual Median'],
        values: [
            ['Chemical Manufacturing', '325000', 12950, 112310, 102460],
            ['Chemical Manufacturing', '3250A1', 10130, 115130, 102460],
            ['Professional, Scientific, and Technical Services', '541000', 8590, 117840, 105980],
            ['Architectural, Engineering, and Related Services', '541300', 3790, 116690, 104360],
            ['Scientific Research and Development Services', '541700', 3440, 117130, 107250]
        ]
    },
    states: {
        headers: ['State', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
        values: [
            ['Delaware', '1000000', 5.35, 560, 114860, 109580],
            ['Louisiana', '2200000', 5.14, 2300, 108070, 99170],
            ['Texas', '4800000', 2.93, 8200, 145660, 126110],
            ['West Virginia', '5400000', 1.91, 310, 89570, 89810],
            ['South Carolina', '4500000', 1.91, 310, 81990, 77980]
        ]
    },
    metropolitan: {
        headers: ['Area', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
        values: [
            ['Lake Charles, LA', '0029340', 13.34, 350, 92080, 87990],
            ['Beaumont-Port Arthur, TX', '0013140', 11.88, 450, 154870, 140650],
            ['Baton Rouge, LA', '0012940', 11.87, 1090, 117980, 110490],
            ['Idaho Falls, ID', '0026820', 11.61, 180, 118810, 110850],
            ['Kennewick-Richland, WA', '0028420', 10.72, 280, 109050, 105310]
        ]
    }
};

const occ = [{ "annual_10": 70880, "annual_25": 86730, "annual_75": 123890, "annual_90": 151870, "annual_mean": 106640, "annual_median": 102100, "hourly_10": 34.08, "hourly_25": 41.7, "hourly_75": 59.56, "hourly_90": 73.02, "hourly_mean": 51.27, "hourly_median": 49.09, "jobs_1000": 0.233, "loc_quotient": 0.99, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "01", "title": "Alabama" }, "total_employment": 450 }, { "annual_10": 83260, "annual_25": 97340, "annual_75": 169890, "annual_90": 198600, "annual_mean": 137360, "annual_median": 133710, "hourly_10": 40.03, "hourly_25": 46.8, "hourly_75": 81.68, "hourly_90": 95.48, "hourly_mean": 66.04, "hourly_median": 64.28, "jobs_1000": 0.208, "loc_quotient": 0.89, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "02", "title": "Alaska" }, "total_employment": 70 }, { "annual_10": 63230, "annual_25": 89430, "annual_75": 128800, "annual_90": 153610, "annual_mean": 110110, "annual_median": 110540, "hourly_10": 30.4, "hourly_25": 43.0, "hourly_75": 61.92, "hourly_90": 73.85, "hourly_mean": 52.94, "hourly_median": 53.14, "jobs_1000": 0.026, "loc_quotient": 0.11, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "04", "title": "Arizona" }, "total_employment": 70 }, { "annual_10": 53790, "annual_25": 62050, "annual_75": 101060, "annual_90": 117060, "annual_mean": 86570, "annual_median": 89340, "hourly_10": 25.86, "hourly_25": 29.83, "hourly_75": 48.59, "hourly_90": 56.28, "hourly_mean": 41.62, "hourly_median": 42.95, "jobs_1000": 0.144, "loc_quotient": 0.61, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "05", "title": "Arkansas" }, "total_employment": 170 }, { "annual_10": 56440, "annual_25": 72460, "annual_75": 133190, "annual_90": 159580, "annual_mean": 105130, "annual_median": 98410, "hourly_10": 27.14, "hourly_25": 34.84, "hourly_75": 64.03, "hourly_90": 76.72, "hourly_mean": 50.54, "hourly_median": 47.31, "jobs_1000": 0.138, "loc_quotient": 0.59, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "06", "title": "California" }, "total_employment": 2310 }, { "annual_10": 44430, "annual_25": 65830, "annual_75": 124230, "annual_90": 154470, "annual_mean": 95990, "annual_median": 92380, "hourly_10": 21.36, "hourly_25": 31.65, "hourly_75": 59.72, "hourly_90": 74.27, "hourly_mean": 46.15, "hourly_median": 44.41, "jobs_1000": 0.236, "loc_quotient": 1.01, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "08", "title": "Colorado" }, "total_employment": 600 }, { "annual_10": 62120, "annual_25": 74500, "annual_75": 116530, "annual_90": 150190, "annual_mean": 98220, "annual_median": 93230, "hourly_10": 29.87, "hourly_25": 35.82, "hourly_75": 56.02, "hourly_90": 72.21, "hourly_mean": 47.22, "hourly_median": 44.82, "jobs_1000": 0.172, "loc_quotient": 0.73, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "09", "title": "Connecticut" }, "total_employment": 280 }, { "annual_10": 66200, "annual_25": 84050, "annual_75": 149730, "annual_90": 173200, "annual_mean": 114860, "annual_median": 109580, "hourly_10": 31.83, "hourly_25": 40.41, "hourly_75": 71.99, "hourly_90": 83.27, "hourly_mean": 55.22, "hourly_median": 52.68, "jobs_1000": 1.258, "loc_quotient": 5.35, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "10", "title": "Delaware" }, "total_employment": 560 }, { "annual_10": 76370, "annual_25": 98480, "annual_75": 126950, "annual_90": 145620, "annual_mean": 113320, "annual_median": 120070, "hourly_10": 36.72, "hourly_25": 47.34, "hourly_75": 61.03, "hourly_90": 70.01, "hourly_mean": 54.48, "hourly_median": 57.73, "jobs_1000": 0.118, "loc_quotient": 0.5, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "11", "title": "District of Columbia" }, "total_employment": 80 }, { "annual_10": 41000, "annual_25": 67390, "annual_75": 120570, "annual_90": 165980, "annual_mean": 105770, "annual_median": 91010, "hourly_10": 19.71, "hourly_25": 32.4, "hourly_75": 57.97, "hourly_90": 79.8, "hourly_mean": 50.85, "hourly_median": 43.75, "jobs_1000": 0.049, "loc_quotient": 0.21, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "12", "title": "Florida" }, "total_employment": 410 }, { "annual_10": 38030, "annual_25": 56600, "annual_75": 113090, "annual_90": 132590, "annual_mean": 89090, "annual_median": 82570, "hourly_10": 18.28, "hourly_25": 27.21, "hourly_75": 54.37, "hourly_90": 63.75, "hourly_mean": 42.83, "hourly_median": 39.7, "jobs_1000": 0.132, "loc_quotient": 0.56, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "13", "title": "Georgia" }, "total_employment": 570 }, { "annual_10": -1, "annual_25": -1, "annual_75": -1, "annual_90": -1, "annual_mean": -1, "annual_median": -1, "hourly_10": -1.0, "hourly_25": -1.0, "hourly_75": -1.0, "hourly_90": -1.0, "hourly_mean": -1.0, "hourly_median": -1.0, "jobs_1000": 0.293, "loc_quotient": 1.25, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "16", "title": "Idaho" }, "total_employment": 200 }, { "annual_10": 37940, "annual_25": 65910, "annual_75": 105560, "annual_90": 133660, "annual_mean": 87200, "annual_median": 84450, "hourly_10": 18.24, "hourly_25": 31.69, "hourly_75": 50.75, "hourly_90": 64.26, "hourly_mean": 41.92, "hourly_median": 40.6, "jobs_1000": 0.123, "loc_quotient": 0.52, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "17", "title": "Illinois" }, "total_employment": 730 }, { "annual_10": 59440, "annual_25": 69430, "annual_75": 104750, "annual_90": 124770, "annual_mean": 89570, "annual_median": 84070, "hourly_10": 28.58, "hourly_25": 33.38, "hourly_75": 50.36, "hourly_90": 59.98, "hourly_mean": 43.06, "hourly_median": 40.42, "jobs_1000": 0.117, "loc_quotient": 0.5, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "18", "title": "Indiana" }, "total_employment": 350 }, { "annual_10": 59920, "annual_25": 74320, "annual_75": 123460, "annual_90": 161900, "annual_mean": 101230, "annual_median": 94390, "hourly_10": 28.81, "hourly_25": 35.73, "hourly_75": 59.35, "hourly_90": 77.84, "hourly_mean": 48.67, "hourly_median": 45.38, "jobs_1000": 0.132, "loc_quotient": 0.56, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "19", "title": "Iowa" }, "total_employment": 200 }, { "annual_10": 68550, "annual_25": 82460, "annual_75": 122720, "annual_90": 151360, "annual_mean": 107380, "annual_median": 99930, "hourly_10": 32.96, "hourly_25": 39.65, "hourly_75": 59.0, "hourly_90": 72.77, "hourly_mean": 51.62, "hourly_median": 48.04, "jobs_1000": 0.089, "loc_quotient": 0.38, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "20", "title": "Kansas" }, "total_employment": 120 }, { "annual_10": 58040, "annual_25": 72990, "annual_75": 111610, "annual_90": 133780, "annual_mean": 93780, "annual_median": 92030, "hourly_10": 27.9, "hourly_25": 35.09, "hourly_75": 53.66, "hourly_90": 64.32, "hourly_mean": 45.09, "hourly_median": 44.25, "jobs_1000": 0.24, "loc_quotient": 1.02, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "21", "title": "Kentucky" }, "total_employment": 450 }, { "annual_10": 66280, "annual_25": 79550, "annual_75": 126370, "annual_90": 161030, "annual_mean": 108070, "annual_median": 99170, "hourly_10": 31.87, "hourly_25": 38.24, "hourly_75": 60.75, "hourly_90": 77.42, "hourly_mean": 51.96, "hourly_median": 47.68, "jobs_1000": 1.208, "loc_quotient": 5.14, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "22", "title": "Louisiana" }, "total_employment": 2300 }, { "annual_10": 58460, "annual_25": 72680, "annual_75": 116570, "annual_90": 129060, "annual_mean": 94690, "annual_median": 97660, "hourly_10": 28.1, "hourly_25": 34.94, "hourly_75": 56.04, "hourly_90": 62.05, "hourly_mean": 45.52, "hourly_median": 46.95, "jobs_1000": 0.051, "loc_quotient": 0.22, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "23", "title": "Maine" }, "total_employment": 30 }, { "annual_10": 76100, "annual_25": 97450, "annual_75": 130700, "annual_90": 155150, "annual_mean": 114230, "annual_median": 116080, "hourly_10": 36.58, "hourly_25": 46.85, "hourly_75": 62.84, "hourly_90": 74.59, "hourly_mean": 54.92, "hourly_median": 55.81, "jobs_1000": 0.339, "loc_quotient": 1.44, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "24", "title": "Maryland" }, "total_employment": 900 }, { "annual_10": 67110, "annual_25": 77400, "annual_75": 119280, "annual_90": 149600, "annual_mean": 104950, "annual_median": 95370, "hourly_10": 32.26, "hourly_25": 37.21, "hourly_75": 57.35, "hourly_90": 71.92, "hourly_mean": 50.46, "hourly_median": 45.85, "jobs_1000": 0.276, "loc_quotient": 1.18, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "25", "title": "Massachusetts" }, "total_employment": 970 }, { "annual_10": 55550, "annual_25": 72210, "annual_75": 117090, "annual_90": 145170, "annual_mean": 100150, "annual_median": 93740, "hourly_10": 26.71, "hourly_25": 34.71, "hourly_75": 56.29, "hourly_90": 69.79, "hourly_mean": 48.15, "hourly_median": 45.07, "jobs_1000": 0.191, "loc_quotient": 0.81, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "26", "title": "Michigan" }, "total_employment": 820 }, { "annual_10": 39740, "annual_25": 65010, "annual_75": 105030, "annual_90": 129680, "annual_mean": 86360, "annual_median": 82970, "hourly_10": 19.11, "hourly_25": 31.26, "hourly_75": 50.49, "hourly_90": 62.35, "hourly_mean": 41.52, "hourly_median": 39.89, "jobs_1000": 0.105, "loc_quotient": 0.45, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "27", "title": "Minnesota" }, "total_employment": 300 }, { "annual_10": 63920, "annual_25": 83260, "annual_75": 125930, "annual_90": 166600, "annual_mean": 106880, "annual_median": 103290, "hourly_10": 30.73, "hourly_25": 40.03, "hourly_75": 60.54, "hourly_90": 80.09, "hourly_mean": 51.39, "hourly_median": 49.66, "jobs_1000": 0.194, "loc_quotient": 0.82, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "28", "title": "Mississippi" }, "total_employment": 220 }, { "annual_10": 65160, "annual_25": 76670, "annual_75": 126330, "annual_90": 155810, "annual_mean": 104960, "annual_median": 100290, "hourly_10": 31.33, "hourly_25": 36.86, "hourly_75": 60.74, "hourly_90": 74.91, "hourly_mean": 50.46, "hourly_median": 48.22, "jobs_1000": 0.213, "loc_quotient": 0.91, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "29", "title": "Missouri" }, "total_employment": 590 }, { "annual_10": 66570, "annual_25": 72120, "annual_75": 98260, "annual_90": 114160, "annual_mean": 85280, "annual_median": 81280, "hourly_10": 32.0, "hourly_25": 34.67, "hourly_75": 47.24, "hourly_90": 54.89, "hourly_mean": 41.0, "hourly_median": 39.08, "jobs_1000": 0.119, "loc_quotient": 0.51, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "31", "title": "Nebraska" }, "total_employment": 120 }, { "annual_10": 67790, "annual_25": 74430, "annual_75": 116340, "annual_90": 164680, "annual_mean": 109680, "annual_median": 89780, "hourly_10": 32.59, "hourly_25": 35.78, "hourly_75": 55.93, "hourly_90": 79.17, "hourly_mean": 52.73, "hourly_median": 43.16, "jobs_1000": 0.049, "loc_quotient": 0.21, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "32", "title": "Nevada" }, "total_employment": 60 }, { "annual_10": 54230, "annual_25": 67480, "annual_75": 99290, "annual_90": 131690, "annual_mean": 87830, "annual_median": 83420, "hourly_10": 26.07, "hourly_25": 32.44, "hourly_75": 47.74, "hourly_90": 63.31, "hourly_mean": 42.23, "hourly_median": 40.11, "jobs_1000": 0.165, "loc_quotient": 0.7, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "33", "title": "New Hampshire" }, "total_employment": 110 }, { "annual_10": 66400, "annual_25": 80580, "annual_75": 128700, "annual_90": 160840, "annual_mean": 111540, "annual_median": 104210, "hourly_10": 31.92, "hourly_25": 38.74, "hourly_75": 61.88, "hourly_90": 77.33, "hourly_mean": 53.63, "hourly_median": 50.1, "jobs_1000": 0.318, "loc_quotient": 1.35, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "34", "title": "New Jersey" }, "total_employment": 1270 }, { "annual_10": 51440, "annual_25": 84420, "annual_75": 140540, "annual_90": 161740, "annual_mean": 109540, "annual_median": 110030, "hourly_10": 24.73, "hourly_25": 40.58, "hourly_75": 67.57, "hourly_90": 77.76, "hourly_mean": 52.66, "hourly_median": 52.9, "jobs_1000": 0.11, "loc_quotient": 0.47, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "35", "title": "New Mexico" }, "total_employment": 90 }, { "annual_10": 63330, "annual_25": 77180, "annual_75": 118230, "annual_90": 143170, "annual_mean": 98760, "annual_median": 95210, "hourly_10": 30.45, "hourly_25": 37.11, "hourly_75": 56.84, "hourly_90": 68.83, "hourly_mean": 47.48, "hourly_median": 45.77, "jobs_1000": 0.106, "loc_quotient": 0.45, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "36", "title": "New York" }, "total_employment": 970 }, { "annual_10": 66650, "annual_25": 76060, "annual_75": 117640, "annual_90": 142390, "annual_mean": 97480, "annual_median": 93770, "hourly_10": 32.05, "hourly_25": 36.57, "hourly_75": 56.56, "hourly_90": 68.46, "hourly_mean": 46.87, "hourly_median": 45.08, "jobs_1000": 0.227, "loc_quotient": 0.96, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "37", "title": "North Carolina" }, "total_employment": 970 }, { "annual_10": -1, "annual_25": -1, "annual_75": -1, "annual_90": -1, "annual_mean": -1, "annual_median": -1, "hourly_10": -1.0, "hourly_25": -1.0, "hourly_75": -1.0, "hourly_90": -1.0, "hourly_mean": -1.0, "hourly_median": -1.0, "jobs_1000": 0.132, "loc_quotient": 0.56, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "38", "title": "North Dakota" }, "total_employment": 50 }, { "annual_10": 53490, "annual_25": 70180, "annual_75": 120490, "annual_90": 144280, "annual_mean": 94350, "annual_median": 91790, "hourly_10": 25.72, "hourly_25": 33.74, "hourly_75": 57.93, "hourly_90": 69.36, "hourly_mean": 45.36, "hourly_median": 44.13, "jobs_1000": 0.301, "loc_quotient": 1.28, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "39", "title": "Ohio" }, "total_employment": 1620 }, { "annual_10": 46630, "annual_25": 71880, "annual_75": 125850, "annual_90": 166880, "annual_mean": 100670, "annual_median": 92070, "hourly_10": 22.42, "hourly_25": 34.56, "hourly_75": 60.51, "hourly_90": 80.23, "hourly_mean": 48.4, "hourly_median": 44.26, "jobs_1000": 0.208, "loc_quotient": 0.88, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "40", "title": "Oklahoma" }, "total_employment": 330 }, { "annual_10": 53600, "annual_25": 70330, "annual_75": 120240, "annual_90": 162390, "annual_mean": 97850, "annual_median": 90570, "hourly_10": 25.77, "hourly_25": 33.81, "hourly_75": 57.81, "hourly_90": 78.07, "hourly_mean": 47.04, "hourly_median": 43.54, "jobs_1000": 0.16, "loc_quotient": 0.68, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "41", "title": "Oregon" }, "total_employment": 290 }, { "annual_10": 62090, "annual_25": 72750, "annual_75": 117030, "annual_90": 144970, "annual_mean": 96170, "annual_median": 91750, "hourly_10": 29.85, "hourly_25": 34.98, "hourly_75": 56.26, "hourly_90": 69.7, "hourly_mean": 46.24, "hourly_median": 44.11, "jobs_1000": 0.265, "loc_quotient": 1.13, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "42", "title": "Pennsylvania" }, "total_employment": 1530 }, { "annual_10": 65220, "annual_25": 72080, "annual_75": 98930, "annual_90": 120760, "annual_mean": 89200, "annual_median": 82660, "hourly_10": 31.36, "hourly_25": 34.65, "hourly_75": 47.56, "hourly_90": 58.06, "hourly_mean": 42.88, "hourly_median": 39.74, "jobs_1000": -1.0, "loc_quotient": -1.0, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "44", "title": "Rhode Island" }, "total_employment": -1 }, { "annual_10": 52610, "annual_25": 68220, "annual_75": 95590, "annual_90": 116590, "annual_mean": 81990, "annual_median": 77980, "hourly_10": 25.29, "hourly_25": 32.8, "hourly_75": 45.96, "hourly_90": 56.05, "hourly_mean": 39.42, "hourly_median": 37.49, "jobs_1000": 0.367, "loc_quotient": 1.56, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "45", "title": "South Carolina" }, "total_employment": 740 }, { "annual_10": 68040, "annual_25": 82370, "annual_75": 123650, "annual_90": 149820, "annual_mean": 102650, "annual_median": 99480, "hourly_10": 32.71, "hourly_25": 39.6, "hourly_75": 59.45, "hourly_90": 72.03, "hourly_mean": 49.35, "hourly_median": 47.83, "jobs_1000": 0.231, "loc_quotient": 0.98, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "47", "title": "Tennessee" }, "total_employment": 670 }, { "annual_10": 79610, "annual_25": 98860, "annual_75": 170040, "annual_90": 208000, "annual_mean": 145660, "annual_median": 126110, "hourly_10": 38.28, "hourly_25": 47.53, "hourly_75": 81.75, "hourly_90": 100.0, "hourly_mean": 70.03, "hourly_median": 60.63, "jobs_1000": 0.689, "loc_quotient": 2.93, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "48", "title": "Texas" }, "total_employment": 8200 }, { "annual_10": -1, "annual_25": -1, "annual_75": -1, "annual_90": -1, "annual_mean": -1, "annual_median": -1, "hourly_10": -1.0, "hourly_25": -1.0, "hourly_75": -1.0, "hourly_90": -1.0, "hourly_mean": -1.0, "hourly_median": -1.0, "jobs_1000": 0.076, "loc_quotient": 0.33, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "49", "title": "Utah" }, "total_employment": 110 }, { "annual_10": 68030, "annual_25": 85550, "annual_75": 133190, "annual_90": 175510, "annual_mean": 116880, "annual_median": 111140, "hourly_10": 32.71, "hourly_25": 41.13, "hourly_75": 64.03, "hourly_90": 84.38, "hourly_mean": 56.19, "hourly_median": 53.43, "jobs_1000": 0.23, "loc_quotient": 0.98, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "51", "title": "Virginia" }, "total_employment": 870 }, { "annual_10": 62720, "annual_25": 78900, "annual_75": 126510, "annual_90": 153480, "annual_mean": 104570, "annual_median": 105870, "hourly_10": 30.16, "hourly_25": 37.93, "hourly_75": 60.82, "hourly_90": 73.79, "hourly_mean": 50.27, "hourly_median": 50.9, "jobs_1000": 0.179, "loc_quotient": 0.76, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "53", "title": "Washington" }, "total_employment": 570 }, { "annual_10": 56060, "annual_25": 68480, "annual_75": 108660, "annual_90": 124480, "annual_mean": 89570, "annual_median": 89810, "hourly_10": 26.95, "hourly_25": 32.93, "hourly_75": 52.24, "hourly_90": 59.85, "hourly_mean": 43.06, "hourly_median": 43.18, "jobs_1000": 0.448, "loc_quotient": 1.91, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "54", "title": "West Virginia" }, "total_employment": 310 }, { "annual_10": 59330, "annual_25": 74650, "annual_75": 117410, "annual_90": 143360, "annual_mean": 98950, "annual_median": 93400, "hourly_10": 28.52, "hourly_25": 35.89, "hourly_75": 56.45, "hourly_90": 68.92, "hourly_mean": 47.57, "hourly_median": 44.91, "jobs_1000": 0.209, "loc_quotient": 0.89, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "55", "title": "Wisconsin" }, "total_employment": 590 }, { "annual_10": 41880, "annual_25": 56240, "annual_75": 128110, "annual_90": 156890, "annual_mean": 99950, "annual_median": 92620, "hourly_10": 20.14, "hourly_25": 27.04, "hourly_75": 61.59, "hourly_90": 75.43, "hourly_mean": 48.05, "hourly_median": 44.53, "jobs_1000": 0.216, "loc_quotient": 0.92, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "56", "title": "Wyoming" }, "total_employment": 60 }, { "annual_10": 34820, "annual_25": 40400, "annual_75": 80580, "annual_90": 120570, "annual_mean": 64490, "annual_median": 49620, "hourly_10": 16.74, "hourly_25": 19.42, "hourly_75": 38.74, "hourly_90": 57.97, "hourly_mean": 31.0, "hourly_median": 23.85, "jobs_1000": -1.0, "loc_quotient": -1.0, "occupation_detailed": { "id": "17-2041", "title": "Chemical Engineers" }, "state": { "id": "72", "title": "Puerto Rico" }, "total_employment": -1 }];

const states = [
    { STATE_ID: '01', quotient: occ[0].loc_quotient },
    { STATE_ID: '02', quotient: occ[1].loc_quotient },
    { STATE_ID: '04', quotient: occ[2].loc_quotient },
    { STATE_ID: '05', quotient: occ[3].loc_quotient },
    { STATE_ID: '06', quotient: occ[4].loc_quotient },
    { STATE_ID: '08', quotient: occ[5].loc_quotient },
    { STATE_ID: '09', quotient: occ[6].loc_quotient },
    { STATE_ID: '10', quotient: occ[7].loc_quotient },
    { STATE_ID: '12', quotient: occ[8].loc_quotient },
    { STATE_ID: '13', quotient: occ[9].loc_quotient },
    { STATE_ID: '15', quotient: occ[10].loc_quotient },
    { STATE_ID: '16', quotient: occ[11].loc_quotient },
    { STATE_ID: '17', quotient: 9.58 },
    { STATE_ID: '18', quotient: 10.63 },
    { STATE_ID: '19', quotient: 8.09 },
    { STATE_ID: '20', quotient: 5.93 },
    { STATE_ID: '21', quotient: 9.86 },
    { STATE_ID: '22', quotient: 9.81 },
    { STATE_ID: '23', quotient: 7.82 },
    { STATE_ID: '24', quotient: 8.35 },
    { STATE_ID: '25', quotient: 9.1 },
    { STATE_ID: '26', quotient: 10.69 },
    { STATE_ID: '27', quotient: 11.53 },
    { STATE_ID: '28', quotient: 9.29 },
    { STATE_ID: '29', quotient: 9.94 },
    { STATE_ID: '30', quotient: 9.29 },
    { STATE_ID: '31', quotient: 5.45 },
    { STATE_ID: '32', quotient: 4.21 },
    { STATE_ID: '33', quotient: 4.27 },
    { STATE_ID: '34', quotient: 4.09 },
    { STATE_ID: '35', quotient: 7.83 },
    { STATE_ID: '36', quotient: 8.01 },
    { STATE_ID: '37', quotient: 9.34 },
    { STATE_ID: '38', quotient: 11.23 },
    { STATE_ID: '39', quotient: 7.08 },
    { STATE_ID: '40', quotient: 11.22 },
    { STATE_ID: '41', quotient: 6.2 },
    { STATE_ID: '42', quotient: 9.11 },
    { STATE_ID: '44', quotient: 10.42 },
    { STATE_ID: '45', quotient: 8.89 },
    { STATE_ID: '46', quotient: 11.03 },
    { STATE_ID: '47', quotient: 7.35 },
    { STATE_ID: '48', quotient: 8.92 },
    { STATE_ID: '49', quotient: 7.65 },
    { STATE_ID: '50', quotient: 8.01 },
    { STATE_ID: '51', quotient: 7.62 },
    { STATE_ID: '53', quotient: 7.77 },
    { STATE_ID: '54', quotient: 8.49 },
    { STATE_ID: '55', quotient: 9.42 },
    { STATE_ID: '56', quotient: 7.59 }
];

const expression = ['match', ['get', 'STATE_ID']];

class ChemicalEngineers extends Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-96.5, 40],
            zoom: 2.5
        });

        this.map.on('load', () => {
            this.map.addSource('states', {
                type: 'vector',
                url: 'mapbox://mapbox.us_census_states_2015'
            });

            const maxValue = 13;
            // Calculate color
            states.forEach(function (row) {
                const green = (row.quotient / maxValue) * 255;
                const color = `rgba(${0}, ${green}, ${0}, 1)`;
                expression.push(row.STATE_ID, color);
            });

            // Last value is the default
            expression.push('rgba(0,0,0,0)');

            // Add layer from the vector tile source with data-driven style
            this.map.addLayer(
                {
                    id: 'states-join',
                    type: 'fill',
                    source: 'states',
                    'source-layer': 'states',
                    paint: {
                        'fill-color': expression
                    }
                },
                'waterway-label'
            );
        });
    }

    map;

    render() {
        return (
            <Container>
                <Row>
                    <div ref={el => (this.mapContainer = el)} className="absolute top right left bottom" />
                </Row>
                <Row>
                    <OccupationComponent data={info} className="absolute top right left bottom" />;
                </Row>
            </Container>
        );
    }
}

// {stops.map(renderLegendKeys)}
export default ChemicalEngineers;
