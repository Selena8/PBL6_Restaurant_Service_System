const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.post('/saveFile', (req, res) => {
    const dataToSave = req.body.data; 
    const savePath = 'public/data/Objects.txt'; 

    // Sử dụng fs để ghi file
    fs.writeFile(savePath, dataToSave, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('File saved successfully');
        }
    });
});

app.get('/getData', (req, res) => {
    const filePath = 'public/data/Objects.txt';

    // Sử dụng fs để đọc dữ liệu từ tệp tin
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            // Trả về dữ liệu dưới dạng JSON
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
