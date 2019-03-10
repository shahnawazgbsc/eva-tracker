export default NoOrderReason = { 
    name: 'NoOrderReason',
    primaryKey:"StoreId",
    properties: { 
        StoreId: {type:'string'},
        reason:{type:'string'},
        status:{type:'bool'}
    },
};

