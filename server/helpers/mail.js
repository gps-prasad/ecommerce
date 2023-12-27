import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Replace with your Gmail email
      pass: process.env.PASSWORD  // Replace with your Gmail password or an app-specific password
    }
  });