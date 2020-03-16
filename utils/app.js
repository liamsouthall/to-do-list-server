const mysql = require("mysql");
const { promisify } = require("util");
const faker = require("faker");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "joinus"
});

const promisifiedQuery = promisify(connection.query).bind(connection);

const getTotal = async () => {
  try {
    let data = await promisifiedQuery("SELECT COUNT(*) AS Total FROM users");
    return data[0].Total;
  } catch (error) {
    console.log(error);
  }
  connection.end();
};

// const bulkAdd = () => {
//   let people = [];
//   for (i = 0; i < 777; i++) {
//     people.push([faker.internet.email(), faker.date.past()]);
//   }
//   return [people];
// };

const addEmail = async email => {
  try {
    const queryString = "INSERT INTO users SET ?";
    let data = await promisifiedQuery(queryString, { email });
    return data;
  } catch (error) {
    console.log(error);
  }
  connection.end();
};

module.exports = {
  getTotal,
  addEmail
};
