require("dotenv").config();
const express = require("express");
const multer = require('multer');
// const upload = multer({dest: 'tmp-uploads'});
// const { v4: uuidv4 } = require('uuid')
const upload = require(__dirname + '/modules/upload-images');
const session = require('express-session');
const moment = require('moment-timezone');
const axios = require('axios');

const db = require(__dirname + '/modules/mysql-connect');
const MysqlStore = require('express-mysql-session')(session);
const sessionStore = new MysqlStore({}, db);

const {
    toDateString,
    toDatetimeString,
} = require(__dirname + '/modules/date-tools');



const app = express();

app.set("view engine", "ejs");
// https://stackoverflow.com/questions/21216523/nodejs-express-case-sensitive-urls
// 可區分大小寫的路由
app.set('case sensitive routing', true);

// Top-level middlewares
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'klsdjflkjsfkskjhsdlsdlfhjsdhsdhf',
    store: sessionStore,
    cookie: {
        maxAge: 1200000, // 20 分鐘，單位毫秒
    }
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    // res.locals.bob = '哈囉';
    res.locals.toDateString = toDateString;
    res.locals.toDatetimeString = toDatetimeString;
    next();
});
//

app.get('/try-qs', (req, res) => {
    res.json(req.query);
});

// middleware: 中介軟體 (function)
// const bodyParser = express.urlencoded({extended: false});
app.post('/try-post', (req, res) => {
    res.json(req.body);
});

app.route('/try-post-form')
    .get((req, res) => {
        res.render('try-post-form');
    })
    .post((req, res) => {
        const { email, password } = req.body;
        res.render('try-post-form', { email, password });
    });

app.post('/try-upload', upload.single('avatar'), (req, res) => {
    res.json(req.file);
});
// 路由命名要不一樣
app.post('/try-uploads', upload.array('photos'), (req, res) => {
    res.json(req.files);
});

// 特徵就是 : 放前面
// 路徑的設計， action 配合 id
app.get('/try-params1/:action?/:id?', (req, res) => {
    res.json(req.params);
});
// 路由練習
// app.get('/try-params1/:action/:id', (req, res) => {
//     res.json({ code: 2, params: req.params });
// })
// app.get('/try-params1/:action', (req, res) => {
//     res.json({ code: 3, params: req.params });
// })
// app.get('/try-params1/:action?/:id?', (req, res) => {
//     res.json({ code: 1, params: req.params });
// });
// 不建議使用
// app.get('/try-params1/*/*/*?', (req, res) => {
//     res.json({ code: 4, params: req.params });
// });
//

app.get(/^\/hi\/?/i, (req, res) => {
    res.send({ url: req.url });
});
app.get(['/aaa', '/bbb', '/ccc'], (req, res) => {
    res.send({ url: req.url, code: 'array' });
});

app.get('/try-json', (req, res) => {
    const data = require(__dirname + '/data/data01');
    console.log(data);
    res.locals.rows = data;
    res.render('try-json');
});

app.get('/try-moment', (req, res) => {
    const fm = 'YYYY-MM-DD HH:mm:ss';
    const m1 = moment();
    const m2 = moment('2022-02-28');

    res.json({
        m1: m1.format(fm),
        m1a: m1.tz('Europe/London').format(fm),
        m2: m2.format(fm),
        m2a: m2.tz('Europe/London').format(fm),
    })
});



// routes
const adminsRouter = require(__dirname + '/routes/admins');
// 前綴的路徑
app.use('/admins', adminsRouter);
app.use(adminsRouter);
//

// 設定 session 路由
app.get('/try-session', (req, res) => {
    req.session.my_var = req.session.my_var || 0; // 第一次進來沒有用到 session 就會是 0
    req.session.my_var++; // 刷新一次就加 1
    res.json({
        my_var: req.session.my_var,
        session: req.session,
    });
})
//

app.use('/cart_products', require(__dirname + '/routes/cart_products'));


app.route('/login')
    .get(async(req, res) => {
        res.render('login');
    })
    .post(async(req, res) => {
        res.json(req.body)
    });


app.get("/", (req, res) => {
    res.render("main", { name: "Shinder" });
});

// ------- static folder -----------
app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use("/joi", express.static("node_modules/joi/dist"));

// ------- 404 -----------
app.use((req, res) => {
    res.send(`<h2>找不到頁面 404</h2>
    <img src="/imgs/404.jpeg" alt="" width="300px" />
    `);
});

app.listen(process.env.PORT, () => {
    console.log(`server started: ${process.env.PORT}`);
    console.log({ NODE_ENV: process.env.NODE_ENV });
});
