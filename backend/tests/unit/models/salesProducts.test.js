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

  it('Atualiza corretamente uma venda na database', async function () {
    const saleId = 1;
    const productId = 1;
    const newQuantity = 10;

    sinon.stub(connection, 'execute');

    connection.execute.onCall(0).resolves([{ affectedRows: 1 }]);
    connection.execute.onCall(1).resolves([[{ date: '2023-07-21' }]]);

    const result = await salesProductsModel.updateByIds(saleId, productId, newQuantity);

    expect(result).to.deep.equal({
      date: '2023-07-21',
      productId,
      quantity: newQuantity,
      saleId,
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});