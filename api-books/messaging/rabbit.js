const amqp = require("amqplib");

let channel;

async function connect() {
  if (channel) return channel;

  const connection = await amqp.connect("amqp://rabbitmq");
  channel = await connection.createChannel();
  return channel;
}

module.exports = { connect };