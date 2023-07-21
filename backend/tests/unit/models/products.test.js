const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { 
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  createdProductFromDB,
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

  it('Adiciona corretamente um produto na database', async function () {
    const stub = sinon.stub(connection, 'execute');
    stub.onFirstCall().resolves([createdProductFromDB]);
    stub.onSecondCall().resolves([[createdProductFromDB]]);

    const input = 'new product';
    const product = await productsModel.insert(input);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(createdProductFromDB);
  });

  it('Atualiza corretamente um produto na database', async function () {
    const updatedProductFromDB = { id: 1, name: 'updated product' };
    const updatedProductName = 'updated product';
  
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ affectedRows: 1 }])
      .onSecondCall()
      .resolves([[updatedProductFromDB]]);
  
    const productId = 1;
  
    const updatedProduct = await productsModel.updateById(productId, updatedProductName);
  
    expect(updatedProduct).to.be.an('object');
    expect(updatedProduct).to.be.deep.equal(updatedProductFromDB);
  });

  it('Deleta corretamente um produto na database', async function () {
    const productId = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productsModel.deleteById(productId);

    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal({ productId });
  });

  afterEach(function () {
    sinon.restore();
  });
});