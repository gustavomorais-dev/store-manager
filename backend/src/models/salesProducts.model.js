const connection = require('./connection');

const insert = async (saleData) => {
  const { saleId, productId, quantity } = saleData;
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [result] = await connection.execute(query, [saleId, productId, quantity]);
  return result.affectedRows;
};

module.exports = {
  insert,
};