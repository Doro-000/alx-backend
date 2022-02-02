import { createClient } from 'redis';

async function getRedisConnection () {
  const myClient = createClient();

  myClient.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
  });
  myClient.on('ready', () => {
    console.log('Redis client connected to the server');
  });
}

getRedisConnection();
