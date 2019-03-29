import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Jumbotron, Badge } from 'reactstrap';
import './occupation-instance-page.css';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYW1ldGh5c3QtZWU0NjFsIiwiYSI6ImNqdDdxYWxzZzAwcXc0NG91NnJ4Z2t4bnMifQ.1M-jA2MKBuUbXoy3bIMxlw';

// Hardcoded data from Phase 1 (data in OccupationComponent)
const data = {
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

// http://www.iodb.info/api/joined_instance/state_occ_detailed/occupations_detailed/17-2041
const statesData = [
    {
        annual_10: 70880,
        annual_25: 86730,
        annual_75: 123890,
        annual_90: 151870,
        annual_mean: 106640,
        annual_median: 102100,
        hourly_10: 34.08,
        hourly_25: 41.7,
        hourly_75: 59.56,
        hourly_90: 73.02,
        hourly_mean: 51.27,
        hourly_median: 49.09,
        jobs_1000: 0.233,
        loc_quotient: 0.99,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '01', title: 'Alabama' },
        total_employment: 450
    },
    {
        annual_10: 83260,
        annual_25: 97340,
        annual_75: 169890,
        annual_90: 198600,
        annual_mean: 137360,
        annual_median: 133710,
        hourly_10: 40.03,
        hourly_25: 46.8,
        hourly_75: 81.68,
        hourly_90: 95.48,
        hourly_mean: 66.04,
        hourly_median: 64.28,
        jobs_1000: 0.208,
        loc_quotient: 0.89,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '02', title: 'Alaska' },
        total_employment: 70
    },
    {
        annual_10: 63230,
        annual_25: 89430,
        annual_75: 128800,
        annual_90: 153610,
        annual_mean: 110110,
        annual_median: 110540,
        hourly_10: 30.4,
        hourly_25: 43.0,
        hourly_75: 61.92,
        hourly_90: 73.85,
        hourly_mean: 52.94,
        hourly_median: 53.14,
        jobs_1000: 0.026,
        loc_quotient: 0.11,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '04', title: 'Arizona' },
        total_employment: 70
    },
    {
        annual_10: 53790,
        annual_25: 62050,
        annual_75: 101060,
        annual_90: 117060,
        annual_mean: 86570,
        annual_median: 89340,
        hourly_10: 25.86,
        hourly_25: 29.83,
        hourly_75: 48.59,
        hourly_90: 56.28,
        hourly_mean: 41.62,
        hourly_median: 42.95,
        jobs_1000: 0.144,
        loc_quotient: 0.61,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '05', title: 'Arkansas' },
        total_employment: 170
    },
    {
        annual_10: 56440,
        annual_25: 72460,
        annual_75: 133190,
        annual_90: 159580,
        annual_mean: 105130,
        annual_median: 98410,
        hourly_10: 27.14,
        hourly_25: 34.84,
        hourly_75: 64.03,
        hourly_90: 76.72,
        hourly_mean: 50.54,
        hourly_median: 47.31,
        jobs_1000: 0.138,
        loc_quotient: 0.59,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '06', title: 'California' },
        total_employment: 2310
    },
    {
        annual_10: 44430,
        annual_25: 65830,
        annual_75: 124230,
        annual_90: 154470,
        annual_mean: 95990,
        annual_median: 92380,
        hourly_10: 21.36,
        hourly_25: 31.65,
        hourly_75: 59.72,
        hourly_90: 74.27,
        hourly_mean: 46.15,
        hourly_median: 44.41,
        jobs_1000: 0.236,
        loc_quotient: 1.01,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '08', title: 'Colorado' },
        total_employment: 600
    },
    {
        annual_10: 62120,
        annual_25: 74500,
        annual_75: 116530,
        annual_90: 150190,
        annual_mean: 98220,
        annual_median: 93230,
        hourly_10: 29.87,
        hourly_25: 35.82,
        hourly_75: 56.02,
        hourly_90: 72.21,
        hourly_mean: 47.22,
        hourly_median: 44.82,
        jobs_1000: 0.172,
        loc_quotient: 0.73,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '09', title: 'Connecticut' },
        total_employment: 280
    },
    {
        annual_10: 66200,
        annual_25: 84050,
        annual_75: 149730,
        annual_90: 173200,
        annual_mean: 114860,
        annual_median: 109580,
        hourly_10: 31.83,
        hourly_25: 40.41,
        hourly_75: 71.99,
        hourly_90: 83.27,
        hourly_mean: 55.22,
        hourly_median: 52.68,
        jobs_1000: 1.258,
        loc_quotient: 5.35,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '10', title: 'Delaware' },
        total_employment: 560
    },
    {
        annual_10: 76370,
        annual_25: 98480,
        annual_75: 126950,
        annual_90: 145620,
        annual_mean: 113320,
        annual_median: 120070,
        hourly_10: 36.72,
        hourly_25: 47.34,
        hourly_75: 61.03,
        hourly_90: 70.01,
        hourly_mean: 54.48,
        hourly_median: 57.73,
        jobs_1000: 0.118,
        loc_quotient: 0.5,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '11', title: 'District of Columbia' },
        total_employment: 80
    },
    {
        annual_10: 41000,
        annual_25: 67390,
        annual_75: 120570,
        annual_90: 165980,
        annual_mean: 105770,
        annual_median: 91010,
        hourly_10: 19.71,
        hourly_25: 32.4,
        hourly_75: 57.97,
        hourly_90: 79.8,
        hourly_mean: 50.85,
        hourly_median: 43.75,
        jobs_1000: 0.049,
        loc_quotient: 0.21,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '12', title: 'Florida' },
        total_employment: 410
    },
    {
        annual_10: 38030,
        annual_25: 56600,
        annual_75: 113090,
        annual_90: 132590,
        annual_mean: 89090,
        annual_median: 82570,
        hourly_10: 18.28,
        hourly_25: 27.21,
        hourly_75: 54.37,
        hourly_90: 63.75,
        hourly_mean: 42.83,
        hourly_median: 39.7,
        jobs_1000: 0.132,
        loc_quotient: 0.56,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '13', title: 'Georgia' },
        total_employment: 570
    },
    {
        annual_10: -1,
        annual_25: -1,
        annual_75: -1,
        annual_90: -1,
        annual_mean: -1,
        annual_median: -1,
        hourly_10: -1.0,
        hourly_25: -1.0,
        hourly_75: -1.0,
        hourly_90: -1.0,
        hourly_mean: -1.0,
        hourly_median: -1.0,
        jobs_1000: 0.293,
        loc_quotient: 1.25,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '16', title: 'Idaho' },
        total_employment: 200
    },
    {
        annual_10: 37940,
        annual_25: 65910,
        annual_75: 105560,
        annual_90: 133660,
        annual_mean: 87200,
        annual_median: 84450,
        hourly_10: 18.24,
        hourly_25: 31.69,
        hourly_75: 50.75,
        hourly_90: 64.26,
        hourly_mean: 41.92,
        hourly_median: 40.6,
        jobs_1000: 0.123,
        loc_quotient: 0.52,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '17', title: 'Illinois' },
        total_employment: 730
    },
    {
        annual_10: 59440,
        annual_25: 69430,
        annual_75: 104750,
        annual_90: 124770,
        annual_mean: 89570,
        annual_median: 84070,
        hourly_10: 28.58,
        hourly_25: 33.38,
        hourly_75: 50.36,
        hourly_90: 59.98,
        hourly_mean: 43.06,
        hourly_median: 40.42,
        jobs_1000: 0.117,
        loc_quotient: 0.5,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '18', title: 'Indiana' },
        total_employment: 350
    },
    {
        annual_10: 59920,
        annual_25: 74320,
        annual_75: 123460,
        annual_90: 161900,
        annual_mean: 101230,
        annual_median: 94390,
        hourly_10: 28.81,
        hourly_25: 35.73,
        hourly_75: 59.35,
        hourly_90: 77.84,
        hourly_mean: 48.67,
        hourly_median: 45.38,
        jobs_1000: 0.132,
        loc_quotient: 0.56,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '19', title: 'Iowa' },
        total_employment: 200
    },
    {
        annual_10: 68550,
        annual_25: 82460,
        annual_75: 122720,
        annual_90: 151360,
        annual_mean: 107380,
        annual_median: 99930,
        hourly_10: 32.96,
        hourly_25: 39.65,
        hourly_75: 59.0,
        hourly_90: 72.77,
        hourly_mean: 51.62,
        hourly_median: 48.04,
        jobs_1000: 0.089,
        loc_quotient: 0.38,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '20', title: 'Kansas' },
        total_employment: 120
    },
    {
        annual_10: 58040,
        annual_25: 72990,
        annual_75: 111610,
        annual_90: 133780,
        annual_mean: 93780,
        annual_median: 92030,
        hourly_10: 27.9,
        hourly_25: 35.09,
        hourly_75: 53.66,
        hourly_90: 64.32,
        hourly_mean: 45.09,
        hourly_median: 44.25,
        jobs_1000: 0.24,
        loc_quotient: 1.02,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '21', title: 'Kentucky' },
        total_employment: 450
    },
    {
        annual_10: 66280,
        annual_25: 79550,
        annual_75: 126370,
        annual_90: 161030,
        annual_mean: 108070,
        annual_median: 99170,
        hourly_10: 31.87,
        hourly_25: 38.24,
        hourly_75: 60.75,
        hourly_90: 77.42,
        hourly_mean: 51.96,
        hourly_median: 47.68,
        jobs_1000: 1.208,
        loc_quotient: 5.14,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '22', title: 'Louisiana' },
        total_employment: 2300
    },
    {
        annual_10: 58460,
        annual_25: 72680,
        annual_75: 116570,
        annual_90: 129060,
        annual_mean: 94690,
        annual_median: 97660,
        hourly_10: 28.1,
        hourly_25: 34.94,
        hourly_75: 56.04,
        hourly_90: 62.05,
        hourly_mean: 45.52,
        hourly_median: 46.95,
        jobs_1000: 0.051,
        loc_quotient: 0.22,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '23', title: 'Maine' },
        total_employment: 30
    },
    {
        annual_10: 76100,
        annual_25: 97450,
        annual_75: 130700,
        annual_90: 155150,
        annual_mean: 114230,
        annual_median: 116080,
        hourly_10: 36.58,
        hourly_25: 46.85,
        hourly_75: 62.84,
        hourly_90: 74.59,
        hourly_mean: 54.92,
        hourly_median: 55.81,
        jobs_1000: 0.339,
        loc_quotient: 1.44,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '24', title: 'Maryland' },
        total_employment: 900
    },
    {
        annual_10: 67110,
        annual_25: 77400,
        annual_75: 119280,
        annual_90: 149600,
        annual_mean: 104950,
        annual_median: 95370,
        hourly_10: 32.26,
        hourly_25: 37.21,
        hourly_75: 57.35,
        hourly_90: 71.92,
        hourly_mean: 50.46,
        hourly_median: 45.85,
        jobs_1000: 0.276,
        loc_quotient: 1.18,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '25', title: 'Massachusetts' },
        total_employment: 970
    },
    {
        annual_10: 55550,
        annual_25: 72210,
        annual_75: 117090,
        annual_90: 145170,
        annual_mean: 100150,
        annual_median: 93740,
        hourly_10: 26.71,
        hourly_25: 34.71,
        hourly_75: 56.29,
        hourly_90: 69.79,
        hourly_mean: 48.15,
        hourly_median: 45.07,
        jobs_1000: 0.191,
        loc_quotient: 0.81,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '26', title: 'Michigan' },
        total_employment: 820
    },
    {
        annual_10: 39740,
        annual_25: 65010,
        annual_75: 105030,
        annual_90: 129680,
        annual_mean: 86360,
        annual_median: 82970,
        hourly_10: 19.11,
        hourly_25: 31.26,
        hourly_75: 50.49,
        hourly_90: 62.35,
        hourly_mean: 41.52,
        hourly_median: 39.89,
        jobs_1000: 0.105,
        loc_quotient: 0.45,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '27', title: 'Minnesota' },
        total_employment: 300
    },
    {
        annual_10: 63920,
        annual_25: 83260,
        annual_75: 125930,
        annual_90: 166600,
        annual_mean: 106880,
        annual_median: 103290,
        hourly_10: 30.73,
        hourly_25: 40.03,
        hourly_75: 60.54,
        hourly_90: 80.09,
        hourly_mean: 51.39,
        hourly_median: 49.66,
        jobs_1000: 0.194,
        loc_quotient: 0.82,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '28', title: 'Mississippi' },
        total_employment: 220
    },
    {
        annual_10: 65160,
        annual_25: 76670,
        annual_75: 126330,
        annual_90: 155810,
        annual_mean: 104960,
        annual_median: 100290,
        hourly_10: 31.33,
        hourly_25: 36.86,
        hourly_75: 60.74,
        hourly_90: 74.91,
        hourly_mean: 50.46,
        hourly_median: 48.22,
        jobs_1000: 0.213,
        loc_quotient: 0.91,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '29', title: 'Missouri' },
        total_employment: 590
    },
    {
        annual_10: 66570,
        annual_25: 72120,
        annual_75: 98260,
        annual_90: 114160,
        annual_mean: 85280,
        annual_median: 81280,
        hourly_10: 32.0,
        hourly_25: 34.67,
        hourly_75: 47.24,
        hourly_90: 54.89,
        hourly_mean: 41.0,
        hourly_median: 39.08,
        jobs_1000: 0.119,
        loc_quotient: 0.51,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '31', title: 'Nebraska' },
        total_employment: 120
    },
    {
        annual_10: 67790,
        annual_25: 74430,
        annual_75: 116340,
        annual_90: 164680,
        annual_mean: 109680,
        annual_median: 89780,
        hourly_10: 32.59,
        hourly_25: 35.78,
        hourly_75: 55.93,
        hourly_90: 79.17,
        hourly_mean: 52.73,
        hourly_median: 43.16,
        jobs_1000: 0.049,
        loc_quotient: 0.21,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '32', title: 'Nevada' },
        total_employment: 60
    },
    {
        annual_10: 54230,
        annual_25: 67480,
        annual_75: 99290,
        annual_90: 131690,
        annual_mean: 87830,
        annual_median: 83420,
        hourly_10: 26.07,
        hourly_25: 32.44,
        hourly_75: 47.74,
        hourly_90: 63.31,
        hourly_mean: 42.23,
        hourly_median: 40.11,
        jobs_1000: 0.165,
        loc_quotient: 0.7,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '33', title: 'New Hampshire' },
        total_employment: 110
    },
    {
        annual_10: 66400,
        annual_25: 80580,
        annual_75: 128700,
        annual_90: 160840,
        annual_mean: 111540,
        annual_median: 104210,
        hourly_10: 31.92,
        hourly_25: 38.74,
        hourly_75: 61.88,
        hourly_90: 77.33,
        hourly_mean: 53.63,
        hourly_median: 50.1,
        jobs_1000: 0.318,
        loc_quotient: 1.35,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '34', title: 'New Jersey' },
        total_employment: 1270
    },
    {
        annual_10: 51440,
        annual_25: 84420,
        annual_75: 140540,
        annual_90: 161740,
        annual_mean: 109540,
        annual_median: 110030,
        hourly_10: 24.73,
        hourly_25: 40.58,
        hourly_75: 67.57,
        hourly_90: 77.76,
        hourly_mean: 52.66,
        hourly_median: 52.9,
        jobs_1000: 0.11,
        loc_quotient: 0.47,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '35', title: 'New Mexico' },
        total_employment: 90
    },
    {
        annual_10: 63330,
        annual_25: 77180,
        annual_75: 118230,
        annual_90: 143170,
        annual_mean: 98760,
        annual_median: 95210,
        hourly_10: 30.45,
        hourly_25: 37.11,
        hourly_75: 56.84,
        hourly_90: 68.83,
        hourly_mean: 47.48,
        hourly_median: 45.77,
        jobs_1000: 0.106,
        loc_quotient: 0.45,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '36', title: 'New York' },
        total_employment: 970
    },
    {
        annual_10: 66650,
        annual_25: 76060,
        annual_75: 117640,
        annual_90: 142390,
        annual_mean: 97480,
        annual_median: 93770,
        hourly_10: 32.05,
        hourly_25: 36.57,
        hourly_75: 56.56,
        hourly_90: 68.46,
        hourly_mean: 46.87,
        hourly_median: 45.08,
        jobs_1000: 0.227,
        loc_quotient: 0.96,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '37', title: 'North Carolina' },
        total_employment: 970
    },
    {
        annual_10: -1,
        annual_25: -1,
        annual_75: -1,
        annual_90: -1,
        annual_mean: -1,
        annual_median: -1,
        hourly_10: -1.0,
        hourly_25: -1.0,
        hourly_75: -1.0,
        hourly_90: -1.0,
        hourly_mean: -1.0,
        hourly_median: -1.0,
        jobs_1000: 0.132,
        loc_quotient: 0.56,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '38', title: 'North Dakota' },
        total_employment: 50
    },
    {
        annual_10: 53490,
        annual_25: 70180,
        annual_75: 120490,
        annual_90: 144280,
        annual_mean: 94350,
        annual_median: 91790,
        hourly_10: 25.72,
        hourly_25: 33.74,
        hourly_75: 57.93,
        hourly_90: 69.36,
        hourly_mean: 45.36,
        hourly_median: 44.13,
        jobs_1000: 0.301,
        loc_quotient: 1.28,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '39', title: 'Ohio' },
        total_employment: 1620
    },
    {
        annual_10: 46630,
        annual_25: 71880,
        annual_75: 125850,
        annual_90: 166880,
        annual_mean: 100670,
        annual_median: 92070,
        hourly_10: 22.42,
        hourly_25: 34.56,
        hourly_75: 60.51,
        hourly_90: 80.23,
        hourly_mean: 48.4,
        hourly_median: 44.26,
        jobs_1000: 0.208,
        loc_quotient: 0.88,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '40', title: 'Oklahoma' },
        total_employment: 330
    },
    {
        annual_10: 53600,
        annual_25: 70330,
        annual_75: 120240,
        annual_90: 162390,
        annual_mean: 97850,
        annual_median: 90570,
        hourly_10: 25.77,
        hourly_25: 33.81,
        hourly_75: 57.81,
        hourly_90: 78.07,
        hourly_mean: 47.04,
        hourly_median: 43.54,
        jobs_1000: 0.16,
        loc_quotient: 0.68,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '41', title: 'Oregon' },
        total_employment: 290
    },
    {
        annual_10: 62090,
        annual_25: 72750,
        annual_75: 117030,
        annual_90: 144970,
        annual_mean: 96170,
        annual_median: 91750,
        hourly_10: 29.85,
        hourly_25: 34.98,
        hourly_75: 56.26,
        hourly_90: 69.7,
        hourly_mean: 46.24,
        hourly_median: 44.11,
        jobs_1000: 0.265,
        loc_quotient: 1.13,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '42', title: 'Pennsylvania' },
        total_employment: 1530
    },
    {
        annual_10: 65220,
        annual_25: 72080,
        annual_75: 98930,
        annual_90: 120760,
        annual_mean: 89200,
        annual_median: 82660,
        hourly_10: 31.36,
        hourly_25: 34.65,
        hourly_75: 47.56,
        hourly_90: 58.06,
        hourly_mean: 42.88,
        hourly_median: 39.74,
        jobs_1000: -1.0,
        loc_quotient: -1.0,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '44', title: 'Rhode Island' },
        total_employment: -1
    },
    {
        annual_10: 52610,
        annual_25: 68220,
        annual_75: 95590,
        annual_90: 116590,
        annual_mean: 81990,
        annual_median: 77980,
        hourly_10: 25.29,
        hourly_25: 32.8,
        hourly_75: 45.96,
        hourly_90: 56.05,
        hourly_mean: 39.42,
        hourly_median: 37.49,
        jobs_1000: 0.367,
        loc_quotient: 1.56,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '45', title: 'South Carolina' },
        total_employment: 740
    },
    {
        annual_10: 68040,
        annual_25: 82370,
        annual_75: 123650,
        annual_90: 149820,
        annual_mean: 102650,
        annual_median: 99480,
        hourly_10: 32.71,
        hourly_25: 39.6,
        hourly_75: 59.45,
        hourly_90: 72.03,
        hourly_mean: 49.35,
        hourly_median: 47.83,
        jobs_1000: 0.231,
        loc_quotient: 0.98,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '47', title: 'Tennessee' },
        total_employment: 670
    },
    {
        annual_10: 79610,
        annual_25: 98860,
        annual_75: 170040,
        annual_90: 208000,
        annual_mean: 145660,
        annual_median: 126110,
        hourly_10: 38.28,
        hourly_25: 47.53,
        hourly_75: 81.75,
        hourly_90: 100.0,
        hourly_mean: 70.03,
        hourly_median: 60.63,
        jobs_1000: 0.689,
        loc_quotient: 2.93,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '48', title: 'Texas' },
        total_employment: 8200
    },
    {
        annual_10: -1,
        annual_25: -1,
        annual_75: -1,
        annual_90: -1,
        annual_mean: -1,
        annual_median: -1,
        hourly_10: -1.0,
        hourly_25: -1.0,
        hourly_75: -1.0,
        hourly_90: -1.0,
        hourly_mean: -1.0,
        hourly_median: -1.0,
        jobs_1000: 0.076,
        loc_quotient: 0.33,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '49', title: 'Utah' },
        total_employment: 110
    },
    {
        annual_10: 68030,
        annual_25: 85550,
        annual_75: 133190,
        annual_90: 175510,
        annual_mean: 116880,
        annual_median: 111140,
        hourly_10: 32.71,
        hourly_25: 41.13,
        hourly_75: 64.03,
        hourly_90: 84.38,
        hourly_mean: 56.19,
        hourly_median: 53.43,
        jobs_1000: 0.23,
        loc_quotient: 0.98,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '51', title: 'Virginia' },
        total_employment: 870
    },
    {
        annual_10: 62720,
        annual_25: 78900,
        annual_75: 126510,
        annual_90: 153480,
        annual_mean: 104570,
        annual_median: 105870,
        hourly_10: 30.16,
        hourly_25: 37.93,
        hourly_75: 60.82,
        hourly_90: 73.79,
        hourly_mean: 50.27,
        hourly_median: 50.9,
        jobs_1000: 0.179,
        loc_quotient: 0.76,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '53', title: 'Washington' },
        total_employment: 570
    },
    {
        annual_10: 56060,
        annual_25: 68480,
        annual_75: 108660,
        annual_90: 124480,
        annual_mean: 89570,
        annual_median: 89810,
        hourly_10: 26.95,
        hourly_25: 32.93,
        hourly_75: 52.24,
        hourly_90: 59.85,
        hourly_mean: 43.06,
        hourly_median: 43.18,
        jobs_1000: 0.448,
        loc_quotient: 1.91,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '54', title: 'West Virginia' },
        total_employment: 310
    },
    {
        annual_10: 59330,
        annual_25: 74650,
        annual_75: 117410,
        annual_90: 143360,
        annual_mean: 98950,
        annual_median: 93400,
        hourly_10: 28.52,
        hourly_25: 35.89,
        hourly_75: 56.45,
        hourly_90: 68.92,
        hourly_mean: 47.57,
        hourly_median: 44.91,
        jobs_1000: 0.209,
        loc_quotient: 0.89,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '55', title: 'Wisconsin' },
        total_employment: 590
    },
    {
        annual_10: 41880,
        annual_25: 56240,
        annual_75: 128110,
        annual_90: 156890,
        annual_mean: 99950,
        annual_median: 92620,
        hourly_10: 20.14,
        hourly_25: 27.04,
        hourly_75: 61.59,
        hourly_90: 75.43,
        hourly_mean: 48.05,
        hourly_median: 44.53,
        jobs_1000: 0.216,
        loc_quotient: 0.92,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '56', title: 'Wyoming' },
        total_employment: 60
    },
    {
        annual_10: 34820,
        annual_25: 40400,
        annual_75: 80580,
        annual_90: 120570,
        annual_mean: 64490,
        annual_median: 49620,
        hourly_10: 16.74,
        hourly_25: 19.42,
        hourly_75: 38.74,
        hourly_90: 57.97,
        hourly_mean: 31.0,
        hourly_median: 23.85,
        jobs_1000: -1.0,
        loc_quotient: -1.0,
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        state: { id: '72', title: 'Puerto Rico' },
        total_employment: -1
    }
];

