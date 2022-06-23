require('dotenv').config();
const express = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public")); // 只能放靜態檔案
app.use('/bootstrap', express.static("node_modules/bootstrap/dist")); // 找到 bs 的 path

// 第一支 ejs 的
app.get('/', (req, res) => {
    res.render("main", { name: "bob"})
}); 

// 404 要放在所有路由的最後
app.use((req, res) => {
    res.send(`<img src="/imgs/404.jpeg" alt="" width="2000px"/>`);
}); 

app.listen(process.env.PORT, () => {
    console.log(`server started: ${process.env.PORT}`); // terminal 的訊息
    console.log({ NODE_ENV: process.env.NODE_ENV });
});