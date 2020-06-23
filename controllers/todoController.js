const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:true});
const workExperienceData = require("../mockData/workExperience.js")
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:2012woaini@cluster0-oicmi.azure.mongodb.net/users?retryWrites=true&w=majority");
const todoSchema = new mongoose.Schema({
    item:String
})
const Todo = mongoose.model('Todo',todoSchema);


const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:2012woaini@cluster0-oicmi.azure.mongodb.net/users?retryWrites=true&w=majority";



// const itemOne = Todo({item:'buy fllows'}).save((err)=>{
//     if(err) throw err;
//     console.log('item saved')
// })

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://admin:2012woaini@cluster0-oicmi.azure.mongodb.net/test?retryWrites=true&w=majority";
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     // const dbo = db.db("runoob");
//     // 插入数据insert start
//     // var myobj =  [
//     //     { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
//     //     { name: 'Google', url: 'https://www.google.com', type: 'en'},
//     //     { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
//     //    ];
//     // dbo.collection("site").insertMany(myobj, function(err, res) {
//     //     if (err) throw err;
//     //     console.log("插入的文档数量为: " + res.insertedCount);
//     //     db.close();
//     // });
//     // 插入数据insert end
//     // 
//     const dbo = db.db("runoob");
//     dbo.collection("site").find({}).toArray((err,res)=>{
//         if(err) throw err;
//         console.log(res);
//         db.close();
//     })
// });

// const mongoose = require('mongoose');
// // 远程数据库
// const uri = "mongodb+srv://admin:2012woaini@cluster0-oicmi.azure.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     dbName: 'todo'
// })
// .then(() => {
//     console.log('连接远程数据库成功')
// })
// .catch(err => console.log(err));


let data = [
    {item:"get mild"},
    {item:"walk dog"},
    {item:"Did you have your supper"},
    {item:"He often has a nap after lunch."}
];
module.exports = function (app){
    app.get('/',(req,res,next)=>{
        Todo.find({},(err,data)=>{
            if(err) throw err;
            res.render('index',{data:data});
        })
        // next;
    })
    app.get('/api/workExperience',(req,res,next)=>{//查询工作经历
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("workexperience");
            dbo.collection("worklist").find({}).toArray(function(err, result) { // 返回集合中所有数据
                if (err) throw err;
                console.log(result);
                const resData = {
                    code:'0',
                    message:'请求成功',
                    data:result
                }
                res.json(resData)
                db.close();
            });
        });
    })
    app.post('/api/workExperienceEdit',(req,res,next)=>{//编辑工作经历
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("workexperience");
            const whereStr = {"id":req.body.id};  // 查询条件
            const updateStr = {$set:req.body.item};
            dbo.collection("worklist").updateOne(whereStr, updateStr, function(err, result) {
                if (err) throw err;
                console.log(result);
                const resData = {
                    code:'0',
                    message:'修改成功',
                    data:{}
                }
                res.json(resData)
                db.close();
            });
        });
    })
    app.post('/api/workExperienceDelete',(req,res,next)=>{//删除工作经历
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("workexperience");
            var whereStr = req.body;  // 查询条件
            dbo.collection("worklist").deleteOne(whereStr, function(err, obj) {
                if (err) throw err;
                const resItem = {
                    code:'0',
                    message:'删除成功',
                    data:{}
                }
                res.json(resItem)
                console.log("文档删除成功");
                db.close();
            });
        });
        
    })
    app.post('/api/addWorkExperience',urlencodedParser,(req,res,next)=>{
        console.log("表单提交的数据",req.body);
        
        // const itemOne = Todo(req.body).save((err,data)=>{
        //     if(err) throw err;
        //     res.json(data);
        //     console.log('保存成功')
        // })
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            let dbo = db.db("workexperience");
            dbo.collection("worklist").insertOne(req.body, function(err, data) {
                if (err) throw err;
                const result = {
                    code:'0',
                    message:'保存成功。',
                    data:{}
                }
                res.json(result)
                db.close();
            });
        });
        
    })
    app.delete('/todo/:item',(req,res,next)=>{
        Todo.find({item:req.params.item.replace(/-/g," ")}).remove((err,data)=>{
            if(err) throw err;
            console.log('删除成功')
            res.json(data)
        })
        // data = data.filter((items)=>{
        //     console.log("要删除的数据",items)
        //     return items.item.replace(/ /g,"-") !== req.params.item;
        // })
        // res.json(data)
    })
}