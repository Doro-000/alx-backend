import { createClient, print } from 'redis';
import { promisify } from 'util';

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

const displaySchoolValue = async (schoolName) => {
  const getAsync = promisify(myClient.GET).bind(myClient);
  const getValue = await getAsync(schoolName);
  console.log(getValue);
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
