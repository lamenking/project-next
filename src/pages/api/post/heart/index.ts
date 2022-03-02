/*import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

interface mysqlOptionsType {
  host: any;
  port: any;
  database: any;
  user: any;
  password: any;
}*/
import exQuery from "db/db";

export default async (req: any, res: any) => {
  const rows: any = await exQuery("select * from heart where post_id = ?", [
    req.body.postId,
  ]);
  const isHeart = rows.filter((data: any) => {
    return data.nickname === req.body.nickname;
  });
  if (isHeart.length !== 0) {
    res.send({ isHeart: true });
  } else {
    res.send({ isHeart: false });
  }
  /*const mysqlOptions: mysqlOptionsType = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };

  const connection = mysql.createConnection(mysqlOptions);
  connection.connect();
  setInterval(function () {
    connection.query("SELECT 1");
  }, 5000);

  connection.query(
    "select * from heart where post_id = ?",
    [req.body.postId],
    (err: any, rows: any) => {
      if (err) {
        console.log("DB heart 조회 에러");
      } else {
        const isHeart = rows.filter((data: any) => {
          return data.nickname === req.body.nickname;
        });
        if (isHeart.length !== 0) {
          res.send({ isHeart: true });
        } else {
          res.send({ isHeart: false });
        }
      }
    },
  );*/
};
