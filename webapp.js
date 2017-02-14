const url = 'mongodb://localhost:27017/unload'

import express from 'express'
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
	status: String,
	language: String,
	ext: String
})
const pasteModel = mongoose.model('paste', pasteSchema)

const app = express()
app.use(bodyParser.json())
const root = `${__dirname}/public`
app.use(express.static(root))

app.get('/api/pastes', (req, res) => {
	const filter = {}
	if (req.query.priority) {
		filter.priority = req.query.priority
	}
	if (req.query.status) {
		filter.status = req.query.status
	}

	pasteModel.find(filter, (err, pastes) => {
		if (err) {
			return console.error(err)
		}
		return res.json(pastes)
	})
})

app.get('/api/pastes/:id', (req, res) => {
	const id = req.params.id
	pasteModel.findOne({
		_id: id,
	}, (err, paste) => {
		if (err) {
			return console.error(err)
		}
		return res.json(paste)
	})
})

app.post('/api/pastes', (req, res) => {
	const nel = hljs.highlightAuto(req.body.content).language
	const paste = pasteModel(req.body)
	paste.language = nel

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

app.put('/api/pastes/:id', (req, res) => {
	const id = new mongoose.mongo.ObjectId(req.params.id)
	const paste = req.body
	pasteModel.findOneAndUpdate({
		_id: id,
	}, paste, {
		new: true,
	}, (err, updatedPaste) => {
		if (err) {
			return console.error(err)
		}
		return res.json(updatedPaste)
	})
})

app.listen(3000, () => {
	console.log('App listening on port 3000!')
})
