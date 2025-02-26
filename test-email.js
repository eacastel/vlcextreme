require('dotenv').config({ path: '.env.development' });
console.log("ZOHO_USER:", process.env.ZOHO_USER);
console.log("ZOHO_PASS:", process.env.ZOHO_PASS);

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER, // debe estar definido en .env
    pass: process.env.ZOHO_PASS, // debe estar definido en .env
  },
  logger: true,
  debug: true,
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error en verify SMTP:', error);
  } else {
    console.log('Servidor SMTP listo:', success);
    transporter.sendMail({
      from: `"VLCExtreme" <${process.env.ZOHO_USER}>`,
      to: 'emilio@vlcextreme.com', // Cambia por un email de prueba
      subject: 'Prueba de envío',
      text: 'Este es un email de prueba enviado desde Nodemailer y Zoho.',
    }, (err, info) => {
      if (err) {
        console.error('Error al enviar email:', err);
      } else {
        console.log('Email enviado correctamente:', info.messageId);
      }
    });
  }
});
