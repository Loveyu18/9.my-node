
const express = require('express');
const db = require(__dirname + '/../modules/mysql-connect');
const {
    toDateString,
    toDatetimeString,
} = require(__dirname + '/../modules/date-tools');
const moment = require('moment-timezone');
const Joi = require('joi');
const upload = require(__dirname + '/../modules/upload-images');


const router = express.Router(); // 建立 router 物件

const getListHandler = async (req, res) => {
    let output = {
        perPage: 10,
        page: 1,
        totalRows: 0,
        totalPages: 0,
        code: 0, // 辨識狀態
        error: '',
        query: {},
        rows: []
    };
    let page = +req.query.page || 1; // 用 + 讓用戶輸入換頁指令時，字串變成數字

    let search = req.query.search || '';
    let beginDate = req.query.beginDate || '';
    let endDate = req.query.endDate || '';
    let where = ' WHERE 1 ';
    if (search) {
        where += `AND name LIKE ${db.escape('%' + search + '%')}`; // 用 escape 跳脫
        output.query.search = search;
    }
    if (beginDate) {
        const mo = moment(beginDate);
        if (mo.isValid()) {
            where += `AND birthday >= '${mo.format('YYYY-MM-DD')}'`; // 用 escape 跳脫
            output.query.beginDate = mo.format('YYYY-MM-DD');
        }
    }
    if (endDate) {
        const mo = moment(endDate);
        if (mo.isValid()) {
            where += `AND birthday <= '${mo.format('YYYY-MM-DD')}'`; // 用 escape 跳脫
            output.query.endDate = mo.format('YYYY-MM-DD');
        }
    }


    if (page < 1) {
        output.code = 410;
        output.error = '頁碼太小';
        return output; // 用 return 結束這個 function ，避免因為資料送出而無法更換檔頭
    }


    const sql01 = `SELECT COUNT(1) totalRows FROM cart_products ${where} `; // totalRows 是別名，可自定義
    const [[{ totalRows }]] = await db.query(sql01); // 展開三層，用 totalRows 可以拿到總筆數
    let totalPages = 0;
    if (totalRows) {
        totalPages = Math.ceil(totalRows / output.perPage); // 算總頁數
        if (page > totalPages) {
            output.totalPages = totalPages; // 超過頁碼就轉跳到最後一頁
            output.code = 420;
            output.error = '頁碼太大';
            return output;
        }

        // 有資料才做這個動作，沒資料會出錯，因為超出範圍
        const sql02 = `SELECT * FROM cart_products ${where} ORDER BY sid DESC LIMIT ${(page - 1) * output.perPage}, ${output.perPage}`;
        const [r2] = await db.query(sql02);
        r2.forEach(el => el.birthday = toDateString(el.birthday)); // 處理時間格式 modules/date-tools.js
        output.rows = r2;
    }
    output.code = 200;
    output = { ...output, page, totalRows, totalPages } // 展開，用原本的資料蓋過去保留

    return output;
    // res.render('cart_products/main', output); // 輸出
};

router.use((req, res, next)=>{
        /*
    if(! req.session.admin){
        return res.redirect('/');
    }
    */
    next();
})

router.get('/add', async (req, res) => {
    if(! req.session.admin){
         return res.redirect('/');
    }
   res.render('cart_products/add');
});

router.post('/add', upload.none(), async (req, res) => {
        if(! req.session.admin){
                return res.json({success: false, error: '請先登入'});
            }
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
            .label('姓名必填'),
        age: Joi.string(),
        mobile: Joi.string(),
        birthday: Joi.string(),
        address: Joi.string(),
    });

    console.log(schema.validate(req.body, { abortEarly: false }));

    const sql = "INSERT INTO `cart_products`( `name`, `age`, `mobile`, `birthday`, `address` , `created_at`) VALUES (?,?,?,?,?, NOW())";
    const { name, age, mobile, birthday, address } = req.body;
    const [result] = await db.query(sql, [name, age, mobile, birthday, address]);

    res.json(result);
});

router.get('/', async (req, res) => {
    const output = await getListHandler(req, res);
    switch (output.code) {
        case 410:
            return res.redirect(`?page=1`);
            break;
        case 420:
            return res.redirect(`?page=${output.totalPages}`);
    }
        if(! req.session.admin){
                res.render('cart_products/main-noadmin', output);
            } else {
                res.render('cart_products/main', output);
            }
});
router.get('/api', async (req, res) => {
    const output = await getListHandler(req, res);
    res.json(output);
});
module.exports = router;