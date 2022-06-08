const contact = `
<article id="contact">
<h2 class="major">Contact</h2>
<form method="post" action="#">
    <div class="fields">
        <div class="field half">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" />
        </div>
        <div class="field half">
            <label for="email">Email</label>
            <input type="text" name="email" id="email" />
        </div>
        <div class="field">
            <label for="message">Message</label>
            <textarea name="message" id="message" rows="4"></textarea>
        </div>
    </div>
    <ul class="actions">
        <li><input type="submit" value="Send Message" class="primary" /></li>
        <li><input type="reset" value="Reset" /></li>
    </ul>
</form>
<ul class="icons">
    <li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
    <li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
    <li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
    <li><a href="#" class="icon brands fa-github"><span class="label">GitHub</span></a></li>
</ul>
</article>`


function getChannelHTML(channels) {
    let body = '', headers = '', all = '';
    for (const channel of channels)
        all += `<a href="#${channel}">${channel}</a>`
    for (const channel of channels) {
        body += `<article id="${channel}">
            <h2 class="major">${channel}</h2>
            <span class="image main"><img src="./static/${channel}_WC.png" width="700"></span>
            <a href="https://www.twitch.tv/${channel}">https://www.twitch.tv/${channel}</a>
            <p>${all}</p>
        </article>`
        headers += `<li><a href="#${channel}">${channel}</a></li>`
    }
    headers += `<li><a href="#contact">contact</a></li>`
    body += contact;
    return { body, headers };
}

function setChannel() {
    getChannelList().then(data => {
        let Channels = getChannelHTML(data)
        console.log(Channels);

        document.getElementById("main").innerHTML = Channels.body;
        document.getElementById("channelHeaders").innerHTML = Channels.headers;
    })
}

function getChannelList() {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:1337/channel';
        $.ajax({
            url,
            type: "GET",
            data: { 'username': 'default' },
            success: (re) => {
                resolve(re.msg);
            },
            err: (er) => {
                console.log(er)
            }
        })
    })
}