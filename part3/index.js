const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors')

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('data',(req,resp)=>{return JSON.stringify(req.body)})

app.use(morgan(':method :url :status :total-time[digits]ms :data '))

app.use(cors())
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info',(request,response)=>{
    const date = new Date()
    console.log(date)
    response.send (
    `<div>
        <p>Phonebook has info for ${persons.length} persons</p>
        <p> ${date}</p>
    </div>`
    )
})

app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const personres = persons.find(person => person.id === id)

    if (personres){
        response.send(personres)
    }else {
        response.status(404).end(`404: Id cannot be found`)
    }
    
})

app.delete('/api/persons/:id', (req,resp) => {
    const id = Number(req.params.id)
    const personres = persons.find(person => person.id === id)
    persons = persons.filter(person=> person.id !== id)

    if (personres){
        resp.status(204).end(`Id ${id} has been deleted`)
    }else {
        resp.status(404).end(`404: Id cannot be found`)
    }
    
})

app.post('/api/persons',(req,resp)=> {
    const getrandid =()=> {
        const min = 10
        const max = 10000
        return (Math.floor(Math.random() * (max - min)) + min)
    }
    const newId = getrandid()
    const newPerson = req.body
    const newName = newPerson.name
    const repeatname = persons.find(person=> person.name === newName)
    console.log(newPerson)

    if (newPerson.number.trim() ==="" || newPerson.name.trim()===""){
        resp.status(400).json({ error: 'fields are empty' })
    }
    else if (repeatname) {
        resp.status(401).json({error:'name must be unique'})
    }
    else {
        newPerson.id = newId
        persons = persons.concat(newPerson)
        resp.json(newPerson)
    }
    
})
  

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

