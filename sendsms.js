const express=require('express');
const Vonage = require('@vonage/server-sdk')
require('dotenv').config()
const app=express();
app.listen(3000,()=>console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '2mb'}));

const vonage = new Vonage({
    apiKey: process.env.apiKey,
    apiSecret: process.env.apiSecret
})

// const sid=process.env.ACCOUNT_SID;
// const auth=process.env.AUTH_TOKEN;
// const client=require('twilio')(sid,auth);

app.post('/api',(req,res)=>{

    // Vonage

    const from = "Vonage APIs"
    const to="91"+req.body.n
    // console.log(to)
    const text = "Ride booked from "+req.body.fr+" to "+req.body.to+". Have a safe and happy journey."
    // console.log(text)
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })

    // twilio 

    // const num="+91"+req.body.n;
    // console.log(num);
    // client.messages.create({
    //     from: process.env.FROM,
    //     to: num,
    //     body: "Ride booked from "+req.body.fr+" to "+req.body.to+". Have a safe and happy journey."
    // }).then((message)=>console.log(message.sid));

});


app.post('/api1',(req,res)=>{

    // Vonage

    const from = "Vonage APIs"
    const to="91"+req.body.n
    // console.log(to)
    const text = "Your Request for a leave from "+req.body.fr+" to "+req.body.to+" with the reason stated: '"+req.body.re+"' is recieved. We will reply back in next 24hrs.";
    // console.log(text)
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })

    // twilio 

    // const num="+91"+req.body.n;
    // console.log(num);
    // const msg="Your Request for a leave from "+req.body.fr+" to "+req.body.to+" with the reason stated: '"+req.body.re+"' is recieved. We will reply back in next 24hrs.";
    // client.messages.create({
    //     from: process.env.FROM,
    //     to: num,
    //     body: msg
    // }).then((message)=>console.log(message.sid));
});
