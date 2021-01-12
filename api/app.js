const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const formidable = require("formidable");

//Init Body Parser
app.use(bodyParser.json({ limit: "100mb" }));

//Config For Any Request
app.use((req, res, next) => {

    // Website youparse wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    next();
});


//Default Router
app.get('/', (req, res) => {
    res.write('Hello World')
});

//Uplaod File Base64
app.post('/uplaodBase64', (req, res) => {
    let filePath = `/files/${Date.now()}_${req.body.name}`;
    let buffer = Buffer.from(req.body.base64.split(',')[1], "base64");

    fs.writeFileSync(path.join(__dirname, filePath), buffer);

    res.json(filePath);
});

app.post('/uplaodFile', (req, res) => {
    let form = formidable({
        uploadDir: "files"
    });

    //Parse Request Body And Save Files By Random Name In "uploadDir"
    form.parse(req,(error, fields, files) => {
        
        //Rename Files Affter Save (Optional)
        //files.file.path = Old Path If You Want Rename
        let newFilePath = `/files/${Date.now()}_${files.file.name}`;
        fs.renameSync(path.join(__dirname, files.file.path), path.join(__dirname, newFilePath));
        
        //End Response
        res.json(newFilePath);
    });

});


//Send File To Render In Browser
app.use('/files', (req, res) => { res.sendFile(path.join(__dirname, `./files${req.url}`)); });




//Listen  Now
app.listen(4300, () => {
    console.log('Api Started On http://localhost:4300')
});