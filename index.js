require('dotenv').config();
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: 'tmp-uploads' });

const app = express();

app.set('view engine', 'ejs');

// Top-level middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// middleware: 中介軟體 (function)
app.post('/try-post', (req, res) => {
    res.json(req.body);
});

app.route('/try-post-form')
    .get((req, res) => {
        res.render('try-post-form');
    })
    .post((req, res) => {
        res.render('try-post-form', { post: req.body });
    });
// app.post('/try-post-form', bodyParser,  (req, res)=>{
//     res.json(req.body);
// });

app.post('/try-upload', upload.single('avatar'), (req, res) => {
    res.json(req.file);
});

app.get('/try-qs', (req, res) => {
    res.json(req.query);
});

// 第一支 ejs 的
app.get('/', (req, res) => {
    res.render("main", { name: "bob" })
});

// ----------- static folder -----------
app.use(express.static("public")); // 只能放靜態檔案
app.use('/bootstrap', express.static("node_modules/bootstrap/dist")); // 找到 bs 的 path

// -----404 要放在所有路由的最後 ------
app.use((req, res) => {
    res.send(`<img src="/imgs/404.jpeg" alt="" width="2000px"/>`);
});

app.listen(process.env.PORT, () => {
    console.log(`server started: ${process.env.PORT}`); // terminal 的訊息
    console.log({ NODE_ENV: process.env.NODE_ENV });
});