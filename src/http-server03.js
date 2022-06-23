const http = require("http"); // 預設的不用加./ (http 是 node 的內建套件)
// const fs = require("fs").promises;
const fs = require("fs/promises");


const server = http.createServer(async (req, res) => {
    res.writeHead(
        200, {
        'Content-Type': "text/html; charset=utf8;",
    });
    try {
        await fs.writeFile(
            __dirname + '/../data/header.txt',
            JSON.stringify(req.headers)
        );
        res.end("完成寫檔");
    } catch (ex) {
        console.log(ex);
        res.end("寫入失敗");
    }
});

server.listen(3000); // 偵聽 3000 port