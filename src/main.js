import express from 'express'
import bodyParser from 'body-parser'
import * as storage from './storage'

const PORT = process.env.PORT || 3000
const app = express()

app
    .use(bodyParser.json())

    .get('/:collection', (req, res) => {
        const objects = storage.list(req.params.collection)

        if (objects) {
            res.json(objects)
        } else {
            res
                .status(404)
                .send(`Could not find collection: ${req.params.collection}`)
        }
    })

    .get('/:collection/:id', (req, res) => {
        const { collection, id } = req.params

        const object = storage.find(collection, id)

        if (object) {
            res.json(object)
        } else {
            res
                .status(404)
                .send(`Could not find object with id "${id}" in collection "${collection}".`)
        }
    })

    .post('/:collection', (req, res) => {
        const saved = storage.add(req.params.collection, req.body)
        res.json(saved)
    })
    
    .delete('/:collection/:id', (req, res) => {
        const { collection, id } = req.params
        const wasFound = storage.remove(collection, id)

        if (wasFound) {
            res.send(`Successfully removed ${collection} id: ${id}`)
        } else { 
            res.status(404).send(`Did not find ${collection} id: ${id}`)
        }
    })

    .patch('/:collection/:id', (req, res) => {
        const { collection, id } = req.params
        const body = req.body

        const modName = storage.modify(collection, id, body)
        res.send(`Modified name to ${modName} for id: "${id}" in collection "${collection}".`)
    })

app.listen(PORT, () => {
    console.log(`Listening http:/localhost:${PORT}`)
})