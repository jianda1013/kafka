const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'twitch-service',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

producer.connect().catch(err => console.log(err));

function receiveMsg({ channel, message }) {
    console.log(channel, message)
    producer.send({
        topic: channel,
        messages: [
            { value: message }
        ]
    })
}

module.exports = receiveMsg;