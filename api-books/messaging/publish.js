const amqp = require("amqplib");

let channel;

async function getChannel() {
  if (channel) return channel;

  const connection = await amqp.connect("amqp://rabbitmq");
  channel = await connection.createChannel();
  return channel;
}

async function publish(eventName, payload) {
  const ch = await getChannel();
  const queue = eventName;

  await ch.assertQueue(queue);
  ch.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));

  console.log(`Published ${eventName}:`, payload);
}

module.exports = { publish };