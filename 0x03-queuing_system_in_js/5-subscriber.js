import { createClient } from 'redis';

const myClient = createClient();

myClient.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

myClient.on('ready', () => {
  console.log('Redis client connected to the server');
});

const subscriber = myClient.duplicate();
subscriber.SUBSCRIBE('holberton school channel');

subscriber.on('message', (channel, message) => {
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe('holberton school channel');
    subscriber.quit();
    myClient.quit();
  } else {
    console.log(message);
  }
});
