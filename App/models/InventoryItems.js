export default InventoryItems = { 
    name: 'InventoryItems',
    properties: { 
        brandName: {type:'string'},
        name: {type:'string'},
        productType: {type:'string'},
        inventoryItemId: {type:'int'},
        itemCode: {type:'string'},
        unitPrice: {type:'int',optional:true},
        tradeOfferAmount: {type:'int',optional:true},
        unit: {type:'string',optional:true},
        packType:{type:'string',optional:true},
        packSize:{type:'int',optional:true},
        packageType:{type:'string',optional:true},
        measurementUnt:{type:'string',optional:true},
        salesUnit:{type:'string',optional:true},
        tradeUnit:{type:'string',optional:true},
        muInRu:{type:'int',default:0},
        muInPu:{type:'int',default:0},
        muInSu:{type:'int',default:0},
        packageUnit:{type:'string',optional:true},
        regularDiscount:{type:'int',optional:true}
    },
};

