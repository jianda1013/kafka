const Express = require('express');
var Morgan = require('morgan')
const app = Express();
const { adminRequest, userRequest, channelRequest, topicRequest } = require('./validate');
const twitch = require('./twitch');
const kafka = require('./kafka')
const subscribe = require('./subscribe');

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.use(Morgan(':method :url :status'))

app.post('/start', (req, res) => {
    adminRequest.validateAsync(req.body).then(() => {
        twitch.run().then(msg => {
            res.json({ msg })
        }).catch(err => { res.status(400).send(err) })
    }).catch(err => { res.status(400).send(err) })
})

app.post('/stop', (req, res) => {
    adminRequest.validateAsync(req.body).then(() => {
        twitch.disconnect().then(msg => {
            res.json({ msg })
        }).catch(err => { res.status(400).send(err) })
    }).catch(err => { res.status(400).send(err) })
})

app.get('/channel', async (req, res) => {
    userRequest.validateAsync(req.query).then(() => {
        twitch.listChannel().then(msg => {
            res.json({ msg })
        }).catch(err => { res.status(400).send(err) })
    }).catch(err => { res.status(400).send(err) })
})

app.post('/channel', (req, res) => {
    channelRequest.validateAsync(req.body).then(async () => {
        Promise.all([
            subscribe.newData(req.body.username, req.body.channel),
            twitch.newChannel(req.body.channel)
        ]).then(msg => {
            res.json({ msg: msg[1] })
        }).catch(err => { res.status(400).send(err) })
    }).catch(err => { res.status(400).send(err) })
})

app.get('/topic', (req, res) => {
    userRequest.validateAsync(req.query).then(() => {
        kafka.listTopic().then(msg => {
            res.json({ msg })
        }).catch(err => { res.status(400).send(err) })
    }).catch(err => { res.status(400).send(err) })
})

app.post('/topic', (req, res) => {
    topicRequest.validateAsync(req.body).then(() => {
        kafka.createTopic(req.body.topic).then(msg => {
            res.json({ msg })
        }).catch(err => { res.status(400).send(err) })
    }).catch(err => { res.status(400).send(err) })
})

module.exports = app;