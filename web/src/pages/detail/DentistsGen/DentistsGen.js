import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Jumbotron, Badge } from 'reactstrap';
import './DentistsGen.css';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYW1ldGh5c3QtZWU0NjFsIiwiYSI6ImNqdDdxYWxzZzAwcXc0NG91NnJ4Z2t4bnMifQ.1M-jA2MKBuUbXoy3bIMxlw';

const info = {
    info: {
        occupation: 'Dentists, General',
        naics: '(29-1021)',
        description:
            'Examine, diagnose, and treat diseases, injuries, and malformations of teeth and gums. May treat diseases of nerve, pulp, and other dental tissues affecting oral hygiene and retention of teeth. May fit dental appliances or provide preventive care. Excludes "Prosthodontists" (29-1024), "Orthodontists" (29-1023), "Oral and Maxillofacial Surgeons" (29-1022) and "Dentists, All Other Specialists" (29-1029).',
        meanWage: 'Annual mean wage: $174,110'
    },
    percentile: {
        title: 'Annual Percentile Wages',
        headers: [10, 25, 50, 75, 90],
        values: [69210, 104800, 151440, -1, -1]
    },
    industries: {
        headers: ['Industry Name', 'NAICS', 'Employment', 'Annual Mean', 'Annual Median'],
        values: [
            ['Ambulatory Health Care Services', '6621000', 105660, 175290, 152550],
            ['Offices of Dentists', '621200', 99490, 176630, 154130],
            ['Outpatient Care Centers', '621400', 2880, 152810, 141740],
            ['Offices of Physicians', '621100', 2760, 155690, 141730],
            ['Hospitals (including private, state, and local government hospitals)', '622000', 1850, 139020, 134250]
        ]
    },
    states: {
        headers: ['State', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
        values: [
            ['Hawaii', '1500000', 1.42, 700, 174070, 130080],
            ['California', '0600000', 1.33, 17130, 157890, 135490],
            ['Montana', '3000000', 1.29, 460, 161060, 139820],
            ['Arizona', '0400000', 1.25, 2620, 175310, 166990],
            ['New Jersey', '3400000', 1.25, 3880, 164310, 132190]
        ]
    },
    metropolitan: {
        headers: ['Area', 'SOC', 'Location Quotient', 'Employment', 'Annual Mean Wage', 'Annual Median Wage'],
        values: [
            ['Northwest Florida nonmetropolitan area', '1200001', 3.21, 80, 110010, 78110],
            ['Barnstable Town, MA', '0070900', 2.67, 210, 175880, 125460],
            ['Fayetteville, NC', '0022180', 2.29, 230, 209590, 166680],
            ['Flint, MI', '0022420', 2.27, 240, 207700, 193210],
            ['Hawaii/Kauai nonmetropolitan area', '1500001', 2.09, 160, 108320, 19690]
        ]
    }
};

const statesData = [
    {
        annual_10: 48280,
        annual_25: 94680,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 181240,
        annual_median: 162750,
        hourly_10: 23.21,
        hourly_25: 45.52,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 87.13,
        hourly_median: 78.24,
        jobs_1000: 0.525,
        loc_quotient: 0.68,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '01', title: 'Alabama' },
        total_employment: 1010
    },
    {
        annual_10: 154460,
        annual_25: 181460,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 237140,
        annual_median: 208000,
        hourly_10: 74.26,
        hourly_25: 87.24,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 114.01,
        hourly_median: 100.0,
        jobs_1000: 0.644,
        loc_quotient: 0.83,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '02', title: 'Alaska' },
        total_employment: 200
    },
    {
        annual_10: 61020,
        annual_25: 93900,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 175310,
        annual_median: 166990,
        hourly_10: 29.34,
        hourly_25: 45.15,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 84.28,
        hourly_median: 80.29,
        jobs_1000: 0.968,
        loc_quotient: 1.25,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '04', title: 'Arizona' },
        total_employment: 2620
    },
    {
        annual_10: 83360,
        annual_25: 100650,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 170440,
        annual_median: 141300,
        hourly_10: 40.08,
        hourly_25: 48.39,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 81.94,
        hourly_median: 67.93,
        jobs_1000: 0.627,
        loc_quotient: 0.81,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '05', title: 'Arkansas' },
        total_employment: 750
    },
    {
        annual_10: 59920,
        annual_25: 82220,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 157890,
        annual_median: 135490,
        hourly_10: 28.81,
        hourly_25: 39.53,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 75.91,
        hourly_median: 65.14,
        jobs_1000: 1.026,
        loc_quotient: 1.33,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '06', title: 'California' },
        total_employment: 17130
    },
    {
        annual_10: 67140,
        annual_25: 92190,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 168110,
        annual_median: 135000,
        hourly_10: 32.28,
        hourly_25: 44.32,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 80.82,
        hourly_median: 64.9,
        jobs_1000: 0.756,
        loc_quotient: 0.98,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '08', title: 'Colorado' },
        total_employment: 1930
    },
    {
        annual_10: 87970,
        annual_25: 153850,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 212840,
        annual_median: 201590,
        hourly_10: 42.29,
        hourly_25: 73.96,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 102.33,
        hourly_median: 96.92,
        jobs_1000: 0.727,
        loc_quotient: 0.94,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '09', title: 'Connecticut' },
        total_employment: 1200
    },
    {
        annual_10: 102510,
        annual_25: 206280,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 257290,
        annual_median: 208000,
        hourly_10: 49.28,
        hourly_25: 99.17,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 123.7,
        hourly_median: 100.0,
        jobs_1000: 0.861,
        loc_quotient: 1.11,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '10', title: 'Delaware' },
        total_employment: 380
    },
    {
        annual_10: 55670,
        annual_25: 109670,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 180600,
        annual_median: 157130,
        hourly_10: 26.76,
        hourly_25: 52.73,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 86.83,
        hourly_median: 75.54,
        jobs_1000: 0.41,
        loc_quotient: 0.53,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '11', title: 'District of Columbia' },
        total_employment: 290
    },
    {
        annual_10: 62260,
        annual_25: 92440,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 166610,
        annual_median: 148300,
        hourly_10: 29.93,
        hourly_25: 44.44,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 80.1,
        hourly_median: 71.3,
        jobs_1000: 0.782,
        loc_quotient: 1.01,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '12', title: 'Florida' },
        total_employment: 6590
    },
    {
        annual_10: 70650,
        annual_25: 104570,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 181690,
        annual_median: 144280,
        hourly_10: 33.97,
        hourly_25: 50.27,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 87.35,
        hourly_median: 69.37,
        jobs_1000: 0.646,
        loc_quotient: 0.83,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '13', title: 'Georgia' },
        total_employment: 2780
    },
    {
        annual_10: 81430,
        annual_25: 100320,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 174070,
        annual_median: 130080,
        hourly_10: 39.15,
        hourly_25: 48.23,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 83.69,
        hourly_median: 62.54,
        jobs_1000: 1.101,
        loc_quotient: 1.42,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '15', title: 'Hawaii' },
        total_employment: 700
    },
    {
        annual_10: 58160,
        annual_25: 118790,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 187800,
        annual_median: 166810,
        hourly_10: 27.96,
        hourly_25: 57.11,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 90.29,
        hourly_median: 80.2,
        jobs_1000: 0.458,
        loc_quotient: 0.59,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '16', title: 'Idaho' },
        total_employment: 310
    },
    {
        annual_10: 78060,
        annual_25: 97460,
        annual_75: 203570,
        annual_90: 208000,
        annual_mean: 161270,
        annual_median: 131780,
        hourly_10: 37.53,
        hourly_25: 46.86,
        hourly_75: 97.87,
        hourly_90: 100.0,
        hourly_mean: 77.53,
        hourly_median: 63.36,
        jobs_1000: 0.782,
        loc_quotient: 1.01,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '17', title: 'Illinois' },
        total_employment: 4630
    },
    {
        annual_10: 83380,
        annual_25: 120270,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 185820,
        annual_median: 158960,
        hourly_10: 40.09,
        hourly_25: 57.82,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 89.34,
        hourly_median: 76.42,
        jobs_1000: 0.568,
        loc_quotient: 0.73,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '18', title: 'Indiana' },
        total_employment: 1710
    },
    {
        annual_10: 65590,
        annual_25: 104990,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 193130,
        annual_median: 179820,
        hourly_10: 31.53,
        hourly_25: 50.48,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 92.85,
        hourly_median: 86.45,
        jobs_1000: 0.713,
        loc_quotient: 0.92,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '19', title: 'Iowa' },
        total_employment: 1100
    },
    {
        annual_10: 99220,
        annual_25: 126870,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 185600,
        annual_median: 156340,
        hourly_10: 47.7,
        hourly_25: 61.0,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 89.23,
        hourly_median: 75.16,
        jobs_1000: 0.794,
        loc_quotient: 1.03,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '20', title: 'Kansas' },
        total_employment: 1090
    },
    {
        annual_10: 62340,
        annual_25: 111960,
        annual_75: 202320,
        annual_90: 208000,
        annual_mean: 163390,
        annual_median: 140040,
        hourly_10: 29.97,
        hourly_25: 53.83,
        hourly_75: 97.27,
        hourly_90: 100.0,
        hourly_mean: 78.55,
        hourly_median: 67.33,
        jobs_1000: 0.511,
        loc_quotient: 0.66,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '21', title: 'Kentucky' },
        total_employment: 960
    },
    {
        annual_10: 38140,
        annual_25: 53120,
        annual_75: 145070,
        annual_90: 208000,
        annual_mean: 115050,
        annual_median: 103140,
        hourly_10: 18.34,
        hourly_25: 25.54,
        hourly_75: 69.74,
        hourly_90: 100.0,
        hourly_mean: 55.31,
        hourly_median: 49.59,
        jobs_1000: 0.396,
        loc_quotient: 0.51,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '22', title: 'Louisiana' },
        total_employment: 750
    },
    {
        annual_10: 71520,
        annual_25: 95630,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 179920,
        annual_median: 157740,
        hourly_10: 34.39,
        hourly_25: 45.98,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 86.5,
        hourly_median: 75.84,
        jobs_1000: 0.832,
        loc_quotient: 1.07,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '23', title: 'Maine' },
        total_employment: 500
    },
    {
        annual_10: 58520,
        annual_25: 101200,
        annual_75: 194690,
        annual_90: 208000,
        annual_mean: 154010,
        annual_median: 135730,
        hourly_10: 28.13,
        hourly_25: 48.65,
        hourly_75: 93.6,
        hourly_90: 100.0,
        hourly_mean: 74.04,
        hourly_median: 65.26,
        jobs_1000: 0.961,
        loc_quotient: 1.24,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '24', title: 'Maryland' },
        total_employment: 2560
    },
    {
        annual_10: 83100,
        annual_25: 110820,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 175580,
        annual_median: 145170,
        hourly_10: 39.95,
        hourly_25: 53.28,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 84.42,
        hourly_median: 69.79,
        jobs_1000: 0.944,
        loc_quotient: 1.22,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '25', title: 'Massachusetts' },
        total_employment: 3330
    },
    {
        annual_10: 91000,
        annual_25: 119400,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 187430,
        annual_median: 173770,
        hourly_10: 43.75,
        hourly_25: 57.41,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 90.11,
        hourly_median: 83.54,
        jobs_1000: 0.95,
        loc_quotient: 1.23,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '26', title: 'Michigan' },
        total_employment: 4060
    },
    {
        annual_10: 117540,
        annual_25: 143110,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 210320,
        annual_median: 180880,
        hourly_10: 56.51,
        hourly_25: 68.81,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 101.12,
        hourly_median: 86.96,
        jobs_1000: 0.572,
        loc_quotient: 0.74,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '27', title: 'Minnesota' },
        total_employment: 1620
    },
    {
        annual_10: 80510,
        annual_25: 108830,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 182520,
        annual_median: 156750,
        hourly_10: 38.71,
        hourly_25: 52.32,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 87.75,
        hourly_median: 75.36,
        jobs_1000: 0.574,
        loc_quotient: 0.74,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '28', title: 'Mississippi' },
        total_employment: 640
    },
    {
        annual_10: 90270,
        annual_25: 119110,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 180350,
        annual_median: 151770,
        hourly_10: 43.4,
        hourly_25: 57.27,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 86.71,
        hourly_median: 72.96,
        jobs_1000: 0.541,
        loc_quotient: 0.7,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '29', title: 'Missouri' },
        total_employment: 1510
    },
    {
        annual_10: 69080,
        annual_25: 86940,
        annual_75: 206250,
        annual_90: 208000,
        annual_mean: 161060,
        annual_median: 139820,
        hourly_10: 33.21,
        hourly_25: 41.8,
        hourly_75: 99.16,
        hourly_90: 100.0,
        hourly_mean: 77.43,
        hourly_median: 67.22,
        jobs_1000: 0.998,
        loc_quotient: 1.29,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '30', title: 'Montana' },
        total_employment: 460
    },
    {
        annual_10: 59400,
        annual_25: 77770,
        annual_75: 189010,
        annual_90: 208000,
        annual_mean: 148230,
        annual_median: 126350,
        hourly_10: 28.56,
        hourly_25: 37.39,
        hourly_75: 90.87,
        hourly_90: 100.0,
        hourly_mean: 71.27,
        hourly_median: 60.74,
        jobs_1000: 0.684,
        loc_quotient: 0.88,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '31', title: 'Nebraska' },
        total_employment: 660
    },
    {
        annual_10: 97990,
        annual_25: 125870,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 209360,
        annual_median: 188820,
        hourly_10: 47.11,
        hourly_25: 60.51,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 100.66,
        hourly_median: 90.78,
        jobs_1000: 0.896,
        loc_quotient: 1.16,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '32', title: 'Nevada' },
        total_employment: 1170
    },
    {
        annual_10: 130470,
        annual_25: 162550,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 219920,
        annual_median: 202170,
        hourly_10: 62.73,
        hourly_25: 78.15,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 105.73,
        hourly_median: 97.2,
        jobs_1000: 0.784,
        loc_quotient: 1.01,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '33', title: 'New Hampshire' },
        total_employment: 510
    },
    {
        annual_10: 76080,
        annual_25: 100130,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 164310,
        annual_median: 132190,
        hourly_10: 36.58,
        hourly_25: 48.14,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 79.0,
        hourly_median: 63.55,
        jobs_1000: 0.968,
        loc_quotient: 1.25,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '34', title: 'New Jersey' },
        total_employment: 3880
    },
    {
        annual_10: 45880,
        annual_25: 63520,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 167720,
        annual_median: 156620,
        hourly_10: 22.06,
        hourly_25: 30.54,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 80.64,
        hourly_median: 75.3,
        jobs_1000: 0.888,
        loc_quotient: 1.15,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '35', title: 'New Mexico' },
        total_employment: 710
    },
    {
        annual_10: 107820,
        annual_25: 116760,
        annual_75: 200970,
        annual_90: 208000,
        annual_mean: 168120,
        annual_median: 132710,
        hourly_10: 51.84,
        hourly_25: 56.13,
        hourly_75: 96.62,
        hourly_90: 100.0,
        hourly_mean: 80.83,
        hourly_median: 63.8,
        jobs_1000: 0.906,
        loc_quotient: 1.17,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '36', title: 'New York' },
        total_employment: 8340
    },
    {
        annual_10: 102000,
        annual_25: 146350,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 225890,
        annual_median: 208000,
        hourly_10: 49.04,
        hourly_25: 70.36,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 108.6,
        hourly_median: 100.0,
        jobs_1000: 0.751,
        loc_quotient: 0.97,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '37', title: 'North Carolina' },
        total_employment: 3230
    },
    {
        annual_10: 112150,
        annual_25: 171370,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 238170,
        annual_median: 208000,
        hourly_10: 53.92,
        hourly_25: 82.39,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 114.51,
        hourly_median: 100.0,
        jobs_1000: 0.489,
        loc_quotient: 0.63,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '38', title: 'North Dakota' },
        total_employment: 200
    },
    {
        annual_10: 84800,
        annual_25: 117570,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 187770,
        annual_median: 175780,
        hourly_10: 40.77,
        hourly_25: 56.52,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 90.28,
        hourly_median: 84.51,
        jobs_1000: 0.598,
        loc_quotient: 0.77,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '39', title: 'Ohio' },
        total_employment: 3210
    },
    {
        annual_10: 80130,
        annual_25: 98380,
        annual_75: 207980,
        annual_90: 208000,
        annual_mean: 161010,
        annual_median: 129130,
        hourly_10: 38.52,
        hourly_25: 47.3,
        hourly_75: 99.99,
        hourly_90: 100.0,
        hourly_mean: 77.41,
        hourly_median: 62.08,
        jobs_1000: 0.716,
        loc_quotient: 0.92,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '40', title: 'Oklahoma' },
        total_employment: 1130
    },
    {
        annual_10: 86610,
        annual_25: 136330,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 202030,
        annual_median: 189680,
        hourly_10: 41.64,
        hourly_25: 65.54,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 97.13,
        hourly_median: 91.19,
        jobs_1000: 0.872,
        loc_quotient: 1.13,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '41', title: 'Oregon' },
        total_employment: 1600
    },
    {
        annual_10: 54300,
        annual_25: 65640,
        annual_75: 176490,
        annual_90: 208000,
        annual_mean: 138200,
        annual_median: 113470,
        hourly_10: 26.11,
        hourly_25: 31.56,
        hourly_75: 84.85,
        hourly_90: 100.0,
        hourly_mean: 66.44,
        hourly_median: 54.55,
        jobs_1000: 0.654,
        loc_quotient: 0.84,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '42', title: 'Pennsylvania' },
        total_employment: 3780
    },
    {
        annual_10: 137230,
        annual_25: 147120,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 206520,
        annual_median: 163600,
        hourly_10: 65.98,
        hourly_25: 70.73,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 99.29,
        hourly_median: 78.65,
        jobs_1000: 0.482,
        loc_quotient: 0.62,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '44', title: 'Rhode Island' },
        total_employment: 230
    },
    {
        annual_10: 85920,
        annual_25: 112170,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 192800,
        annual_median: 169960,
        hourly_10: 41.31,
        hourly_25: 53.93,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 92.69,
        hourly_median: 81.71,
        jobs_1000: 0.701,
        loc_quotient: 0.91,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '45', title: 'South Carolina' },
        total_employment: 1410
    },
    {
        annual_10: 92200,
        annual_25: 107830,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 179960,
        annual_median: 135290,
        hourly_10: 44.33,
        hourly_25: 51.84,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 86.52,
        hourly_median: 65.04,
        jobs_1000: 0.634,
        loc_quotient: 0.82,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '46', title: 'South Dakota' },
        total_employment: 270
    },
    {
        annual_10: 99170,
        annual_25: 128600,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 184760,
        annual_median: 174920,
        hourly_10: 47.68,
        hourly_25: 61.83,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 88.83,
        hourly_median: 84.09,
        jobs_1000: 0.477,
        loc_quotient: 0.62,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '47', title: 'Tennessee' },
        total_employment: 1390
    },
    {
        annual_10: 64990,
        annual_25: 94780,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 172890,
        annual_median: 150820,
        hourly_10: 31.25,
        hourly_25: 45.57,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 83.12,
        hourly_median: 72.51,
        jobs_1000: 0.702,
        loc_quotient: 0.91,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '48', title: 'Texas' },
        total_employment: 8350
    },
    {
        annual_10: 19230,
        annual_25: 74750,
        annual_75: 147360,
        annual_90: 208000,
        annual_mean: 128770,
        annual_median: 106970,
        hourly_10: 9.24,
        hourly_25: 35.94,
        hourly_75: 70.84,
        hourly_90: 100.0,
        hourly_mean: 61.91,
        hourly_median: 51.43,
        jobs_1000: 0.891,
        loc_quotient: 1.15,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '49', title: 'Utah' },
        total_employment: 1260
    },
    {
        annual_10: 88110,
        annual_25: 112460,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 174090,
        annual_median: 155520,
        hourly_10: 42.36,
        hourly_25: 54.07,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 83.7,
        hourly_median: 74.77,
        jobs_1000: 0.56,
        loc_quotient: 0.72,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '50', title: 'Vermont' },
        total_employment: 170
    },
    {
        annual_10: 87400,
        annual_25: 118190,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 185890,
        annual_median: 156700,
        hourly_10: 42.02,
        hourly_25: 56.82,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 89.37,
        hourly_median: 75.34,
        jobs_1000: 0.787,
        loc_quotient: 1.02,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '51', title: 'Virginia' },
        total_employment: 2980
    },
    {
        annual_10: 80060,
        annual_25: 136620,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 187110,
        annual_median: 172060,
        hourly_10: 38.49,
        hourly_25: 65.69,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 89.96,
        hourly_median: 82.72,
        jobs_1000: 0.729,
        loc_quotient: 0.94,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '53', title: 'Washington' },
        total_employment: 2320
    },
    {
        annual_10: 54090,
        annual_25: 107240,
        annual_75: 202320,
        annual_90: 208000,
        annual_mean: 160350,
        annual_median: 131460,
        hourly_10: 26.01,
        hourly_25: 51.56,
        hourly_75: 97.27,
        hourly_90: 100.0,
        hourly_mean: 77.09,
        hourly_median: 63.2,
        jobs_1000: 0.717,
        loc_quotient: 0.93,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '54', title: 'West Virginia' },
        total_employment: 490
    },
    {
        annual_10: 117460,
        annual_25: 146080,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 217800,
        annual_median: 200800,
        hourly_10: 56.47,
        hourly_25: 70.23,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 104.71,
        hourly_median: 96.54,
        jobs_1000: 0.72,
        loc_quotient: 0.93,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '55', title: 'Wisconsin' },
        total_employment: 2040
    },
    {
        annual_10: 73170,
        annual_25: 92520,
        annual_75: 182960,
        annual_90: 208000,
        annual_mean: 143210,
        annual_median: 112820,
        hourly_10: 35.18,
        hourly_25: 44.48,
        hourly_75: 87.96,
        hourly_90: 100.0,
        hourly_mean: 68.85,
        hourly_median: 54.24,
        jobs_1000: 0.887,
        loc_quotient: 1.14,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '56', title: 'Wyoming' },
        total_employment: 240
    },
    {
        annual_10: 24520,
        annual_25: 37730,
        annual_75: 85920,
        annual_90: 98810,
        annual_mean: 61910,
        annual_median: 60730,
        hourly_10: 11.79,
        hourly_25: 18.14,
        hourly_75: 41.31,
        hourly_90: 47.5,
        hourly_mean: 29.77,
        hourly_median: 29.2,
        jobs_1000: 0.183,
        loc_quotient: 0.24,
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        state: { id: '72', title: 'Puerto Rico' },
        total_employment: 160
    }
];

