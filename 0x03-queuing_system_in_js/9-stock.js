import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

// ---------------------- products --------------------

const listProducts = [
  { itemId: 1, itemname: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemname: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemname: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemname: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

function getItemById (id) {
  return listProducts.filter(product => product.itemId === parseInt(id)).shift();
}

// ------------------- Redis Operations -------------------
const redisClient = createClient();

function reserveStockById (itemId, stock) {
  redisClient.HINCRBY('item', itemId, stock);
}

async function getCurrentReservedStockById (itemId) {
  const hgetAsync = promisify(redisClient.HGET).bind(redisClient);
  const result = await hgetAsync('item', itemId);
  return result;
}

// --------------------- Express routes ------------------------
const app = express();
app.listen(1245, '127.0.0.1');

app.get('/list_products', (request, response) => {
  response.json(listProducts).end();
});

app.get('/list_products/:itemId', async (request, response) => {
  const id = request.params.itemId;
  const product = getItemById(id);
  if (!product) {
    response.json({ status: 'Product not found' }).end();
  } else {
    let reserved = await getCurrentReservedStockById(id);
    if (reserved === null) reserved = 0;
    product.currentQuantity = product.initialAvailableQuantity - parseInt(reserved);
    response.json(product).end();
  }
});

app.get('/reserve_product/:itemId', (request, response) => {
  const id = request.params.itemId;
  const product = getItemById(id);
  if (!product) {
    response.json({ status: 'Product not found' }).end();
  } else {
    if (!product.initialAvailableQuantity) {
      response.json({ status: 'Not enough stock available', itemId: 1 }).end();
    } else {
      reserveStockById(id, 1);
      response.json({ status: 'Reservation confirmed', itemId: 1 }).end();
    }
  }
});
