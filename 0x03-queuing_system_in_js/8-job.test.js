import createNotificationJobs from './8-job';
import { expect } from 'chai';
import { createQueue } from 'kue';

const myTestKue = createQueue();

describe('Testing Notification job creation', function () {
  before(function () {
    myTestKue.testMode.enter();
  });

  after(function () {
    myTestKue.testMode.exit();
  });

  afterEach(function () {
    myTestKue.testMode.clear();
  });

  it('throws an error if jobs is not an array', function () {
    expect(() => { createNotificationJobs('a', myTestKue); }).to.throw('Jobs is not an array');
  });
  it('creates jobs properly', function () {
    const jobs = [{ phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 5678 to verify your account' },
      { phoneNumber: '4153518782', message: 'This is the code 91011 to verify your account' }];
    createNotificationJobs(jobs, myTestKue);
    expect(myTestKue.testMode.jobs.length).to.be.equal(3);
  });
});
