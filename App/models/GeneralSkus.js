export default GeneralSkus = { 
    name: 'GeneralSkus',
    properties: { 
        generalSKUId: {type:'int'},
        itemName:{type:'string'},
        unit:{type:'string'},
        skuCode:{type:'string'},
        companyId:{type:'int'},
        cityId:{type:'int',optional:true},
        countryId:{type:'int',optional:true},
        branchId:{type:'int',optional:true},
        departmentId:{type:'int',optional:true},
        createdAt:{type:'string'},
        editedAt:{type:'string'},
        editedBy:{type:'string',optional:true},
        deleted:{type:'bool'}
    },
};

