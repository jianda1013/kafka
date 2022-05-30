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
        let channels = await subscribe.getChannel().catch(err => { return Promise.reject(err) })
        for (const item of channels)
            client.getChannels().push(item)
        await kafka.createTopic(channels.map(item => item.substring(1)));
        await self.run().catch(err => { return Promise.reject(err) })
        return `Producer Listening Channels From ${channels}`
    },

    async new_channel(channel_name) {
        if (client.readyState() === "OPEN") {
            await client.join(channel_name)
            return `Join Channel ${channel_name}`;
        }
        else return `Client Not Listening`
    },

    async run() {
        await client.connect().catch(err => { return Promise.reject(err) });
        client.on('message', (channel, tags, message) => {
            kafka.receiveMsg({ channel: channel.substring(1), message: `${tags.username} : ${message}` })
            return true;
        });
    },

    async disconnect() {
        if (client.readyState() === "OPEN") {
            await client.disconnect().catch(err => { return Promise.reject(err) });
            return `Server Closed`
        } else return `Server Is Not Running`
    }
}