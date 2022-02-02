export default function createPushNotificationsJobs (jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }
  jobs.forEach((job) => {
    const queued_job = queue.createJob('push_notification_code_3', job);
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
}
