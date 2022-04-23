import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

// __dirname as a global variable is not defined in ES6 module, hence the 
// four lines of code below is to fix that issue
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(5500, () => console.log('Listening for requests on port 5500...'));
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.render('index.html', {root: __dirname});
})

app.post('/contact', async (req, res) => {
    let { name, email, subject, message } = req.body;
    message += + '\n' + email + '\n' + name;

    if(process.env.EMAIL && process.env.PASSWORD){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        });
        transporter.verify()
            .then()
            .catch(err => console.log('There was some error ', err))

        const mailOptions = {
            to: process.env.EMAIL,
            subject: subject,
            text: message
        };
    
        transporter.sendMail(mailOptions)
            .then(info => {
                console.log(info);
                res.json({info});
            })
            .catch(err => console.err(err))
    }
})