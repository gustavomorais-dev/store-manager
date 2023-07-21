const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesProductsService } = require('../../../src/services');
const { salesProductsController } = require('../../../src/controllers');
const HTTP_STATUS = require('../../../src/utils/statusHTTP');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes do SALES_PRODUCTS CONTROLLER:', function () {
  it('Atualiza uma venda com sucesso', async function () {
    const saleId = 1;
    const productId = 2;
    const quantity = 5;
    const date = '2023-07-21';

    const req = {
      params: { saleId, productId },
      body: { quantity },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(salesProductsService, 'updateSaleProductQuantity').resolves({
      status: 200,
      data: { saleId, productId, quantity, date },
    });

    await salesProductsController.updateSaleProductQuantity(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.have.been.calledWith({ saleId, productId, quantity, date });
  });

  afterEach(function () {
    sinon.restore();
  });
});