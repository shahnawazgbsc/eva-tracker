export default Inventory = {
    name : 'Inventory',
    primaryKey: 'id',
    properties: {
        id:{type:'int'},
        status:{type:'int',default:0},
        brandName:{type:'string'},
        quantity:{type:'int[]'},
        generalSKUId:{type:'int[]'},
    }
}