const titleAndWageData = {
    annual_10: 69210,
    annual_25: 104800,
    annual_75: 208000,
    annual_90: 208000,
    annual_mean: 174110,
    annual_median: 151440,
    description:
        'Examine, diagnose, and treat diseases, injuries, and malformations of teeth and gums.  May treat diseases of nerve, pulp, and other dental tissues affecting oral hygiene and retention of teeth.  May fit dental appliances or provide preventive care.  Excludes "Prosthodontists" (29-1024), "Orthodontists" (29-1023), "Oral and Maxillofacial Surgeons" (29-1022) and "Dentists, All Other Specialists" (29-1029).   ',
    hourly_10: 33.28,
    hourly_25: 50.38,
    hourly_75: 100.0,
    hourly_90: 100.0,
    hourly_mean: 83.71,
    hourly_median: 72.81,
    id: '29-1021',
    occupation_major: { id: '29-0000', title: 'Healthcare Practitioners and Technical Occupations' },
    title: 'Dentists, General',
    total_employment: 110400
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

const industryData = [
    {
        annual_10: 58960,
        annual_25: 86790,
        annual_75: 155070,
        annual_90: 192940,
        annual_mean: 132640,
        annual_median: 133030,
        hourly_10: 28.35,
        hourly_25: 41.72,
        hourly_75: 74.55,
        hourly_90: 92.76,
        hourly_mean: 63.77,
        hourly_median: 63.96,
        industry_3d: { id: '524000', title: 'Insurance Carriers and Related Activities' },
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        total_employment: 120
    },
    {
        annual_10: 81440,
        annual_25: 98170,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 169000,
        annual_median: 145880,
        hourly_10: 39.15,
        hourly_25: 47.2,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 81.25,
        hourly_median: 70.14,
        industry_3d: { id: '561000', title: 'Administrative and Support Services' },
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        total_employment: 420
    },
    {
        annual_10: 52280,
        annual_25: 63690,
        annual_75: 153830,
        annual_90: 185670,
        annual_mean: 117850,
        annual_median: 119420,
        hourly_10: 25.14,
        hourly_25: 30.62,
        hourly_75: 73.96,
        hourly_90: 89.26,
        hourly_mean: 56.66,
        hourly_median: 57.42,
        industry_3d: { id: '611000', title: 'Educational Services' },
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        total_employment: 410
    },
    {
        annual_10: 69970,
        annual_25: 104810,
        annual_75: 208000,
        annual_90: 208000,
        annual_mean: 175290,
        annual_median: 152550,
        hourly_10: 33.64,
        hourly_25: 50.39,
        hourly_75: 100.0,
        hourly_90: 100.0,
        hourly_mean: 84.28,
        hourly_median: 73.34,
        industry_3d: { id: '621000', title: 'Ambulatory Health Care Services' },
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        total_employment: 105660
    },
    {
        annual_10: 51770,
        annual_25: 63890,
        annual_75: 174120,
        annual_90: 208000,
        annual_mean: 139020,
        annual_median: 134250,
        hourly_10: 24.89,
        hourly_25: 30.72,
        hourly_75: 83.71,
        hourly_90: 100.0,
        hourly_mean: 66.84,
        hourly_median: 64.54,
        industry_3d: { id: '622000', title: 'Hospitals' },
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        total_employment: 1850
    },
    {
        annual_10: 92790,
        annual_25: 113440,
        annual_75: 192120,
        annual_90: 208000,
        annual_mean: 164070,
        annual_median: 142140,
        hourly_10: 44.61,
        hourly_25: 54.54,
        hourly_75: 92.37,
        hourly_90: 100.0,
        hourly_mean: 78.88,
        hourly_median: 68.34,
        industry_3d: { id: '623000', title: 'Nursing and Residential Care Facilities' },
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        total_employment: 70
    },
    {
        annual_10: 95200,
        annual_25: 116220,
        annual_75: 174970,
        annual_90: 207240,
        annual_mean: 149770,
        annual_median: 141960,
        hourly_10: 45.77,
        hourly_25: 55.88,
        hourly_75: 84.12,
        hourly_90: 99.64,
        hourly_mean: 72.01,
        hourly_median: 68.25,
        industry_3d: { id: '624000', title: 'Social Assistance' },
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        total_employment: 160
    },
    {
        annual_10: 105050,
        annual_25: 121130,
        annual_75: 181750,
        annual_90: 208000,
        annual_mean: 160480,
        annual_median: 143190,
        hourly_10: 50.51,
        hourly_25: 58.23,
        hourly_75: 87.38,
        hourly_90: 100.0,
        hourly_mean: 77.15,
        hourly_median: 68.84,
        industry_3d: {
            id: '999000',
            title:
                'Federal, State, and Local Government, excluding state and local schools and hospitals and the U.S. Postal Service (OES Designation)'
        },
        occupation_detailed: { id: '29-1021', title: 'Dentists, General' },
        total_employment: 1660
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

const expression = ['match', ['get', 'STATE_ID']];

class DentistsGen extends Component {
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

            const maxValue = 3.0;
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

// <OccupationComponent data={info} className="absolute top right left bottom" />;

export default DentistsGen;
