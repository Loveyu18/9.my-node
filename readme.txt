


req.query

req.body

req.params

req.file
req.files

req.session
-----------------
以下不能同時呼叫

res.end()

res.send()

res.json()

res.render()

res.redirect()
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
規格書內容：url、方法、輸入格式、輸出格式


--------------------
cart table 購物車資料表
--------------------

PK

item_type: product, event, ticket
user_id
item_id:12
quantity

created_at
--------------------
