const express = require("express");
const ejs = require("ejs")
const bodyParser = require("body-parser")

const app = express();
const port = 3000;


app.set("view engine" , "ejs")
app.use(bodyParser.urlencoded({extended:true}))

class Task{
    constructor(task_item , task_status , task_complete){
        this.Task_item = task_item;
        this.Task_status = task_status;
        this.Task_complete = task_complete;
    }
}

let tasks = [];
const date_time = new Date();

app.get("/" , (req , res) =>{
    const date = ("0" + date_time.getDate()).slice(-2);
    const month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    const year = date_time.getFullYear();
    new_date = year + "-"+ month + "-" + date;
    res.render("index.ejs" , { tasks : tasks , date : new_date } )
})

app.post("/save" , (req , res) => {
    const new_task = new Task (req.body.task , "" , false)
    tasks.push(new_task)
    res.redirect("/" )
})

app.post("/delete" , (req , res )=> {
    const index = req.body.delete_item;
    if (index > -1) { 
        tasks.splice(index, 1);
        res.redirect("/")
      }
})

app.post("/complete" , (req , res) =>{
    const index = req.body.Completed_item;
    if( tasks[index].Task_complete === false){
        tasks[index].Task_complete = true
    }
    else
    {
        tasks[index].Task_complete = false
    }
    tasks[index].Task_status = ""
    res.redirect("/")
})

app.post("/status" , (req , res) => {
    // const index = req.body.new_status;
    // const status = req.body;
    // tasks[index].Task_status = status;
    // res.redirect("/" );

    // console.log(index)
    // console.log(status)
    // console.log(tasks[0].Task_status)
})

app.listen(port , () => {
    console.log(`The App is running on port ${port}`)
})