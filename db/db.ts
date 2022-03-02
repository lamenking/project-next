import mysql from "serverless-mysql";
import dotenv from "dotenv";
dotenv.config();

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

export default async function exQuery({ qeury, values }: any) {
  try {
    const results = await db.query(qeury, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
