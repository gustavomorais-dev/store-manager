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

const updateByIds = async (saleId, productId, newQuantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  const [result] = await connection.execute(query, [newQuantity, saleId, productId]);

  if (result.affectedRows === 0) {
    return null;
  }

  const query2 = 'SELECT date FROM sales WHERE id = ?';
  const [[{ date }]] = await connection.execute(query2, [saleId]);

  return { date, productId: Number(productId), quantity: newQuantity, saleId: Number(saleId) };
};

module.exports = {
  insert,
  deleteById,
  updateByIds,
};