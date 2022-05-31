
async function start() {
    await require('./kafka').start().catch(err => { console.log(err); return Promise.reject(err) });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await require('./twitch').start().catch(err => { console.log(err); return Promise.reject(err) });
    require('./route').listen((process.env.port || 1337), () => {
        console.log(`Server Listening At Port ${process.env.port || 1337}`);
    })
}

start();