
async function start() {
    console.log(`Kafka Server Connecting`);
    await require('./kafka').start().catch(err => { console.log(err); return Promise.reject(err) });
    console.log(`Kafka Connect Successfully`);
    await require('./twitch').start().catch(err => { console.log(err); return Promise.reject(err) });
    console.log(`Twitch API Connect Successfully`)
    require('./route').listen((process.env.port || 1337), () => {
        console.log(`Server Listening At Port ${process.env.port || 1337}`);
    })
}

start();