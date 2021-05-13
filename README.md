# paypay

## Development

Fake server
```
npm run mock
```

.env.development.local
```
VUE_APP_API_HOST=http://localhost:3000
```

Serve app
```
npm install
npm run serve
```

## Docker service

Nginx 全導向 index.html

Build
```
# --build-arg MODE=development
docker build -t qpay .
```

Server
```
docker run -p 80:80 paypay
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Coding Style
- `snake_case` for variable, function 
- `PascalCase` for component name
- `kebab-case` for directory name

### Vuelidate
盡量用 `validation()` + options api 的寫法比較沒問題

已知問題:
- composition api 宣告 `password`, `confirm_password` 的 ref，用 `sameAs` 會有 `$errors` 未正確觸發問題
