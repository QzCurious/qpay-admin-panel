# 開發手記

api 已經部署到線上，跟著下面步驟設定就可以接上了

資料操作可以隨便動沒關係，api 的資料是我自己架的

## 設定環境變數

新增一個檔名為 .env.development.local 的檔案在專案根目錄

內容:

```sh
VUE_APP_API_HOST=https://www.customer-di293fj.click
```

## 本地開發

特別注意 node 要用 v16 才能跑 (忘記 v14 能不能)，可以用 nvm 來裝 node v16

### nvm

參考教學: https://www.casper.tw/development/2022/01/10/install-nvm/

大概步驟是

1. 裝好 nvm 之後要
2. 靠 nvm 裝 node v16

   ```sh
   nvm install 16
   ```

3. 告訴你的 cmd 你要用 node v16

   ```sh
   nvm use 16
   ```

### 安裝專案套件、開啟本地開發用 server

先裝好這個專案需要的套件，這個動作只需要執行一次就好

```sh
npm install
```

開啟本地開發用 server

```sh
npm run serve
```

再來 cmd 就會提示你，點網址就可以開啟專案的網頁了

```text
App running at:
- Local:   http://localhost:8080/
- Network: http://192.168.1.104:8080/
```

## 大概介紹一下專案

這是個使用 vue-cli 建置的專案，而目前主流會是 vite 來取代 vue-cli。
這個專案是以 vue3 為前提建置的，所以專案環境主要是 vue3，但特別注意
vue3 支援 vue3 的語法，這個專案大部分是使用 vue2 語法撰寫。

題外話，就我看到的公司都很守舊，所以應該會有機會遇到 vue2 專案，或是慢慢
才要轉 vue3，所以學點 vue2 算是加分。

### 使用的套件

- vue3
- vue-router 必學，讓 url 對應頁面 component 用的
- vuex 狀態管理套件，目前主流應該是 pinia，可先不學但以後會是必要項目
- axios
  - axios-cache-adapter 這是進階議題先別管他
- chart.js 圖表套件
- moment 處理時間相關的套件，也是可以之後再學
- numeral 處理數字格式化、小數點運算的套件 (js 是使用浮點運算會有誤差，靠此套件可以算出正確數值)
- primevue 元件庫，看公司 JD 用啥就去學啥，但就是至少會用一套比較好

### 專案結構

主進入點是 src/main.js，有些可能會想知道或你需要知道的的我有加註解

src/router/index.js 設定了所有 url 對應的 component，大概你把 url 一段段
在這個檔案裡面搜尋就可以找到對應的 component 了

大概拼接方式就是一層層 nested。
url 以 `/en/system-management/role-management` 為例，先用 ctrl-f 找到 "role-management"，
往上面一層就可以找到 "system-management"，然後 "/:locale"。
而我專案規劃的方式大概是將 url 對應上 src/views 內的檔案，所以也是可以直接從 src/views 通靈，
亂改一下找到的 .vue 檔，看看畫面有沒有變化就大概可以確認找到的是對的檔案。

src/components 是放會在多處被重複利用的元件，大部分專案做到一個階段都會獨立個 component 資料夾，這是人之常情。
然後 src/layouts 跟 src/components 其實目的很像，我只是喜歡分開來而已

所有串接 api 相關的我都放在 src/api 資料夾，且以主題分類。 如 src/api/Card.js 就都跟 card 相關的 api。
這邊要提一下串接 api 的程式寫的很假掰，可以不用過多參考，你自己理出個合理(自己看得懂)的架構就好。
我的建議一樣是以主題分類，然後大概是多個 function: `getCardList`, `getCard`, `createCard`，看是要用
資料夾做群組，或是同主題都放在同一個檔案，這兩種我都看過有人用

其他 src/helper, src/constants 你程式碼有看到再看過就好，都是偏好問題
