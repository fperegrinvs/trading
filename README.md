# Giao diện Ademax

## Cài đặt

```
    npm install
    npm run start
```

### Chạy Code Xem Demo

```
    npm run start
    npm run start:server
```

### Yêu cầu

- [Node.js](https://nodejs.org/) v14+
- Không được trùng port 3000 và 30001

## FrontEnd: Angular

### Cấu hình

Angular sử dụng port 3000. Đổi port bằng cách sau:

- Truy cập vào file **pakage.json**, thay đổi port 3000 ở dòng thứ 6

```
       "start": "ng serve --port 3000",
```

### Chạy môi trường Dev

```
   npm run start
```

### Building for source

Build production

```
   npm run build --prod
```

Build production ra file zip

```
   npm run build dist --prod
```

## Backend: NodeJS

### Cấu hình

Angular sử dụng port 3000. Đổi port bằng cách sau:

- Truy cập vào file **server.js**, thay đổi port 3001 ở dòng thứ 46

```
   const port = normalizePort(process.env.PORT || '3001');
```

### Chạy môi trường Dev

```
   npm run start:server
```

### MongoDB

Chỉ dành cho demo! Lưu trữ data, log cho dễ truy vết bug

- Truy cập vào file **app.js** trong thư mục **backend**, thay đổi connectionString monogoDB ở dòng 8

```
mongoose
  .connect(
    'mongodb+srv://soraadmin:%40Ademax123456@ocr.napks.mongodb.net/test?authSource=admin&replicaSet=atlas-zzc7m7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });
```
