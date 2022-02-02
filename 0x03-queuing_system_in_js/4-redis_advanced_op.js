import { createClient, print } from 'redis';

function getRedisConnection () {
  const myClient = createClient();

  myClient.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
  });

  myClient.on('ready', () => {
    console.log('Redis client connected to the server');
  });
  return myClient;
}

const myClient = getRedisConnection();

const hashSet = { Portland: '50', Seattle: '80', 'New York': '20', Bogota: '20', Cali: '40', Paris: '2' };
for (const key in hashSet) {
  myClient.HSET('HolbertonSchools', key, hashSet[key], print);
}

myClient.HGETALL('HolbertonSchools', (error, reply) => {
  console.log(reply);
});
