const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesFromDB, saleFromDB, salesFromModel, saleFromModel } = require('../mocks/sales.mock');

describe('Testes do SALES MODEL:', function () {
  it('Recupera todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);

    const sales = await salesModel.findAll();
    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(3);
    expect(sales).to.be.deep.equal(salesFromModel);
  });

  it('Recupera uma venda pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);

    const input = 2;
    const sale = await salesModel.findById(input);
    expect(sale).to.be.an('array');
    expect(sale).to.have.lengthOf(1);
    expect(sale).to.be.deep.equal(saleFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});