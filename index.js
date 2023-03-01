import { connect } from 'nats';

const SERVER_URL = process.env.SERVER_URL || 'nats.nats';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const nc = await connect({ servers: `${SERVER_URL}:4222` });
console.log(`connected to ${nc.getServer()}`);

const jsm = await nc.jetstreamManager();
const js = nc.jetstream();

console.log('Trying to get a single job');

let info = await jsm.streams.info('IMPORT');
const amount = info.state.messages;
console.log({ info, amount });
if (amount == 0) {
  console.log('Nothing to do');
  process.exit(0);
}
let message = await js.pull('IMPORT', 'KEDA');
console.log('Got a message', { message, data: message.data.toString() });

console.log('Acknowledged');
message.ack();

console.log(`Executing job with ${message.msg[0]}`);
console.time();
await delay(Math.floor(Math.random() * 10) * 1000);
console.log(`Completed`);

console.timeEnd();
process.exit(0);