// http://www.iodb.info/api/instance/occupations_detailed/17-2041
const titleAndWageData = {
    annual_10: 62230,
    annual_25: 79030,
    annual_75: 131030,
    annual_90: 169080,
    annual_mean: 112430,
    annual_median: 102160,
    description:
        'Design chemical plant equipment and devise processes for manufacturing chemicals and products, such as gasoline, synthetic rubber, plastics, detergents, cement, paper, and pulp, by applying principles and technology of chemistry, physics, and engineering.',
    hourly_10: 29.92,
    hourly_25: 37.99,
    hourly_75: 63.0,
    hourly_90: 81.29,
    hourly_mean: 54.05,
    hourly_median: 49.12,
    id: '17-2041',
    occupation_major: { id: '17-0000', title: 'Architecture and Engineering Occupations' },
    title: 'Chemical Engineers',
    total_employment: 33500
};

// For Bar graph use, populated by wageData
const barData = {
    labels: ['10%', '25%', '50%', '75%', '90%'],
    datasets: [
        {
            label: 'Wage (Dollar Amount)',
            backgroundColor: 'rgba(255,99,132,1)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [
                titleAndWageData.annual_10,
                titleAndWageData.annual_25,
                titleAndWageData.annual_mean,
                titleAndWageData.annual_75,
                titleAndWageData.annual_90
            ]
        }
    ]
};

