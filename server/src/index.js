const express = require('express');
const cors = require('cors');
const multer = require('multer')
const path = require('path');
const app = express();
const {
    expressjwt: expressJWT
} = require('express-jwt');
const {
    secret
} = require('./config');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/')
    },
    filename: function (req, file, cb) {
        let extname = path.extname(file.originalname);
        cb(null, Date.now() + extname)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 25000 * 1024 * 1024
    }
})

app.use(cors());

app.use(expressJWT({
    secret,
    algorithms: ["HS256"]
}).unless({
    path: ['/user/login', '/user/register', '/upload'],
    ext: ['png', 'jpg', 'webp'],
}));

app.use(express.static('./src/uploads'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.json({
            code: -400,
            msg: "Token is invalid or login has expired!",
        });
    }
    next();
})

app.post('/upload', upload.single('file'), function (req, res, next) {
    res.json({
        code: 200,
        message: "Upload successful!",
        data: {
            imgUrl: `/${req.file.filename}`
        }
    });
})

app.use('/', require('./router'));

app.listen(5000, () => {
    console.log('the server is running:localhost:5000');
});