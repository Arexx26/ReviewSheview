import * as nodemailer from 'nodemailer';

async function generateEtherealCredentials() {
  const testAccount = await nodemailer.createTestAccount();
  console.log('Ethereal Email credentials:');
  console.log(`User: ${testAccount.user}`);
  console.log(`Pass: ${testAccount.pass}`);
}

generateEtherealCredentials();