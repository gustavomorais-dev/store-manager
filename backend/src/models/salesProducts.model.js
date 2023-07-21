const connection = require('./connection');

const insert = async (saleData) => {
  const { saleId, productId, quantity } = saleData;
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [result] = await connection.execute(query, [saleId, productId, quantity]);
  return result.affectedRows;
};

const deleteById = async (saleId) => {
  const query = 'DELETE FROM sales_products WHERE sale_id = ?';
  const [result] = await connection.execute(query, [saleId]);

  if (result.affectedRows === 0) {
    return null;
  }

  return { saleId };
};

module.exports = {
  insert,
  deleteById,
};