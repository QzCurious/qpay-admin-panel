# paypay

## Demo

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

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Coding Style
- `snake_case` for variable, function 
- `PascalCase` for component name

### Vuelidate
盡量用 `validation()` + options api 的寫法比較沒問題

已知問題:
- composition api 宣告 `password`, `confirm_password` 的 ref，用 `sameAs` 會有 `$errors` 未正確觸發問題
