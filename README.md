# ProductStore eCommerce Platform

> eCommerce product store built with the MERN stack & Redux with typeScript.

![screenshot](https://gitlab.com/abionamike/firegram/-/blob/master/upload/screenshot.png)

## Features

- Create product
- Delete product(Admin Only)
- Update product(Admin Only)
- Login
- Register
- List of User(accessible by admin only)
- List of all Products(accessible by admin only)

## Usage

### ES Modules in Node

### Env Variables

Create a .env file in then root and add the following

```
PORT = 5000
MONGODB_URI = your mongodb uri
JWT_SECRET = a1b2c3d4
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend
cd frontend/
run: npm start

# upon start, the jsx in the tsconfig.json in the frontend may change from 'react' to 'react-jsx', please change it back to react.

# Run backend only
npm run server

#convert typescript files to javascript in the backend
run: npm run build

```

### Sample User Logins

```
mike@gmail.com (Admin)
123456

dan@gmail.com
123456
```

```
Full name: Abiona Michael Abiola
Indeed Email: amabiona21@gmail.com
