const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, salesProductsModel } = require('../../../src/models');
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

  it('Adiciona corretamente uma nova venda na database', async function () {
    const newSaleIdFromModel = 3;
    sinon.stub(salesModel, 'insert').resolves(newSaleIdFromModel);
    sinon.stub(salesProductsModel, 'insert').resolves(newSaleIdFromModel);

    const input = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const responseService = await salesService.createSale(input);

    expect(responseService.status).to.be.equal(HTTP_STATUS.CREATED);
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({
      id: 3,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});