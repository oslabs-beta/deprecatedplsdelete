import query from './dbmodel';
const Pool = require("pg");

const PG_URI = "fill in here";
const example_URI =
  "postgres://vdnvhfkq:sYiMTdCmk1vs2br_eUrrmX1unPvfucdW@batyr.db.elephantsql.com/vdnvhfkq";
const fs = require("fs");
const sqlQuery = fs.readFileSync("server/sqlQuery.sql", "utf8");


//need to connect to PSQL PG_URI | example_URI
const sqlController = {};
/*
const arrayTables = db.query('put in query here')
arraytables = [planest, pilots, films, etc]
-- query each table for columns, column types, primary key, foreign keys
const allTables = [arrayTables[0], arrayTables[1], etc]
for(let i = 0; i < arrayTables.length; i++) {
  const eachTable = await db.query() -- 'SELECT ${arraytables[i]} from ______'
  allTables.push(eachTable) -- [{name: planets},{},{}]
}
next()
 */

//coming from router get request to '/uri'
sqlController.getTableData = async function () {
  try {
    //what type are we getting here?
    const arrayTables = await query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`);
    // const tableData = [];
    // for (let i = 0; i < arrayTables.length; i++) {
    //   //what type are we getting here?
    //   const eachTable = await db.query(`SELECT table_name
    //   FROM information_schema.tables   
    //  WHERE table_schema='public'
    //    AND table_type='BASE TABLE';`);
    //   tableData.push(eachTable);
    // }
    res.locals.arrayTables = arrayTables; // will be an array of table objects
    return next();
  } catch (err) {
    console.log("HIT CATCH ERROR IN sqlC.getTableData: ", err);
    return next({
      log: `sqlController.getTableData: Error: ${err}`,
      message: {
        err: `Error occured in sqlController.getTableData. Check server logs for more details.`,
      },
    });
  }
};

sqlController.visualize = function () {
  try {
  } catch (err) {}
};

module.exports = sqlController;