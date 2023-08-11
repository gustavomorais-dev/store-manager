# Talker Manager

Uma API RESTful utilizando arquitetura em camadas de um CRUD de um sistema de gerenciamento de vendas em que será possível criar, visualizar, deletar e atualizar produtos e vendas.

## Começando

Para testar a aplicação localmente, clone o repositório e siga os seguintes passos:

Obs: Garanta que tenha o docker e o docker-compose instalados no seu sistema.

1. **Início rápido com docker no terminal:**

```
$ docker-compose up -d
```

2. **Veja os logs da aplicação no terminal:**

```
$ docker logs -n 10 -f store_manager
```

3. **A partir do seu client de requisições HTTP (como o Thunder Client, extensão do vscode), explore os endpoints possíveis para a aplicação :**

- Retorna todos os produtos cadastrados:
```
GET http://localhost:3001/products/
```

- Retorna um produto com base no id da rota (substitua 'id' por um id numérico):
```
GET http://localhost:3001/products/id
```

- Retorna todas as vendas registradas:
```
GET http://localhost:3001/sales/
```

- Retorna uma venda com base no id da rota (substitua 'id' por um id numérico):
```
GET http://localhost:3001/sales/id
```

- Adiciona um novo produto:
```
POST http://localhost:3001/products/
```

    > O corpo da requisição deve ter a seguinte estrutura:
    {
      "name": "ProdutoX"
    }

- Adiciona uma nova venda:
```
POST http://localhost:3001/sales/
```

    > O corpo da requisição deve ter a seguinte estrutura:
    [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]

- Atualiza um produto de acordo com o id (substitua id por um id numérico):
```
PUT http://localhost:3001/products/id
```

    > O corpo da requisição deve ter a seguinte estrutura:
    {
      "name": "Martelo do Batman"
    }

- Deleta um produto de acordo com o id (substitua 'id' por um id numérico):
```
DELETE http://localhost:3001/products/id
```

- Deleta uma venda de acordo com o id (substitua 'id' por um id numérico):
```
DELETE http://localhost:3001/sales/id
```

- Atualiza a quantidade de um produto em uma venda de acordo com o id da venda e do produto (substitua 'id's por ids numérico):
```
PUT http://localhost:3001/sales/:saleId/products/:productId/quantity
```

    > O corpo da requisição deve ter a seguinte estrutura:
    {
      "quantity": 20
    }
