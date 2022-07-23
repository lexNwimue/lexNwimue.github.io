import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";

// __dirname as a global variable is not defined in ES6 module, hence the
// four lines of code below is to fix that issue
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(process.env.PORT || 8080, () =>
  console.log("Listening for requests on port 5500...")
);
app.use(express.static("views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { root: __dirname });
});

app.post("/contact", async (req, res) => {
  const { name, email, subject } = req.body;
  console.log(name, email, subject);

  // There seems to be an issue with nodemailer making the 'from' (sender's) address
  // my address, making me unable to identify the actual sender.
  // Hence, I am using the message body to get the sender's name and email as shown in the next line
  const message = `From ${name} - ${email}: \n ${req.body.message}`;

  if (process.env.EMAIL && process.env.PASSWORD) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      to: process.env.EMAIL,
      subject: subject,
      text: message,
    };

    transporter
      .sendMail(mailOptions)
      .then((info) => {
        console.log(info);
        res.json({ info });
      })
      .catch((err) => console.log(err));
  }
});
