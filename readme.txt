


req.query

req.body

req.params

req.file
req.files

req.session
-----------------
res.end()

res.send()

res.json()

res.render()
------------------

開新專案 npx express-generator -e ，可以生成架構
--------------------
RESTful API
# 設計api的路徑
# CRUD

# 列表 (GET)
/products
/products?page=2
/products?page=2&search=找東西

# 單一商品 (GET)
/prosucts/:id

# 新增商品 (POST)
/prosucts

# 修改商品 (PUT)
/prosucts/:id

# 刪除商品 (DELETE)
/prosucts/:id

問題思考：購物車的 API 設計
