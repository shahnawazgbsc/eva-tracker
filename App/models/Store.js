import Moment from 'moment';
export default Store = { 
    name: 'Store',
    primaryKey: 'id',
    properties: { 
        id: {type:'string'}, 
        imageHeight: { type: 'int'},
        imageTimestamp:{type:'string'},
        imageUri:{type:'string'},
        imageData:{type:'string'},
        StartTime: { type: 'date', optional: true, default: Moment().format("MM/DD/YYYY HH:mm") },
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
        status:{type:'int',default:0}
    },
};

