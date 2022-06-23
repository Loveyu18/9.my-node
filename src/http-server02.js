const http = require("http"); // 預設的不用加./ (http 是 node 的內建套件)
const fs = require("fs");

const server = http.createServer((req, res) => {
    res.writeHead(
        200, {
            'Content-Type': "text/html; charset=utf8;",
    });

    fs.writeFile(
        __dirname + '/../data/header.txt',
        JSON.stringify(req.headers),
        err => {
            if (err) {
                console.log(err);
                res.end('發生錯誤');
            } else {
                res.end("完成寫檔");
            }
        }
    );
});



server.listen(3000); // 偵聽 3000 port