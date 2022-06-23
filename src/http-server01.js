const http = require("http"); // 預設的不用加./

const server =  http.createServer((req, res)=>{
    res.writeHead(200, {
        // 告訴網頁送的內容是什麼類型
        'Content-Type': "text/html", // 改完要關掉重開，server 沒重新啟動就要重新吃原始碼
    });
    res.end(`<h2>Hello</h2>
    <p>${req.url}</p>`); // 讀取網址
});

server.listen(3000); // 偵聽 3000 port