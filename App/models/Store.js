import Moment from 'moment';
export default Store = { 
    name: 'Store',
    properties: { 
        storeId:{type:'int', optional: true}, 
        companyId:{type:'int', optional: true}, 
        imageHeight: { type: 'int', optional: true},
        imageTimestamp:{type:'string', optional: true},
        imageUrl:{type:'string'},
        imageData:{type:'string', optional: true},
        StartTime: { type: 'date', optional: true, default: Moment().format("MM/DD/YYYY HH:mm") },
        endTime:{type:'date',optional:true},
        shopName:  { type: 'string' },
        shopKeeper: { type: 'string'},
        contactNo: { type: 'string'},
        landline: { type: 'string'},
        address: { type: 'string'},
        street: { type: 'string'},
        city: { type: 'string'},
        landMark: { type: 'string'},
        cnic: { type: 'string', optional: true, default: '' },
        activeStatus: { type: 'bool', default: true },
        category: { type: 'string'},
        subsectionId:{ type: 'int' },
        classification: { type: 'string'},
        days:{ type: 'int[]' },
        status:{type:'int',default:0},  
        dayRegistered:{type:'int',optional:true},
        latitude:{type:'string',optional:true},
        longitude:{type:'string',optional:true},
        deleted:{type:'bool',optional:true},
        pjp:{type:'bool',optional:true,default:false}
    },
};

