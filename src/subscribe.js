const fs = require('fs');

let self = module.exports = {
    readFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/channel.json`, (err, data) => {
                if (err) reject(err)
                else resolve(JSON.parse(data))
            })
        })
    },

    writeData(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${__dirname}/channel.json`, JSON.stringify(data), (err) => {
                if (err) reject(err)
                else resolve(true)
            })
        })
    },

    async getData() {
        let datas = await self.readFile().catch(err => { return Promise.reject(err) })
        let channels = [];
        for (let item of Object.values(datas))
            channels = [...channels, ...item]
        channels = Array.from(new Set(channels))
        return channels;
    },

    async newData(user, channel) {
        let datas = await self.readFile().catch(err => { return Promise.reject(err) })
        datas[user] = datas[user] ?
            [channel] : datas[user].includes(channel) ?
                datas[user] : [...datas[user], channel]
        await self.writeData(datas).catch(err => { return Promise.reject(err) })
        return `Data Created`;
    }
}