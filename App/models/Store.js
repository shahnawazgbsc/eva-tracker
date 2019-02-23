import moment from 'moment';
export default Store = { 
    name: 'Store',
    primaryKey: 'id',
    properties: { 
        id: {type:'int'}, 
        image: { type: 'data'},
        StartTime: { type: 'date', optional: true, default: moment().format("MM/DD/YYYY HH:mm") },
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
        category: { type: 'int'},
        subsectionId:{ type: 'int' },
        classification: { type: 'int'},
        days:{ type: 'string[]' }
    },
};

