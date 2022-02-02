import { createQueue } from 'kue';

const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

const myKue = createQueue();

jobs.forEach((job) => {
  const queued_job = myKue.createJob('push_notification_code_2', job);
  queued_job.save((error) => {
    if (!error) console.log(`Notification job created: ${queued_job.id}`);
  });
  queued_job.on('complete', (result) => {
    console.log(`Notification job ${queued_job.id} completed`);
  }).on('failed', (error) => {
    console.log(`Notification job ${queued_job.id} failed: ${error}`);
  }).on('progress', (progress) => {
    console.log(`Notification job #${queued_job.id} ${progress}% complete`);
  });
});
