import { createQueue } from 'kue';

const blackList = ['153518780', '4153518781'];
const queue = createQueue();

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});

function sendNotification (phoneNumber, message, job, done) {
  if (blackList.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
    job.progress(0, 100);
    job.progress(50, 100);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
  }
}
