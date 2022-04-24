
const { Client, LocalAuth } = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');
const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs');
const axios = require('axios')

const port = 3000

app.use(cors()) 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
    }
});
const client1 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-one" })
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true})
    fs.writeFile('qrcode.txt', `${ new Date().toLocaleString() }**********${qr}`, function (err) {
        if (err) return console.log(err);
        console.log('qrcode.txt');
    });
});

client1.on('qr', (qr) => {
    console.log('QR 1 RECEIVED', qr);
    qrcode.generate(qr, {small: true})
    fs.writeFile('qrcode1.txt', `${ new Date().toLocaleString() }**********${qr}`, function (err) {
        if (err) return console.log(err);
        console.log('qrcode.txt');
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
    fs.writeFile('qrcode.txt', `${ new Date().toLocaleString() } - Scan success ********** Scan success`, function (err) {
        if (err) return console.log(err);
        console.log('> qrcode.txt');
    });
});

client1.on('ready', () => {
    console.log('Client is ready!');
    fs.writeFile('qrcode1.txt', `${ new Date().toLocaleString() } - Scan success ********** Scan success`, function (err) {
        if (err) return console.log(err);
        console.log('> qrcode.txt');
    });
});

client.on('message', msg => {
    if (msg.body == 'Hi') {
        msg.reply("*Welcome to CyberGladium!*😄 \n \
_I'm CyberGladium's bot. I will send you the important notifications & Match ID/Password to you instantly🤝_ \n \
\n \
*Save my number in your mobile* \n \
\n \
For support : \n \
✉️ ```support@cybergladium.com``` \n \
📞```8870427857 (Whatsapp)``` ");
    }
});

app.get('/', (req, res) => {
    const body = req.query
    // console.log(`91${body['number']}@c.us`, body['message']);
    client.sendMessage(`91${body['number']}@c.us`, body['message']);
    // res.json({"message":"sent success 🥴"})
})

app.get('/scan', (req, res) => {
    let content = fs.readFileSync(process.cwd() + "/" + "qrcode.txt").toString()
    const details = content.split('**********')
    // res.render('pages/qr', {
    //     date: details[0],
    //     qr: details[1]
    // });
    var page = `
        <html>
            <body>
                ${details[0]}
                <script type="module">
                </script>
                <div id="qrcode"></div>
                <script type="module">
                    import QrCreator from "https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.es6.min.js";
                    let container = document.getElementById("qrcode");
                    QrCreator.render({
                        text: "${details[1]}",
                        radius: 0.5, // 0.0 to 0.5
                        ecLevel: "H", // L, M, Q, H
                        fill: "#536DFE", // foreground color
                        background: null, // color or null for transparent
                        size: 256, // in pixels
                    }, container);
                </script>
            </body>
        </html>
    `
    res.write(page);
    res.end();
})
app.get('/scan1', (req, res) => {
    let content = fs.readFileSync(process.cwd() + "/" + "qrcode1.txt").toString()
    const details = content.split('**********')
    // res.render('pages/qr', {
    //     date: details[0],
    //     qr: details[1]
    // });
    var page = `
        <html>
            <body>
                ${details[0]}
                <script type="module">
                </script>
                <div id="qrcode"></div>
                <script type="module">
                    import QrCreator from "https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.es6.min.js";
                    let container = document.getElementById("qrcode");
                    QrCreator.render({
                        text: "${details[1]}",
                        radius: 0.5, // 0.0 to 0.5
                        ecLevel: "H", // L, M, Q, H
                        fill: "#536DFE", // foreground color
                        background: null, // color or null for transparent
                        size: 256, // in pixels
                    }, container);
                </script>
            </body>
        </html>
    `
    res.write(page);
    res.end();
})

client.on('auth_failure', msg => {
    axios
    .get('http://api.authkey.io/request?authkey=70f5f8a65f665b16&mobile=6383575515%2C9597587544&country_code=91&sid=2004&team=WtsApp+Serv+Down&match=WtsApp+Serv+Down&date=WtsApp+Serv+Down&link=AUTHENTICATION+FAILURE')
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('disconnected', (reason) => {
    axios
    .get('http://api.authkey.io/request?authkey=70f5f8a65f665b16&mobile=6383575515%2C9597587544&country_code=91&sid=2004&team=WtsApp+Serv+Down&match=WtsApp+Serv+Down&date=WtsApp+Serv+Down&link=DISconnected')
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })
    console.log('Client was logged out', reason);
});

client1.on('auth_failure', msg => {
    axios
    .get('http://api.authkey.io/request?authkey=70f5f8a65f665b16&mobile=6383575515%2C9597587544&country_code=91&sid=2004&team=WtsApp+Serv+Down&match=WtsApp+Serv+Down&date=WtsApp+Serv+Down&link=AUTHENTICATION+FAILURE')
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })
    console.error('AUTHENTICATION FAILURE', msg);
});

client1.on('disconnected', (reason) => {
    axios
    .get('http://api.authkey.io/request?authkey=70f5f8a65f665b16&mobile=6383575515%2C9597587544&country_code=91&sid=2004&team=WtsApp+Serv+Down&match=WtsApp+Serv+Down&date=WtsApp+Serv+Down&link=DISconnected')
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })
    console.log('Client was logged out', reason);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

client.initialize();

client1.initialize();