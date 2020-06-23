const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mongoose = require("mongoose");

const proMongoClient = require('mongodb').MongoClient;
const prourl = "mongodb+srv://admin:2012woaini@cluster0-oicmi.azure.mongodb.net/users?retryWrites=true&w=majority";

module.exports = function (app) {
    app.post('/api/projectList', (req, res, next) => {//查询工作经历
        proMongoClient.connect(prourl, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            const dbo = db.db("projectexperience");
            let whereStr = { projectType: req.body.projectType };  // 查询条件
            let pageSize = req.body.pageSize;
            let page = req.body.page;
            let total = "";
            if (req.body.projectType == "total") {
                whereStr = {};
            }
            console.log('dd', whereStr, pageSize)
            // dbo.collection("projectlist").find(whereStr).skip(0).limit(pageSize - 0).toArray(function (err, result) { // 返回集合中所有数据
            dbo.collection("projectlist").find(whereStr).toArray(function (err, result) { // 返回集合中所有数据
                if (err) throw err;
                total = result.length
                db.close();
            });
            dbo.collection("projectlist").find(whereStr).skip((page - 1) * (pageSize - 0)).limit(pageSize - 0).toArray(function (err, result) { // 返回集合中所有数据
                if (err) throw err;
                let resData = {
                    code: '0',
                    message: '请求成功',
                    data: result,
                    other: {
                        length: total
                    }
                }
                res.json(resData)
                db.close();
            });
        });
    })
    app.post('/api/projectListEdit', (req, res, next) => {//编辑工作经历
        proMongoClient.connect(prourl, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("projectexperience");
            const whereStr = { "id": req.body.id };  // 查询条件
            const updateStr = { $set: req.body.item };
            dbo.collection("projectlist").updateOne(whereStr, updateStr, function (err, result) {
                if (err) throw err;
                console.log(result);
                const resData = {
                    code: '0',
                    message: '修改成功',
                    data: {}
                }
                res.json(resData)
                db.close();
            });
        });
    })
    app.post('/api/projectListDelete', (req, res, next) => {//删除工作经历
        proMongoClient.connect(prourl, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("projectexperience");
            var whereStr = req.body;  // 查询条件
            dbo.collection("projectlist").deleteOne(whereStr, function (err, obj) {
                if (err) throw err;
                const resItem = {
                    code: '0',
                    message: '删除成功',
                    data: {}
                }
                res.json(resItem)
                console.log("文档删除成功");
                db.close();
            });
        });

    })
    app.post('/api/addProject', urlencodedParser, (req, res, next) => {
        console.log("表单提交的数据", req.body);
        proMongoClient.connect(prourl, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("projectexperience");
            dbo.collection("projectlist").insertOne(req.body, function (err, data) {
                if (err) throw err;
                const result = {
                    code: '0',
                    message: '保存成功。',
                    data: {}
                }
                res.json(result)
                db.close();
            });
        });

    })
}