const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const HTTP_STATUS = require('../../../src/utils/statusHTTP');
const { salesFromService, salesFromModel, saleFromService, saleFromModel } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');

describe('Testes do SALES SERVICE:', function () {
  it('Recupera todas as vendas', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromModel);

    const responseService = await salesService.getSales();

    expect(responseService.status).to.be.equal(HTTP_STATUS.OK);
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(3);
    expect(responseService.data).to.be.deep.equal(salesFromService);
  });

  it('Recupera uma venda pelo ID', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromModel);

    const input = 2;
    const responseService = await salesService.getSaleById(input);

    expect(responseService.status).to.be.equal(HTTP_STATUS.OK);
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(1);
    expect(responseService.data).to.be.deep.equal(saleFromService);
  });

  it('Retorna o que é esperado se passar um id inválido', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const responseData = { message: 'Sale not found' };

    const input = 21;
    const responseService = await salesService.getSaleById(input);

    expect(responseService.status).to.be.equal(HTTP_STATUS.NOT_FOUND);
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  // it('É possível criar uma nova venda', async function () {
  //   sinon.stub(salesModel, 'findById').resolves([]);

  //   const input = 21;
  //   const responseService = await salesService.getSaleById(input);

  //   expect(responseService.status).to.be.equal(HTTP_STATUS.CREATED);
  //   expect(responseService.data).to.be.an('object');
  //   expect(responseService.data).to.be.deep.equal({ message: 'Sale not found' });

  //   // ...
  //   const next = sinon.stub().returns(); // crie um stub
    
  //   myMiddlewares.validateMiddleware(req, res, next); // passe o `next` para o middleware junto com o `req` e `res`
    
  //   expect(next).to.have.been.calledWith(); // verifica se o `next` foi chamado pelo middleware
  //   // ...
  // });

  afterEach(function () {
    sinon.restore();
  });
});