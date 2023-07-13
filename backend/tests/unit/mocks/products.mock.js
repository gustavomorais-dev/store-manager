const productsFromDB = [{
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

const productsFromModel = [{
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

const productFromDB = [{
  id: 1,
  name: 'Martelo de Thor',
}];

const productFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const productsFromServiceOk = {
  status: 200,
  data: productsFromModel,
};

const productFromServiceOk = {
  status: 200,
  data: productFromModel,
};

const productFromServiceNotFound = {
  status: 200,
  data: { message: 'Product not found' },
};

module.exports = {
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  productsFromServiceOk,
  productFromServiceOk,
  productFromServiceNotFound,
};