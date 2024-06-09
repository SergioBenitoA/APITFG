const nm = require('nodemailer')

const enviarMail = async (toemail,subject,text) => {

  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'ismagarmon3@gmail.com',
      pass: 'bdxg zncg upmv urpj'
    }
  }

  const message = {
    from: 'ismagarmon3@gmail.com',
    to: `${toemail}`,
    subject: `${subject}`,
    text: `${text}`
    // Puede ser text o html
  }

  const transport = nm.createTransport(config)

  const info = await transport.sendMail(message)

  if (info.response.includes("OK"))
    return true
  else
    return false
}

module.exports =  { enviarMail }