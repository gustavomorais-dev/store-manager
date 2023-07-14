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

module.exports = {
  salesFromDB,
  salesFromModel,
  salesFromService,
  saleFromDB,
  saleFromModel,
  saleFromService,
};