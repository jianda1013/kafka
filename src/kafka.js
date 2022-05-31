const { Kafka, logLevel } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'twitch-service',
    brokers: ['broker:29092'],
    logLevel: logLevel.NOTHING,
    enforceRequestTimeout: false,
    retry: {
        initialRetryTime: 5000
    }
})

const admin = kafka.admin();
const producer = kafka.producer();

let self = module.exports = {

    start() {
        return Promise.all([
            admin.connect().catch(err => console.log(err)),
            producer.connect().catch(err => console.log(err))
        ]);
    },

    receiveMsg({ channel, message }) {
        producer.send({
            topic: channel,
            messages: [{ value: message }]
        })
    },

    async listTopic() {
        let topics = await admin.listTopics().catch(err => { return Promise.reject(err) })
        return topics
    },

    async notExistingTopics(topic) {
        let existing = await self.listTopic().catch(err => { return Promise.reject(err) })
        topic = typeof (topic) === "object" ?
            topic.filter(item => !existing.includes(item)) : !existing.includes(topic)
                ? [topic] : []
        return topic
    },

    async createTopic(topic) {
        let topics = await self.notExistingTopics(topic).catch(err => { return Promise.reject(err) })
        topics = topics.map(item => { return { topic: item } })
        await admin.createTopics({ topics, waitForLeaders: false }).catch(err => { return Promise.reject(err) })
        return `Topic_created`;
    }
}