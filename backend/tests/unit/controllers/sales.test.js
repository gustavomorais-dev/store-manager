const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const HTTP_STATUS = require('../../../src/utils/statusHTTP');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  salesFromServiceOk,
  salesFromService,
  saleFromServiceOk,
  saleFromService,
} = require('../mocks/sales.mock');

describe('Testes do SALES CONTROLLER:', function () {
  it('Recupera as vendas com sucesso - status 200', async function () {
    sinon.stub(salesService, 'getSales').resolves(salesFromServiceOk);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSales(req, res);
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.have.been.calledWith(salesFromService);
  });

  it('Recupera uma venda pelo ID com sucesso - status 200', async function () {
    sinon.stub(salesService, 'getSaleById').resolves(saleFromServiceOk);

    const req = { params: { id: 2 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.have.been.calledWith(saleFromService);
  });

  afterEach(function () {
    sinon.restore();
  });
});