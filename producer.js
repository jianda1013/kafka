const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'server-app',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

const run = async () => {
    // Producing
    await producer.connect()
    await producer.send({
        topic: 'quickstart',
        messages: [
            { value: 'Hello KafkaJS user!' },
        ],
    })
    await producer.disconnect()
}

console.log('producer');
run().catch(console.error)
