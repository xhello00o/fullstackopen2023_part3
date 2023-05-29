require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons.js')

app.use(express.json())



morgan.token('data', (req, resp) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :total-time[digits]ms :data '))

app.use(cors())

app.use(express.static('./frontbuild'))
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then((result) => {
        response.json(result)
    })
})

app.get('/api/info', (request, response) => {
    console.log('test')
    Person.find({}).then((result) => {
        const date = new Date()
        console.log(date)
        response.send(
            `<div>
        <p>Phonebook has info for ${result.length} persons</p>
        <p> ${date}</p>
    </div>`
        )
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then((result) => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).end('404: Id cannot be found')
            }
        })
        .catch((error) => {
            console.log(error)
            response.status(404).send({ [error]: 'malformatted id' })
        })
})

app.delete('/api/persons/:id', (req, resp, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then((result) => {
            console.log('reply:', result)
            resp.status(204).end()
        })
        .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, resp, next) => {
    const updatedPerson = req.body
    const person = {
        name: updatedPerson.name,
        number: updatedPerson.number,
    }
    console.log(req.params.id)
    Person.findByIdAndUpdate(req.params.id, person, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((result) => {
            console.log('updated', result)
            if (result === null) {
                const error = new Error('Not Found')
                error.status = 500
                error.statusMessage = 'Not Found'

                next(error)
            }
            resp.json(result)
        })
        .catch((error) => next(error))
})

app.post('/api/persons', (req, resp, next) => {
    const newPerson = req.body
    console.log('person', newPerson)
    const newName = newPerson.name
    console.log('name:', newName)
    const newNumber = newPerson.number
    console.log('name:', newNumber)

    if (newPerson.number.trim() === '' || newPerson.name.trim() === '') {
        resp.status(400).json({ error: 'fields are empty' })
    } else {
        const person = new Person({
            name: newName,
            number: newNumber,
        })

        person
            .save()
            .then((result) => {
                resp.json(result)
            })
            .catch((error) => {
                console.log('error', error)
                next(error)
            })
    }
})

const errorHandler = (error, request, response, next) => {
    console.error('error', error.message)
    console.error('err:', error.name)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    if (error.message === 'Not Found') {
        console.log('my Error Handler')
        response.statusMessage = error.statusMessage
        return response
            .status(error.status)
            .send({ error: { message: error.message } })
    }

    if (error.name === 'ValidationError') {
        response.statusMessage = error.message
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
