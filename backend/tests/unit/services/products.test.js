const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsFromModel, productFromModel, createdProductFromModel } = require('../mocks/products.mock');
const HTTP_STATUS = require('../../../src/utils/statusHTTP');

describe('Testes do PRODUCTS SERVICE:', function () {
  it('Recupera todos os produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromModel);
    const responseData = [{
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    }];

    const responseService = await productsService.getProducts();

    expect(responseService.status).to.be.equal(HTTP_STATUS.OK);
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(3);
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Recupera um produto pelo ID', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);
    const responseData = {
      id: 1,
      name: 'Martelo de Thor',
    };

    const input = 1;
    const responseService = await productsService.getProductById(input);

    expect(responseService.status).to.be.equal(HTTP_STATUS.OK);
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Retorna o que é esperado se passar um id inválido', async function () {
    sinon.stub(productsModel, 'findById').resolves(null);
    const responseData = { message: 'Product not found' };

    const input = 21;
    const responseService = await productsService.getProductById(input);

    expect(responseService.status).to.be.equal(HTTP_STATUS.NOT_FOUND);
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Adiciona corretamente um novo produto na database', async function () {
    sinon.stub(productsModel, 'insert').resolves(createdProductFromModel);

    const input = 'new product';
    const responseService = await productsService.createProduct(input);

    expect(responseService.status).to.be.equal(HTTP_STATUS.CREATED);
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(createdProductFromModel);
  });

  it('Retorna erro ao receber uma requisição sem a chave "name"', async function () {
    const input = null;
    const responseService = await productsService.createProduct(input);
  
    expect(responseService.status).to.be.equal(HTTP_STATUS.BAD_REQUEST);
    expect(responseService.data).to.be.an('object');
    expect(responseService.data.message).to.be.equal('"name" is required');
  });  

  it('Retorna erro ao receber uma requisição com a chave "name" menor que 5 caracteres', async function () {
    const input = '1234';
    const responseService = await productsService.createProduct(input);
  
    expect(responseService.status).to.be.equal(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    expect(responseService.data).to.be.an('object');
    expect(responseService.data.message).to.be.equal('"name" length must be at least 5 characters long');
  });  

  afterEach(function () {
    sinon.restore();
  });
});