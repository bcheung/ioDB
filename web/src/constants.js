export const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

export const modelOptions = [
    { title: 'Industries', tablename: 'industries_3d', route: 'industry' },
    { title: 'States', tablename: 'states', route: 'location' },
    { title: 'Occupations', tablename: 'occupations_major', route: 'occupation' }
];

export const getModelRoutes = {
    occupations_major: 'occupation',
    occupations_detailed: 'occupation',
    industries_3d: 'industry',
    industries_4d: 'industry',
    states: 'location',
    metro_areas: 'location'
};
const joinedTablenames = {
    occupations_major: '_occ_major',
    occupations_detailed: '_occ_detailed',
    industries_3d: 'ind_3d',
    industries_4d: 'ind_4d',
    states: 'state',
    metro_areas: 'metro_area'
};

export function getJoinedTablename(primaryTable, secondaryTable) {
    const joinedPrimary = joinedTablenames[primaryTable];
    const joinedSecondary = joinedTablenames[secondaryTable];
    if (joinedPrimary.substring(0, 1) === '_') {
        return joinedSecondary + joinedPrimary;
    }
    return joinedPrimary + joinedSecondary;
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

export const isMajorModel = {
    occupations_major: true,
    occupations_detailed: false,
    industries_3d: true,
    industries_4d: false,
    states: true,
    metro_areas: false
};

export const getDetailedModel = {
    occupations_major: 'occupations_detailed',
    industries_3d: 'industries_4d',
    states: 'metro_areas'
};

export const getInstanceNames = {
    occupations_major: 'Major Occupations',
    occupations_detailed: 'Specific Occupations',
    industries_3d: 'Major Industries',
    industries_4d: 'Specific Industries',
    states: 'States',
    metro_areas: 'Metropolitan Areas'
};
