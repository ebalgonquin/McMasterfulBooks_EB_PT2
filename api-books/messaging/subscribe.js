const amqp = require("amqplib");

async function subscribe(eventName, handler) {
  const connection = await amqp.connect("amqp://rabbitmq");
  const channel = await connection.createChannel();

  await channel.assertQueue(eventName);

  console.log(`Listening for ${eventName}...`);

  channel.consume(eventName, async (msg) => {
    const data = JSON.parse(msg.content.toString());
    await handler(data);
    channel.ack(msg);
  });
}

module.exports = { subscribe };