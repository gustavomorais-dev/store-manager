const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesProductsModel } = require('../../../src/models');

describe('Testes do SALES MODEL:', function () {
  it('Adiciona uma nova venda e seus detalhes', async function () {
    const saleData = {
      saleId: 1,
      productId: 1,
      quantity: 3,
    };

    const affectedRows = 1;

    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const rowsAffected = await salesProductsModel.insert(saleData);
    expect(rowsAffected).to.equal(affectedRows);
  });

  it('Deleta corretamente uma venda na database', async function () {
    const saleId = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 2 }]);

    const result = await salesProductsModel.deleteById(saleId);

    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal({ saleId });
  });

  afterEach(function () {
    sinon.restore();
  });
});