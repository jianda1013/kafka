# Kafka

### Makefile

Start
```sh
# build and run the kafka and zookeeper container
# default port 9092
make
# also as 
make start
```

Stop and Remove
```sh
# restart the container
make re
# stop the container
make stop
# stop and clean the container
make clean
```

Logs and Bash
```sh
# watch the logs inside kafka container
make logs
# run the bash command in kafka container
make exec
```

New Topic
```sh
# create new topic, name as input
make topic topic=$(input)
# list the existing topic
make list
# delete the topic
make del topic=$(input)
```

Docker
```sh
# install the docker and docker compose cli
make install_dc install_dcc
```

### Testing Program

```sh
npm i
node producer.js
node consumer.js
```

- producer

```js
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
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
```

- consumer

```js
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'client-app',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'quickstart', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    })
}

console.log('consumer')
run().catch(console.error)
```

### Reference
- [KafaJS Document](https://kafka.js.org/docs/getting-started)
- [kafkajs npm](https://www.npmjs.com/package/kafkajs)
- [kafka-node npm](https://www.npmjs.com/package/kafka-node)

