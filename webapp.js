const url = 'mongodb://localhost:27017/unload'

import path from 'path'
import { Server } from 'http'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import hljs from 'highlight.js'
import shortid from 'shortid'

delete process.env.BROWSER

mongoose.connect(url)
const db = mongoose.connection
db.on('error', (err) => {
	console.error(`Connection error: ${err}`)
	process.exit(1)
})
db.once('open', () => {
	console.log('Connected to MongoDB server.')
})

const pasteSchema = new mongoose.Schema({
	_id: {
		type: String,
		'default': shortid.generate
	},
	content: String,
	language: String,
	ext: String
}, {timestamps: true})
const pasteModel = mongoose.model('paste', pasteSchema)

const app = express()
app.use(bodyParser.json())

const root = `${__dirname}/public`

app.use('/', express.static(root))
app.use('/:id', express.static(root))
app.use('/raw/:id', express.static(root))


app.get('/api/pastes', (req, res) => {
	const filter = {}

	pasteModel.find(filter, (err, pastes) => {
		if (err) {
			return console.error(err)
		}
		return res.json(pastes)
	})
})

app.get('/api/pastes/:id', (req, res) => {
	const id = req.params.id
	const pasteSplit = id.split('.')
	pasteModel.findOne({
		_id: pasteSplit[0],
	}, (err, paste) => {
		if (err) return console.error(err)
		if (paste == null) return res.json(paste)

		if (pasteSplit[1]) {
			(hljs.getLanguage(pasteSplit[1]) !== undefined) ? paste.ext = pasteSplit[1] : paste.ext = paste.ext
		}

		return res.json(paste)
	})
})

app.post('/api/pastes', (req, res) => {
	const nel = hljs.highlightAuto(req.body.content).language
	const paste = pasteModel(req.body)

	if (hljs.getLanguage(nel).aliases)
		paste.ext = hljs.getLanguage(nel).aliases[0]
	else
		paste.ext = nel

	paste.save((err, savedPaste) => {
		if (err) {
			return console.error(err)
		}
		return res.json(savedPaste)
	})
})

process.env.NODE_ENV == 'production' ? app.listen(80) : app.listen(3000)
