const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesFromDB, saleFromDB } = require('../mocks/sales.mock');

describe('Testes do SALES MODEL:', function () {
  it('Recupera todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);

    const products = await salesModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(salesFromDB);
  });

  it('Recupera uma venda pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);

    const input = 1;
    const product = await salesModel.findById(input);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(saleFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});