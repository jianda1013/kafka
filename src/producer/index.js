
require('./twitch').start();


require('./route').listen((process.env.port || 1337), () => {
    console.log(`Server Listening At Port ${process.env.port || 1337}`);
})
