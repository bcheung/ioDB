export const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const joinedTablenames = {
    occupations_major: '_occ_major',
    occupations_detailed: '_occ_detailed',
    industries_3d: 'ind_3d',
    industries_4d: 'ind_4d',
    states: 'state',
    metro_areas: 'metro_areas'
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
