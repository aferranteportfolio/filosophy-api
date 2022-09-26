// I want an API that is able to return random quotes.
// Additionally this API will feature basic CRUD on the quote resource.
// It will store the quotes in-memory

// - The http web service will expose the following endpoints:

//     1.- GET /quote that will return a random philosophical quote along with it's author.

//         a.- On success will return http status code 200 and a json body with this structure { "id""<QUOTE ID>", "quote": "<QUOTE>", "author": "<AUTHOR>" }
//     2.- GET /quote/all that will return the list of all the resources
//         a.- On success will return http status code 200 and a json body with this structure { "quotes": [ { "id""<QUOTE ID>", "quote": "<QUOTE>", "author": "<AUTHOR>" } ] }
//     3.- POST /quote, will accept a json body with this structure { "quote": "<QUOTE>", "author": "<AUTHOR>" }, it will generate the id in an incremental way
//         a.- On success will return http status code 200 and a json body with this structure { "id": "<GENERATED_ID>"}
//         b.- If a quote with the same content, ignoring case sensitivity is found, will return 409
//     4.- PUT /quote that will accept a json body with this structure { "id": "<ID>", "quote": "<QUOTE>", "author": "<AUTHOR>" }
//         a.- On success will return http status code 204 and no json body
//         b.- On quote not found will return http status code 404
//     5.- DELETE /quote/:id that will only accept the id as path variable
//         a.- On success will return http status code 200
//         b.- On quote not found will return http status code 404

// - The source code to be visible in github


// 1.- GET /quote that will return a random philosophical quote along with it's author.

// const MongoClient = require('mongodb').MongoClient
// const url = "mongodb://localhost:27017/quotesDatabase"

const express = require('express')
const PORT = 4000
const app = express()
app.listen(
    PORT,
    () => console.log(`its running on http://localhost:${PORT}`)
)
 let dbPath = 'db.json'

//data parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const fs = require('fs')

// static files 

app.use(express.static("public"))
app.use('/program', express.static(__dirname + 'public/program'))
app.use('/views', express.static(__dirname + 'public/views'))


// home view get route
app.get("/home", (req, res) => {
  
    res.sendFile("home.html", {root: "./public/views"})
})

//js program view get route
app.get("/public/program/frontEndProgram.js", (req, res) => {
    res.sendFile("/frontEndProgram.js", {root:"./public/program"})
})


app.post("/postaquote", (req, res) => {
    const bodyData = { 
        name : req.body.name,
        age : req.body.age,
        test : req.body.test}
        
        fs.open(dbPath, 'a', function(err, fd) {

            if(err){
                console.log('Cant open file')
            }else {
                fs.write(fd, JSON.stringify(bodyData), 0, JSON.stringify(bodyData).length, () => {
                    if (err)
                      console.log(err);
                    else {
                      console.log("File written successfully\n");
                    }
                  } )

            }
        })


        

        console.log(typeof bodyData)
// quotesDb.push(req.body)
res.status(201).send('Created User')
})



