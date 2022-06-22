const {f,f3}  = require("./func02");
const {f:a,f3:a3}  = require("./func02"); // 解構設定 改變數名稱為a a3

console.log(f(7));
console.log(f3(7));
console.log(f3 === a3);