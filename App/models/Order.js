export default Order = {
    name : 'Order',
    primaryKey: 'id',
    properties: { 
        id:{type:'string'},
        StoreId: {type:'string'},
        StoreVisitId: {type:'string',default:''},
        inventoryItemId:{type:'int'},
        quantity:{type:'string'},
        extraDiscount:{type:'string'},
        measure:{type:'int'},
        netTotal:{type:'int'},
        grossAmount:{type:'int'},
        tradeOff:{type:'int'},
        regularDiscountTotal:{type:'int'},
        totalOffer:{type:'int'},
        extraDiscountAmount:{type:'int'},
        status:{type:'bool',default:false}
    }
}