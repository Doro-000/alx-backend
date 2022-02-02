import { createClient } from 'redis';
import { promisify } from 'util';
import { createQueue } from 'kue';
import express from 'express';

// -------------------------- Redis operations ------------------------
const myClient = createClient();

function reserveSeat (number) {
  myClient.SET('available_seats', number);
}

async function getCurrentAvailableSeats () {
  const getAsync = promisify(myClient.GET).bind(myClient);
  const result = await getAsync('available_seats');
  return result;
}

reserveSeat(50);
let reservationEnabled = true;

// ------------------------- Kue --------------------------
const myQueue = createQueue();

// ------------------------- Express Routes -----------------------
const app = express();
app.listen(1245, '127.0.0.1');

app.get('/available_seats', async (request, response) => {
  const seats = await getCurrentAvailableSeats();
  const res = { numberOfAvailableSeats: seats };
  response.json(res).end();
});

app.get('/reserve_seat', (request, response) => {
  if (!reservationEnabled) {
    response.json({ status: 'Reservation are blocked' }).end();
  } else {
    const seatJob = myQueue.createJob('reserve_seat', {}).on('complete', (result) => {
      console.log(`Seat reservation job ${seatJob.id} completed`);
    }).on('failed', (error) => {
      console.log(`Seat reservation job ${seatJob.id} failed: ${error}`);
    });

    seatJob.save((error) => {
      if (error) {
        response.json({ status: 'Reservation failed' }).end();
      } else {
        response.json({ status: 'Reservation in process' }).end();
      }
    });
  }
});

app.get('/process', (request, response) => {
  myQueue.process('reserve_seat', async (job, done) => {
    const seats = await getCurrentAvailableSeats();
    const newSeats = seats - 1;
    reserveSeat(newSeats);
    if (!newSeats) reservationEnabled = false;
    if (newSeats >= 0) {
      done();
    } else {
      done(new Error('Not enough seats available'));
    }
  });
  response.json({ status: 'Queue processing' }).end();
});
