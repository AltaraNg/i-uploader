import mysql from "mysql";

// create MySQL connection pool
const pool = mysql.createPool({
   connectionLimit: 10,
   host: process.env.SQL_HOST,
   user: process.env.SQL_USER,
   password: process.env.SQL_PASSWORD,
   database: process.env.SQL_DATABASE,
});

const queryPromise = (pool, sql) => {
   return new Promise((resolve, reject) => {
      pool.query(sql, (error, results) => {
         if (error) {
            return reject(error);
         }
         return resolve(results);
      });
   });
};

export { queryPromise, pool };
