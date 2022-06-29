const db = require(__dirname + '/../modules/mysql-connect');


(async () => {
    const [results, fields] = await db.query("SELECT * FROM cart_products LIMIT 5");

    console.log(results);
    process.exit(); // 結束行程
})();