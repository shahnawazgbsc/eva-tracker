export default StoreVisits = { 
    name: 'StoreVisits',
    properties: { 
        visitDayId: {type:'int'},
        day: {type:'int'},
        storeId: {type:'int'},
        companyId: {type:'int',optional:true}, 
        countryId: {type:'int',optional:true},
        cityId: {type:'int',optional:true},
        branchId: {type:'int',optional:true}, 
        departmentId: {type:'int',optional:true},
        storeId: {type:'int'},
        createdAt: {type:'date'},
        editedAt: {type:'date'},
        editedBy: {type:'int',optional:true},
        deleted: {type:'bool'}
    },
};

