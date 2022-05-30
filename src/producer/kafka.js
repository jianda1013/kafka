const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'twitch-service',
    brokers: ['broker:29092']
})

const admin = kafka.admin();
const producer = kafka.producer();


admin.connect().catch(err => console.log(err));
producer.connect().catch(err => console.log(err));

let self = module.exports = {
    receiveMsg({ channel, message }) {
        producer.send({
            topic: channel,
            messages: [{ value: message }]
        })
    },

    async checkTopicExist(topic) {
        let existing = await admin.listTopics().catch(err => { return Promise.reject(err) })
        topic = typeof (topic) === "object" ?
            topic.filter(item => !existing.includes(item)) : !existing.includes(topic)
                ? [topic] : []
        return topic
    },

    async createTopic(topic) {
        let topics = await self.checkTopicExist(topic).catch(err => { return Promise.reject(err) })
        topics = topics.map(item => { return { topic: item } })
        await admin.createTopics({ topics, waitForLeaders: false }).catch(err => { return Promise.reject(err) })
        return `Topic_created`;
    }
}