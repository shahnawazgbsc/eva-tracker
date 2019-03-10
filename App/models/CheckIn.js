export default CheckIn = { 
    name: 'CheckIn',
    primaryKey:'StoreId',
    properties: { 
        StoreId: {type:'string'},
        pjp: {type:'bool'},
        companyId:{type:'string'},
        latitude:{type:'string'},
        longitude:{type:'string'},
        ContactPersonName: {type:'string'},
        ContactNo: {type:'string'},
        StartTime: {type:'string'},
        Status: {type:'string'},
        NextScheduledVisit: {type:'string'},
        stat:{type:'bool'},
        Location: {type:'string',default:''},
        Notes: {type:'string',default:''},
        EndTime: {type:'string',default:''},
        StoreVisitId: {type:'string',default:''},
        checkedIn:{type:'bool'},
        productive:{type:'bool'},
    },
};

