from models.occupation import OccupationMajorModel, OccupationDetailedModel, OccupationMajorSchema, OccupationDetailedSchema
from models.industry import Industry3dModel, Industry4dModel, Industry3dSchema, Industry4dSchema
from models.location import StateModel, MetroAreaModel, StateSchema, MetroAreaSchema
from models.industry_occupation import Ind3dOccMajorModel, Ind4dOccMajorModel, Ind3dOccDetailedModel, Ind4dOccDetailedModel, Ind3dOccMajorSchema, Ind4dOccMajorSchema, Ind3dOccDetailedSchema, Ind4dOccDetailedSchema
from models.location_occupation import StateOccMajorModel, MetroAreaOccMajorModel, StateOccDetailedModel, MetroAreaOccDetailedModel, StateOccMajorSchema, MetroAreaOccMajorSchema, StateOccDetailedSchema, MetroAreaOccDetailedSchema

all_model_switcher = {
    'occupations_major': OccupationMajorModel,
    'occupations_detailed': OccupationDetailedModel,
    'industries_3d': Industry3dModel,
    'industries_4d': Industry4dModel,
    'states': StateModel,
    'metro_areas': MetroAreaModel,
    'ind_3d_occ_major': Ind3dOccMajorModel,
    'ind_4d_occ_major': Ind4dOccMajorModel,
    'ind_3d_occ_detailed': Ind3dOccDetailedModel,
    'ind_4d_occ_detailed': Ind4dOccDetailedModel,
    'state_occ_major': StateOccMajorModel,
    'metro_area_occ_major': MetroAreaOccMajorModel,
    'state_occ_detailed': StateOccDetailedModel,
    'metro_area_occ_detailed': MetroAreaOccDetailedModel
}

all_schema_switcher = {
    'occupations_major': OccupationMajorSchema,
    'occupations_detailed': OccupationDetailedSchema,
    'industries_3d': Industry3dSchema,
    'industries_4d': Industry4dSchema,
    'states': StateSchema,
    'metro_areas': MetroAreaSchema,
    'ind_3d_occ_major': Ind3dOccMajorSchema,
    'ind_4d_occ_major': Ind4dOccMajorSchema,
    'ind_3d_occ_detailed': Ind3dOccDetailedSchema,
    'ind_4d_occ_detailed': Ind4dOccDetailedSchema,
    'state_occ_major': StateOccMajorSchema,
    'metro_area_occ_major': MetroAreaOccMajorSchema,
    'state_occ_detailed': StateOccDetailedSchema,
    'metro_area_occ_detailed': MetroAreaOccDetailedSchema
}

model_switcher = {
    'occupations_major': OccupationMajorModel,
    'occupations_detailed': OccupationDetailedModel,
    'industries_3d': Industry3dModel,
    'industries_4d': Industry4dModel,
    'states': StateModel,
    'metro_areas': MetroAreaModel
}

schema_switcher = {
    'occupations_major': OccupationMajorSchema,
    'occupations_detailed': OccupationDetailedSchema,
    'industries_3d': Industry3dSchema,
    'industries_4d': Industry4dSchema,
    'states': StateSchema,
    'metro_areas': MetroAreaSchema
}


joined_model_switcher = {
    'ind_3d_occ_major': Ind3dOccMajorModel,
    'ind_4d_occ_major': Ind4dOccMajorModel,
    'ind_3d_occ_detailed': Ind3dOccDetailedModel,
    'ind_4d_occ_detailed': Ind4dOccDetailedModel,
    'state_occ_major': StateOccMajorModel,
    'metro_area_occ_major': MetroAreaOccMajorModel,
    'state_occ_detailed': StateOccDetailedModel,
    'metro_area_occ_detailed': MetroAreaOccDetailedModel
}

joined_schema_switcher = {
    'ind_3d_occ_major': Ind3dOccMajorSchema,
    'ind_4d_occ_major': Ind4dOccMajorSchema,
    'ind_3d_occ_detailed': Ind3dOccDetailedSchema,
    'ind_4d_occ_detailed': Ind4dOccDetailedSchema,
    'state_occ_major': StateOccMajorSchema,
    'metro_area_occ_major': MetroAreaOccMajorSchema,
    'state_occ_detailed': StateOccDetailedSchema,
    'metro_area_occ_detailed': MetroAreaOccDetailedSchema
}

primary_key_switcher = {
    'occupations_major': 'occupation_major_id',
    'occupations_detailed': 'occupation_detailed_id',
    'industries_3d': 'industry_3d_id',
    'industries_4d': 'industry_4d_id',
    'states': 'state_id',
    'metro_areas': 'metro_area_id'
}

joined_primary_key_switcher = {
    'ind_3d_occ_major': {
        'id_1': 'industry_3d_id',
        'id_2': 'occupation_major_id'
    },
    'ind_4d_occ_major': {
        'id_1': 'industry_4d_id',
        'id_2': 'occupation_major_id'
    },
    'ind_3d_occ_detailed': {
        'id_1': 'industry_3d_id',
        'id_2': 'occupation_detailed_id'
    },
    'ind_4d_occ_detailed': {
        'id_1': 'industry_4d_id',
        'id_2': 'occupation_detailed_id'
    },
    'state_occ_major': {
        'id_1': 'state_id',
        'id_2': 'occupation_major_id'
    },
    'metro_area_occ_major': {
        'id_1': 'metro_area_id',
        'id_2': 'occupation_major_id'
    },
    'state_occ_detailed': {
        'id_1': 'state_id',
        'id_2': 'occupation_detailed_id'
    },
    'metro_area_occ_detailed': {
        'id_1': 'metro_area_id',
        'id_2': 'occupation_detailed_id'
    }
}

column_switcher = {
    'total_employment': 'total_employment',
    'hourly_mean': 'hourly_mean',
    'hourly_10': 'hourly_10',
    'hourly_25': 'hourly_25',
    'hourly_median': 'hourly_median',
    'hourly_75': 'hourly_75',
    'hourly_90': 'hourly_90',
    'annual_mean': 'annual_mean',
    'annual_10': 'annual_10',
    'annual_25': 'annual_25',
    'annual_median': 'annual_median',
    'annual_75': 'annual_75',
    'annual_90': 'annual_90'
}
