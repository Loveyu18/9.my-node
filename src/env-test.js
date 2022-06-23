require('dotenv').config(); // 自己裝的套件都不打路徑，js才要

const {DB_HOST, DB_USER, NODE_ENV} = process.env;
const {bob} = process.env;

console.log({DB_HOST, DB_USER, NODE_ENV});
console.log({bob});
console.log(process.env);

