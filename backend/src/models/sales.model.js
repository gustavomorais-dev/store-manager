const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id AS saleId, 
    s.date, 
    sp.product_id AS productId, 
    sp.quantity
    FROM sales s
    JOIN sales_products sp
    ON s.id = sp.sale_id`,
  );
  return sales;
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, 
    sp.product_id AS productId, 
    sp.quantity
    FROM sales s
    JOIN sales_products sp
    ON s.id = sp.sale_id
    WHERE s.id = ?`,
    [id],
  );
  return sale;
};

const insert = async () => {
  const query = 'INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP)';
  const [result] = await connection.execute(query);
  const newSaleId = result.insertId;
  return newSaleId;
};

const deleteById = async (saleId) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const [result] = await connection.execute(query, [saleId]);

  if (result.affectedRows === 0) {
    return null;
  }

  return { saleId };
};

module.exports = {
  findAll,
  findById,
  insert,
  deleteById,
};