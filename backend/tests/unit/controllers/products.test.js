const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { 
  productsFromServiceOk,
  productsFromModel,
  productFromServiceOk,
  productFromModel,
  createdProductFromServiceOk,
  createdProductFromModel,
} = require('../mocks/products.mock');
const HTTP_STATUS = require('../../../src/utils/statusHTTP');

describe('Testes do PRODUCTS CONTROLLER:', function () {
  it('Recupera os produtos com sucesso - status 200', async function () {
    sinon.stub(productsService, 'getProducts').resolves(productsFromServiceOk);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProducts(req, res);
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Recupera um produto pelo ID com sucesso - status 200', async function () {
    sinon.stub(productsService, 'getProductById').resolves(productFromServiceOk);

    const req = { params: { id: 21 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  it('Adiciona corretamente um novo produto a database', async function () {
    sinon.stub(productsService, 'createProduct').resolves(createdProductFromServiceOk);

    const req = { params: { }, body: { name: 'new product' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(HTTP_STATUS.CREATED);
    expect(res.json).to.have.been.calledWith(createdProductFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});