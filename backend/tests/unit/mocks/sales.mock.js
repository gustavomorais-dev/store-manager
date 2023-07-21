const salesFromDB = [
  {
    saleId: 1,
    date: '2023-07-14T00:13:11.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-07-14T00:13:11.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-07-14T00:13:11.000Z',
    productId: 3,
    quantity: 15,
  },
];

const salesFromModel = [...salesFromDB];

const salesFromService = [...salesFromModel];

const saleFromDB = [
  {
    date: '2023-07-14T00:13:11.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleFromModel = [...saleFromDB];

const saleFromService = [...saleFromModel];

const salesFromServiceOk = {
  status: 200,
  data: salesFromService,
};

const saleFromServiceOk = {
  status: 200,
  data: saleFromService,
};

const saleCreatedFromService = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const saleCreatedFromServiceOk = {
  status: 201,
  data: saleCreatedFromService,
};

module.exports = {
  salesFromDB,
  salesFromModel,
  salesFromService,
  saleFromDB,
  saleFromModel,
  saleFromService,
  salesFromServiceOk,
  saleFromServiceOk,
  saleCreatedFromService,
  saleCreatedFromServiceOk,
};