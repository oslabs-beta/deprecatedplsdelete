const { query } = require("./dbmodel");
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
sqlController.getTableData = async function (req, res, next) {
  try {
    //what type are we getting here?
    const arrayTables = await query(
      `SELECT ARRAY(SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE')`
    );

//`SELECT array_agg(table_name) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`
    const junk = arrayTables.rows[0].array // string '{this is some bullshit we're going to convert}'
    const junkString = junk.slice(1, junk.length - 1); // cutting off brackets at the end
    const arrayString = junkString.split(',') // string[]
    console.log(`arrayString`, arrayString);
    
    const allTables = {}
    for (let i = 0; i < arrayString.length; i++) {
      const columnQuery = `select table_name, column_name, ordinal_position, column_default, data_type, udt_name from information_schema.columns where table_name = $1`
      const {rows} = await query(columnQuery, [arrayString[i]]) //arrays
      allTables[arrayString[i]] = rows;
    }

    //allTables will be an object, keys are table names & values are full arrays with each column & info as an object
    console.log('ALL TABLES HERE', allTables)
// -- 2. query each table for columns, column types, primary key, foreign keys
// --   each query would return multiple columns, column types, ONE pk, multiple fks
      // to get all column names => SELECT column_name[, data_type] FROM information_schema.columns WHERE table_name = <nameoftablehere>
      // infomation schema. columns column name, data_type


      //CHECK on information_schema:
        // element_types, foreign_data_wrappers, foreign_table_options, foreign_tables, 
      // `SELECT junk1, junk2, junk3, junk4 FROM $1(template literal) `
      //  ($1) === arrayString[i]
      // tableData.push(eachTable);
    // }

    // res.locals.finalData = finalData; // will be an array of table objects
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
