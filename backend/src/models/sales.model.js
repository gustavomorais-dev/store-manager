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

module.exports = {
  findAll,
  findById,
};