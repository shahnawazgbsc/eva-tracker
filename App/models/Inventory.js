export default Inventory = {
    name : 'Inventory',
    primaryKey: 'StoreId',
    properties: {
        StoreId: {type:'string'},
        inventories:{type: 'string'},
        StoreVisitId: {type:'string',default:''},
        status:{type:'bool'}
    }
}