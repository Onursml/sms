const express = require('express');
const bodyParser = require('body-parser');
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const client = new Client({ authStrategy: new LocalAuth() ,
    puppeteer: {
        args: ['--no-sandbox'],
	}
    
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('authenticated', (session) => {
  // Save session data to reuse later
});


client.initialize();
const msg = (k,m) => {
    client.sendMessage(`${k}@c.us`, `${m}`)
}

app.get('/', (req, res) => {

  res.send('Hello World!');
});

app.get('/send-message', (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    const message = req.query.message;
  
    console.log(phoneNumber, message);
  if(phoneNumber && message){
    msg(phoneNumber,message)
    res.send('Message sent successfully!');
    return
  }else{
    res.send('Phone number and message are required!');
  }
    // Response handling goes here
    
  
  });



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server listening on port 3000!');
});