const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const validator = require("validator");
const nodemailer = require("nodemailer");
const app = express();
const port = 8001;


app.use(morgan("dev"));
app.use(bodyParser.json());


app.get("/email/:mail", (req, res, next) => {
  if(!validator.isEmail(req.params.mail)){
    const err= new Error("Invalid email address.");
    err.status = 400;
    return next(err);
  }
  
  //Start Here
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "afbf2086236d33",
        pass: "8c14538beceea7"
    }
  });

  const mailOptions= {
    from: '"Test Server" <test@example.com>',
    to: req.params.mail,
    subject: "Email Test",
    html: 
    `
    <div style="text-align: left; width: 500px; margin: 0 auto">
      <h2 style="text-align: center">A New Order to Crooked Howlet Designs</h2>
      <p>Name: <p>
      <p>Phone: <p>
      <p>Email: <p>
      <p>Details: <p>
      <p>Budget: <p>
      <p>Timeframe: <p>
    </div>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if(err){
        console.log(err);
        return reject();
    }
    console.log("Info: ", info);
    res.json({
      message: "Email successfully sent."
    });
  });

});

//Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error"
    }
  })
})

app.listen(port, () => {
  console.log(`Server Running on port:${port}`);
})