// http://www.iodb.info/api/joined_instance/ind_3d_occ_detailed/occupations_detailed/17-2041
const industryData = [
    {
        annual_10: 86780,
        annual_25: 103870,
        annual_75: 175130,
        annual_90: 205390,
        annual_mean: 145060,
        annual_median: 137430,
        hourly_10: 41.72,
        hourly_25: 49.94,
        hourly_75: 84.2,
        hourly_90: 98.75,
        hourly_mean: 69.74,
        hourly_median: 66.07,
        industry_3d: { id: '211000', title: 'Oil and Gas Extraction' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 170
    },
    {
        annual_10: 69360,
        annual_25: 79780,
        annual_75: 103710,
        annual_90: 128110,
        annual_mean: 95050,
        annual_median: 92250,
        hourly_10: 33.35,
        hourly_25: 38.36,
        hourly_75: 49.86,
        hourly_90: 61.59,
        hourly_mean: 45.7,
        hourly_median: 44.35,
        industry_3d: { id: '213000', title: 'Support Activities for Mining' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 40
    },
    {
        annual_10: 68480,
        annual_25: 75400,
        annual_75: 114710,
        annual_90: 140370,
        annual_mean: 100520,
        annual_median: 90050,
        hourly_10: 32.93,
        hourly_25: 36.25,
        hourly_75: 55.15,
        hourly_90: 67.49,
        hourly_mean: 48.33,
        hourly_median: 43.3,
        industry_3d: { id: '221000', title: 'Utilities' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 450
    },
    {
        annual_10: 68970,
        annual_25: 78980,
        annual_75: 134940,
        annual_90: 161060,
        annual_mean: 109210,
        annual_median: 104320,
        hourly_10: 33.16,
        hourly_25: 37.97,
        hourly_75: 64.88,
        hourly_90: 77.43,
        hourly_mean: 52.5,
        hourly_median: 50.15,
        industry_3d: { id: '236000', title: 'Construction of Buildings' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 130
    },
    {
        annual_10: -1,
        annual_25: -1,
        annual_75: -1,
        annual_90: -1,
        annual_mean: -1,
        annual_median: -1,
        hourly_10: -1.0,
        hourly_25: -1.0,
        hourly_75: -1.0,
        hourly_90: -1.0,
        hourly_mean: -1.0,
        hourly_median: -1.0,
        industry_3d: { id: '311000', title: 'Food Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 60
    },
    {
        annual_10: 64530,
        annual_25: 72280,
        annual_75: 112100,
        annual_90: 143450,
        annual_mean: 95340,
        annual_median: 88650,
        hourly_10: 31.02,
        hourly_25: 34.75,
        hourly_75: 53.89,
        hourly_90: 68.97,
        hourly_mean: 45.84,
        hourly_median: 42.62,
        industry_3d: { id: '322000', title: 'Paper Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 100
    },
    {
        annual_10: 64590,
        annual_25: 83330,
        annual_75: 136990,
        annual_90: 175580,
        annual_mean: 115740,
        annual_median: 107050,
        hourly_10: 31.05,
        hourly_25: 40.06,
        hourly_75: 65.86,
        hourly_90: 84.42,
        hourly_mean: 55.64,
        hourly_median: 51.47,
        industry_3d: { id: '324000', title: 'Petroleum and Coal Products Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 1970
    },
    {
        annual_10: 65820,
        annual_25: 81920,
        annual_75: 129720,
        annual_90: 165610,
        annual_mean: 112310,
        annual_median: 102460,
        hourly_10: 31.64,
        hourly_25: 39.39,
        hourly_75: 62.37,
        hourly_90: 79.62,
        hourly_mean: 54.0,
        hourly_median: 49.26,
        industry_3d: { id: '325000', title: 'Chemical Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 12950
    },
    {
        annual_10: 57990,
        annual_25: 71760,
        annual_75: 113730,
        annual_90: 146390,
        annual_mean: 94650,
        annual_median: 89650,
        hourly_10: 27.88,
        hourly_25: 34.5,
        hourly_75: 54.68,
        hourly_90: 70.38,
        hourly_mean: 45.5,
        hourly_median: 43.1,
        industry_3d: { id: '326000', title: 'Plastics and Rubber Products Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 780
    },
    {
        annual_10: 63990,
        annual_25: 74510,
        annual_75: 110720,
        annual_90: 127050,
        annual_mean: 91860,
        annual_median: 90750,
        hourly_10: 30.77,
        hourly_25: 35.82,
        hourly_75: 53.23,
        hourly_90: 61.08,
        hourly_mean: 44.17,
        hourly_median: 43.63,
        industry_3d: { id: '327000', title: 'Nonmetallic Mineral Product Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 80
    },
    {
        annual_10: 50000,
        annual_25: 68900,
        annual_75: 101950,
        annual_90: 127380,
        annual_mean: 87430,
        annual_median: 80100,
        hourly_10: 24.04,
        hourly_25: 33.12,
        hourly_75: 49.02,
        hourly_90: 61.24,
        hourly_mean: 42.04,
        hourly_median: 38.51,
        industry_3d: { id: '331000', title: 'Primary Metal Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 90
    },
    {
        annual_10: 55420,
        annual_25: 68730,
        annual_75: 114730,
        annual_90: 130150,
        annual_mean: 91070,
        annual_median: 89670,
        hourly_10: 26.64,
        hourly_25: 33.04,
        hourly_75: 55.16,
        hourly_90: 62.57,
        hourly_mean: 43.78,
        hourly_median: 43.11,
        industry_3d: { id: '332000', title: 'Fabricated Metal Product Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 240
    },
    {
        annual_10: 60000,
        annual_25: 73470,
        annual_75: 118990,
        annual_90: 137450,
        annual_mean: 96840,
        annual_median: 94410,
        hourly_10: 28.85,
        hourly_25: 35.32,
        hourly_75: 57.21,
        hourly_90: 66.08,
        hourly_mean: 46.56,
        hourly_median: 45.39,
        industry_3d: { id: '333000', title: 'Machinery Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 510
    },
    {
        annual_10: 65830,
        annual_25: 80150,
        annual_75: 122840,
        annual_90: 148450,
        annual_mean: 102060,
        annual_median: 98600,
        hourly_10: 31.65,
        hourly_25: 38.53,
        hourly_75: 59.06,
        hourly_90: 71.37,
        hourly_mean: 49.07,
        hourly_median: 47.41,
        industry_3d: { id: '334000', title: 'Computer and Electronic Product Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 610
    },
    {
        annual_10: 66650,
        annual_25: 73440,
        annual_75: 102970,
        annual_90: 129880,
        annual_mean: 93020,
        annual_median: 86760,
        hourly_10: 32.04,
        hourly_25: 35.31,
        hourly_75: 49.51,
        hourly_90: 62.44,
        hourly_mean: 44.72,
        hourly_median: 41.71,
        industry_3d: { id: '335000', title: 'Electrical Equipment, Appliance, and Component Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 160
    },
    {
        annual_10: 60020,
        annual_25: 72520,
        annual_75: 124100,
        annual_90: 139100,
        annual_mean: 101050,
        annual_median: 106160,
        hourly_10: 28.86,
        hourly_25: 34.87,
        hourly_75: 59.66,
        hourly_90: 66.88,
        hourly_mean: 48.58,
        hourly_median: 51.04,
        industry_3d: { id: '336000', title: 'Transportation Equipment Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 200
    },
    {
        annual_10: 64270,
        annual_25: 73200,
        annual_75: 114580,
        annual_90: 139850,
        annual_mean: 95730,
        annual_median: 90040,
        hourly_10: 30.9,
        hourly_25: 35.19,
        hourly_75: 55.09,
        hourly_90: 67.24,
        hourly_mean: 46.02,
        hourly_median: 43.29,
        industry_3d: { id: '339000', title: 'Miscellaneous Manufacturing' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 360
    },
    {
        annual_10: 78500,
        annual_25: 90870,
        annual_75: 127430,
        annual_90: 163910,
        annual_mean: 113910,
        annual_median: 106560,
        hourly_10: 37.74,
        hourly_25: 43.69,
        hourly_75: 61.27,
        hourly_90: 78.81,
        hourly_mean: 54.77,
        hourly_median: 51.23,
        industry_3d: { id: '423000', title: 'Merchant Wholesalers, Durable Goods' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 70
    },
    {
        annual_10: 49600,
        annual_25: 69220,
        annual_75: 126840,
        annual_90: 166440,
        annual_mean: 107100,
        annual_median: 96830,
        hourly_10: 23.84,
        hourly_25: 33.28,
        hourly_75: 60.98,
        hourly_90: 80.02,
        hourly_mean: 51.49,
        hourly_median: 46.55,
        industry_3d: { id: '424000', title: 'Merchant Wholesalers, Nondurable Goods' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 1150
    },
    {
        annual_10: 57510,
        annual_25: 67780,
        annual_75: 86780,
        annual_90: 101990,
        annual_mean: 77410,
        annual_median: 75580,
        hourly_10: 27.65,
        hourly_25: 32.59,
        hourly_75: 41.72,
        hourly_90: 49.03,
        hourly_mean: 37.22,
        hourly_median: 36.34,
        industry_3d: { id: '425000', title: 'Wholesale Electronic Markets and Agents and Brokers' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 230
    },
    {
        annual_10: 63760,
        annual_25: 81660,
        annual_75: 139760,
        annual_90: 184880,
        annual_mean: 117840,
        annual_median: 105980,
        hourly_10: 30.65,
        hourly_25: 39.26,
        hourly_75: 67.19,
        hourly_90: 88.89,
        hourly_mean: 56.65,
        hourly_median: 50.95,
        industry_3d: { id: '541000', title: 'Professional, Scientific, and Technical Services' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 8590
    },
    {
        annual_10: 76390,
        annual_25: 100740,
        annual_75: 188010,
        annual_90: 208000,
        annual_mean: 153870,
        annual_median: 133780,
        hourly_10: 36.73,
        hourly_25: 48.44,
        hourly_75: 90.39,
        hourly_90: 100.0,
        hourly_mean: 73.98,
        hourly_median: 64.32,
        industry_3d: { id: '551000', title: 'Management of Companies and Enterprises' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 1680
    },
    {
        annual_10: 61000,
        annual_25: 78600,
        annual_75: 138450,
        annual_90: 164440,
        annual_mean: 111110,
        annual_median: 106220,
        hourly_10: 29.33,
        hourly_25: 37.79,
        hourly_75: 66.56,
        hourly_90: 79.06,
        hourly_mean: 53.42,
        hourly_median: 51.07,
        industry_3d: { id: '561000', title: 'Administrative and Support Services' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 470
    },
    {
        annual_10: 66920,
        annual_25: 70660,
        annual_75: 85000,
        annual_90: 102480,
        annual_mean: 83670,
        annual_median: 76900,
        hourly_10: 32.17,
        hourly_25: 33.97,
        hourly_75: 40.86,
        hourly_90: 49.27,
        hourly_mean: 40.23,
        hourly_median: 36.97,
        industry_3d: { id: '562000', title: 'Waste Management and Remediation Services' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 260
    },
    {
        annual_10: 39800,
        annual_25: 44560,
        annual_75: 68990,
        annual_90: 97540,
        annual_mean: 60630,
        annual_median: 51610,
        hourly_10: 19.14,
        hourly_25: 21.43,
        hourly_75: 33.17,
        hourly_90: 46.89,
        hourly_mean: 29.15,
        hourly_median: 24.81,
        industry_3d: { id: '611000', title: 'Educational Services' },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 800
    },
    {
        annual_10: 68580,
        annual_25: 90360,
        annual_75: 123230,
        annual_90: 144100,
        annual_mean: 107390,
        annual_median: 109330,
        hourly_10: 32.97,
        hourly_25: 43.44,
        hourly_75: 59.25,
        hourly_90: 69.28,
        hourly_mean: 51.63,
        hourly_median: 52.56,
        industry_3d: {
            id: '999000',
            title:
                'Federal, State, and Local Government, excluding state and local schools and hospitals and the U.S. Postal Service (OES Designation)'
        },
        occupation_detailed: { id: '17-2041', title: 'Chemical Engineers' },
        total_employment: 1170
    }
];

// For Bar graph use
const labelArray = [];
const dataArray = [];

// Populating labels for industries from API data
industryData.forEach(industry => {
    labelArray.push(industry.industry_3d.title);
    dataArray.push(industry.annual_mean);
});

// Setting Bar data from arrays populated with industries
const industries = {
    labels: labelArray,
    datasets: [
        {
            label: 'Wage (Dollar Amount)',
            backgroundColor: 'rgba(255,99,132,1)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: dataArray
        }
    ]
};

// For use to calculate state fill shade color
const expression = ['match', ['get', 'STATE_ID']];

const legendData = {
    name: 'Employment',
    description: 'Total employment in US States',
    stops: [
        [0, '#f8d5cc'],
        [1000000, '#f4bfb6'],
        [5000000, '#f1a8a5'],
        [10000000, '#ee8f9a'],
        [50000000, '#ec739b'],
        [100000000, '#dd5ca8'],
        [250000000, '#c44cc0'],
        [500000000, '#9f43d7'],
        [1000000000, '#6e40e6']
    ]
};

class ChemicalEngineers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            legend: legendData
        };
    }

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

            // Maximum location quotient
            const maxValue = 5.35;
            // Calculate color
            statesData.forEach(stateData => {
                if (stateData.loc_quotient === -1.0) {
                    // grey color if no location quotient for state
                    const color = `rgba(${102}, ${102}, ${121}, 0.75)`;
                    expression.push(stateData.state.id, color);
                } else {
                    const green = 255 - (stateData.loc_quotient / maxValue) * 255;
                    const color = `rgba(${255}, ${green}, ${132}, 0.75)`;
                    expression.push(stateData.state.id, color);
                }
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
        const { name, description, stops } = this.state.legend;
        const renderLegend = (stop, i) => (
            <div key={i} className="txt-s">
                <span
                    className="mr6 round-full w12 h12 inline-block align-middle"
                    style={{ backgroundColor: stop[1] }}
                />
                <span>{`${stop[0].toLocaleString()}`}</span>
            </div>
        );
        console.log('props', this.props);
        return (
            <Container>
                <Jumbotron>
                    <h1 className="display-3">{titleAndWageData.title}</h1>
                    <p>NAICS: {titleAndWageData.id} </p>
                    <hr className="my-2" />
                    <p className="lead">{titleAndWageData.description}</p>
                    <p>
                        Annual Mean Wage:
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(titleAndWageData.annual_mean)}
                    </p>
                </Jumbotron>
                <Row>
                    <h1>Where are {titleAndWageData.title} located?</h1>
                    <div ref={el => (this.mapContainer = el)} />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180">
                        <div className="mb6">
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </Row>
                <div className="container">
                    <h2>Annual Percentile Wages for {titleAndWageData.title}</h2>
                    <Bar
                        data={barData}
                        width={100}
                        height={50}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
                <div>
                    <h2>Wage by Industry</h2>
                    <Bar
                        data={industries}
                        width={100}
                        height={50}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
            </Container>
        );
    }
}

export default ChemicalEngineers;