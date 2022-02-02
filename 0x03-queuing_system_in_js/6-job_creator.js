import { createQueue } from 'kue';

const myKue = createQueue();
const jobData = {
  phoneNumber: '+2519221231',
  message: 'Hello, world'
};

const Job = myKue.createJob('push_notification_code', jobData);
Job.save((error) => {
  if (!error) console.log(`Notification job created: ${Job.id}`);
});

Job.addListener('complete', (result) => {
  console.log('Notification job completed');
});

Job.addListener('failed', (result) => {
  console.log('Notification job failed');
});
