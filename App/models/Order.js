export default Order = {
    name : 'Order',
    primaryKey: 'id',
    properties: {
        id: {type:'int'}, 
        itemName:{type:'string'},
        itemCode:{type:'string'},
        quantity:{type:'int'},
        salesUnit:{type:'string'},
        packSize:{type:'int'},
        unit:{type:'int'},
        unitPrice:{type:'int'},
        grossAmount:{type:'int'},
        tradeOfferAmount:{type:'int'},
        regularDiscount:{type:'int'},
        lessRegularDiscount:{type:'int'},
        extraDiscount:{type:'int'},
        extraDiscountAmount:{type:'int'},
        totalOffer:{type:'int'},
        netTotal:{type:'int'},
        measure:{type:'int'},
        status:{type:'int',default:0},
    }
}