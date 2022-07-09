# Url Shortener 短網址產生器

這是一個可以將一般長網址縮短為短網址的產生器

## Features
* 使用者可以在表單輸入原始網址後，點擊按鈕取得短網址
* 使用者可以點擊短網址，連向原始網站
* 使用者可以點擊按鈕，複製短網址

## Getting Started

### Prerequisites

* node.js @14.16.0
* express @4.17.1
* express-handlebars @4.0.2
* bootstrap @5.1.3
* MongoDB
* mongoose@5.9.7
* body-parser@1.20.0

### Installing

1. 開啟終端機(Terminal)，clone 此專案至本機電腦

```
git clone https://github.com/youjheng/URL-shortener.git
```

2. cd 到存放專案本機位置並執行：

```
cd URL-shortener
```

3. 安裝 npm 套件：

```
npm install
```

4. 安裝 nodemon 套件

```
npm i nodemon
```

5. 設定環境變數連線 MongoDB

```
MONGODB_URI=Your MongoDB connection string
```

6. 啟動伺服器

```
npm run dev
```

7. 在瀏覽器輸入 http://localhost:3000 ，瀏覽網頁
