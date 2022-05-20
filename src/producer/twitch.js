const tmi = require('tmi.js');
const kafka = require('./kafka');
// const knex = require('./knex');

let channels = [];

async function start() {
    // channels = await knex('channel').distinct('channel').catch(err => console.log(err));
    channels = ["zrush", "bbbb87", "godjj"];
    run();
}

async function new_channel(channel_name) {
    channels.push(channel_name);
}

function run() {

    const client = new tmi.Client({
        options: { debug: false },
        channels
    });

    client.connect().catch(console.error);
    client.on('message', (channel, tags, message, self) => {
        kafka({ channel: channel.substring(1), message: `${tags.username} : ${message}` })
        return true;
    });
}

start();



