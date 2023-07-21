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

  it('Adiciona uma nova venda', async function () {
    const newSaleId = 3;
    sinon.stub(connection, 'execute').resolves([{ insertId: newSaleId }]);
    
    const newSaleIdReturned = await salesModel.insert();
    expect(newSaleIdReturned).to.equal(newSaleId);
  });

  it('Deleta corretamente uma venda na database', async function () {
    const saleId = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await salesModel.deleteById(saleId);

    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal({ saleId });
  });

  afterEach(function () {
    sinon.restore();
  });
});