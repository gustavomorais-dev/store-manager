const getErrorMessage = (path) => {
  switch (path) {
    case 'productId':
      return 'O campo productId deve ser um número.';
    case 'quantity':
      return 'O campo quantity deve ser um número.';
    default:
      return 'Erro de validação.';
  }
};

module.exports = {
  getErrorMessage,
};