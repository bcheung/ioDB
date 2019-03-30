export const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const joinedTablenames = {
    occupations_major: '_occ_major',
    occupations_detailed: '_occ_detailed',
    industries_3d: 'ind_3d',
    industries_4d: 'ind_4d',
    states: 'state',
    metro_areas: 'metro_area'
};

export function getJoinedTablename(tablename1, tablename2) {
    const tablename = joinedTablenames[tablename1] + joinedTablenames[tablename2];
    return tablename;
}

const joinedTablePrimaryKeys = {
    ind_3d_occ_major: {
        id_1: 'industry_3d_id',
        id_2: 'occupation_major_id'
    },
    ind_4d_occ_major: {
        id_1: 'industry_4d_id',
        id_2: 'occupation_major_id'
    },
    ind_3d_occ_detailed: {
        id_1: 'industry_3d_id',
        id_2: 'occupation_detailed_id'
    },
    ind_4d_occ_detailed: {
        id_1: 'industry_4d_id',
        id_2: 'occupation_detailed_id'
    },
    state_occ_major: {
        id_1: 'state_id',
        id_2: 'occupation_major_id'
    },
    metro_area_occ_major: {
        id_1: 'metro_area_id',
        id_2: 'occupation_major_id'
    },
    state_occ_detailed: {
        id_1: 'state_id',
        id_2: 'occupation_detailed_id'
    },
    metro_area_occ_detailed: {
        id_1: 'metro_area_id',
        id_2: 'occupation_detailed_id'
    }
};

export const stats = [
    { label: 'Hourly Wage Median', value: 'hourly_median' },
    { label: 'Hourly Wage Mean', value: 'hourly_mean' },
    { label: 'Annual Wage Median', value: 'annual_median' },
    { label: 'Annual Wage Mean', value: 'annual_mean' },
    { label: 'Employment', value: 'total_employment' }
];

export const statsWithPop = [
    { label: 'Hourly Wage Median', value: 'hourly_median' },
    { label: 'Hourly Wage Mean', value: 'hourly_mean' },
    { label: 'Annual Wage Median', value: 'annual_median' },
    { label: 'Annual Wage Mean', value: 'annual_mean' },
    { label: 'Employment', value: 'total_employment' },
    { label: 'Population', value: 'total_population' }
];

export const graphType = {
    hourly_median: { label: 'Hourly Wage Median', graph: 'bar' },
    hourly_mean: { label: 'Hourly Wage Mean', graph: 'bar' },
    annual_median: { label: 'Annual Wage Median', graph: 'bar' },
    annual_mean: { label: 'Annual Wage Mean', graph: 'bar' },
    total_employment: { label: 'Employment', graph: 'pie' },
    total_population: { label: 'Population', graph: 'pie' }
};
