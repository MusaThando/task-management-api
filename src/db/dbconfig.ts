
import * as dotenv from 'dotenv'
dotenv.config();

const sqlConfig = {
  user:process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.SERVER,
  port:process.env.PORT,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

export default sqlConfig