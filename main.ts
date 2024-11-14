import { Client } from "pg";
import { config } from "dotenv";

config();

interface SuburbData {
  scc_code: String[];
  scc_name: String[];
  ste_name: String[];
  scc_type: String;
}

const data: SuburbData[] = require("./data/suburbs.json");

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

    for (const suburb of data) {
      const values = [
        suburb.scc_name[0],
        suburb.scc_code[0],
        suburb.ste_name[0],
      ];
      await client.query(query, values);
      console.log(`Inserted ${suburb.scc_name[0]}`);
    }
  } catch (e: unknown) {
    console.log(e);
  }
}

main().finally(() => client.end());
