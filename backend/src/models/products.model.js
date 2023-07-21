const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products; 
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
};

const insert = async (productName) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [result] = await connection.execute(query, [productName]);
  const newProductId = result.insertId;
  const createdProduct = await findById(newProductId);
  return createdProduct;
};

const updateById = async (productId, newName) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(query, [newName, productId]);

  if (result.affectedRows === 0) {
    return null;
  }

  const updatedProduct = await findById(productId);
  return updatedProduct;
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
};