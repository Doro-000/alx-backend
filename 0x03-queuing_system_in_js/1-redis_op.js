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

function setNewSchool (schoolName, value) {
  myClient.SET(schoolName, value, print);
}

function displaySchoolValue (schoolName) {
  myClient.GET(schoolName, (error, reply) => {
    console.log(reply);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
