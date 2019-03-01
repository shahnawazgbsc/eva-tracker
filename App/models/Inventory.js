export default Inventory = {
    name : 'Inventory',
    primaryKey: 'id',
    properties: {
        id:{type:'string'},
        status:{type:'int',default:0},
        quantity:{type:'string[]'},
        generalSKUId:{type:'int[]'},
    }
}