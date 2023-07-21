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

  afterEach(function () {
    sinon.restore();
  });
});