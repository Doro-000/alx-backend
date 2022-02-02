import { createQueue } from 'kue';

function sendNotification (phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

const jobProcessor = createQueue();

jobProcessor.process('push_notification_code', (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message);
});
