// import {openDb} from "./configDB.js"
import {createTable, insertPessoa, upDatePessoa, selectPessoas, selectPessoa} from './controler/pessoa.js'
import express from 'express'
const app = express()
const port = 8000
app.use(express.json())//informando ao express que vai receber arquivo json
//criando tabela
createTable()
//chamando módulo configDB
// openDb()

app.get("/",(req, res)=>{ //rota raiz 
    res.send("hello world!")
})


app.get("/pessoas", async function(req, res){  
   let pessoas = await selectPessoas();
   res.json(pessoas);
});


app.get("/pessoa", async function(req, res){  
    let pessoa = await selectPessoa(req.body.id);
    res.json(pessoa);
 });


app.post("/pessoa", (req, res)=>{
    insertPessoa(req.body)
    res.json({
        "statusCode":"200 "
    })
})


app.put("/pessoa",(req, res)=>{
    if(req.body && !req.body.id){
        res.json({
            "statusCode": "400",
            "msg": "você precisa informar um id"
        });   
    }else{
        upDatePessoa(req.body)
        res.json({
            "statusCode":"200"
        })
    }
})



app.listen(port,(req, res)=>{ //ouvindo porta 8000
    console.log(`servidor funcionando na ${port}`)
})