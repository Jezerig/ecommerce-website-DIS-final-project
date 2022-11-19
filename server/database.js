const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "DataIntensiveGlobal",
  server: "localhost",
  options: {
    trustServerCertificate: true,
  },
};

async function sqlQuery(query) {
  try {
    await sql.connect(config);
    const result = await sql.query(query);
    sql.close();

    if (result) {
      return result.recordset;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}


//!TODO
// Vois varmaa lisää siihe databaseen tmv sen, että ei voi
// ku yhellä sähköpostilla rekistereöityä ja checkkaa sen, ettei oo tyhjä...?
async function sqlInsert(query) {

  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(query)
    if (result) {
      return result.recordset;
    }

    return null;

  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  sqlQuery, 
  sqlInsert
};