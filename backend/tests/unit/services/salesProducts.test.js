const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, salesProductsModel, productsModel } = require('../../../src/models');
const HTTP_STATUS = require('../../../src/utils/statusHTTP');
const { salesProductsService } = require('../../../src/services');

describe('Testes do SALES_PRODUCTS SERVICE:', function () {
  it('Atualiza corretamente uma venda na database', async function () {
    const saleId = 2;
    const productId = 3;
    const newQuantity = 5;

    sinon.stub(productsModel, 'findById').resolves({
      id: productId,
      name: 'Product',
    });

    sinon.stub(salesModel, 'findById').resolves({
      date: '2023-07-14T00:13:11.000Z',
      productId: 3,
      quantity: 15,
    });

    sinon.stub(salesProductsModel, 'updateByIds').resolves({
      date: '2023-07-21',
      productId,
      quantity: newQuantity,
      saleId,
    });

    const result = await salesProductsService.updateSaleProductQuantity(saleId, productId, newQuantity);

    expect(result).to.deep.equal({
      status: HTTP_STATUS.OK,
      data: {
        date: '2023-07-21',
        productId,
        quantity: newQuantity,
        saleId,
      },
    });
  });

  it('Retorna erro ao tentar atualizar venda passando um productId inválido', async function () {
    const saleId = 2;
    const productId = 34554;
    const newQuantity = 5;

    sinon.stub(productsModel, 'findById').resolves(undefined);

    const result = await salesProductsService.updateSaleProductQuantity(saleId, productId, newQuantity);

    expect(result).to.deep.equal({
      status: HTTP_STATUS.NOT_FOUND,
      data: {
        message: 'Product not found in sale',
      },
    });
  });

  it('Retorna erro ao tentar atualizar venda passando um saleId inválido', async function () {
    const saleId = 265445;
    const productId = 3;
    const newQuantity = 5;

    sinon.stub(productsModel, 'findById').resolves({
      id: productId,
      name: 'Product',
    });

    sinon.stub(salesModel, 'findById').resolves([]);

    const result = await salesProductsService.updateSaleProductQuantity(saleId, productId, newQuantity);

    expect(result).to.deep.equal({
      status: HTTP_STATUS.NOT_FOUND,
      data: {
        message: 'Sale not found',
      },
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});