const tmi = require('tmi.js');
const kafka = require('./kafka');
const subscribe = require('./subscribe');

const client = new tmi.Client({
    options: { debug: false },
    channels: []
});

let self = module.exports = {

    async start() {
        if (client.readyState() === "OPEN")
            return `Client Is Already Running`;
        let channels = await subscribe.getData().catch(err => { return Promise.reject(err) })
        for (const item of channels)
            client.getChannels().push(item)
        await kafka.createTopic(channels);
        await self.run().catch(err => { return Promise.reject(err) })
        return `Producer Listening Channels From ${channels}`
    },

    async run() {
        await client.connect().catch(err => { return Promise.reject(err) });
        client.on('message', (channel, tags, message) => {
            kafka.receiveMsg({ channel: channel.substring(1), message: `${tags.username} : ${message}` })
            return true;
        });
    },

    async newChannel(channel) {
        if (client.readyState() !== "OPEN")
            return `Client Not Listening`
        if (client.getChannels().includes(channel))
            return `Channel Already Listening`
        await kafka.createTopic(channel);
        await client.join(`#${channel}`)
        return `Join Channel ${channel}`;
    },

    async listChannel() {
        if (client.readyState() !== "OPEN")
            return `Client Not Listening`
        return client.getChannels().map(item => item.substring(1))
    },

    async disconnect() {
        if (client.readyState() !== "OPEN")
            return `Server Is Not Running`
        await client.disconnect().catch(err => { return Promise.reject(err) });
        return `Server Closed`
    }
}