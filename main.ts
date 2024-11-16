import { Client } from "pg";
import { config } from "dotenv";

config();

type SuburbData = [string, string, string, number, number];

interface SuburbDataObj {
  [postcode: string]: SuburbData[];
}
const data: SuburbDataObj = require("./data/suburbs.json");

const client = new Client({
  host: process.env.HOST,
  user: process.env.PGUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function main() {
  try {
    await client.connect();
  } catch (error) {
    console.log("Failed to connect to database!");
    return;
  }
  try {
    const query = `INSERT INTO suburbs (name, postcode, state) values ($1, $2, $3);`;

    for (const postcode in data) {
      for (const suburbData of data[postcode]) {
        const values = [suburbData[1], suburbData[0], suburbData[2]];

        await client.query(query, values);
        console.log(`Inserted ${suburbData[1]}`);
      }
    }
  } catch (e: unknown) {
    console.log(e);
  }
}

main().finally(() => client.end());
