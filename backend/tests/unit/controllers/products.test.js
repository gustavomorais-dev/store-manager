const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { 
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
} = require('../mocks/products.mock');

describe('Testes do PRODUCTS MODEL:', function () {
  it('Recupera todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Recupera um produto pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([productFromDB]);

    const input = 1;
    const product = await productsModel.findById(input);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});