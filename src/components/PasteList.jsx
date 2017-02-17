import React from 'react'
import $ from 'jquery'

import BaseComponent from './common/BaseComponent'
import NewPaste from './NewPaste'
import NavBar from './NavBar'
import DisplayPaste from './DisplayPaste'
import {HotKeys} from 'react-hotkeys'

const apiGetPasteUrl = '/api/pastes'
const apiNewPasteUrl = '/api/pastes'

const keyMap = {
	'newPaste': ['command+q', 'ctrl+q'],
	'savePaste': ['command+s', 'ctrl+s'],
	'editPaste': ['command+e', 'ctrl+e'],
	'rawPaste': ['command+shift+r', 'ctrl+shift+r']
}

class PasteList extends BaseComponent {
	constructor() {
		super()
		this._bind('addPaste', 'handleSave', 'duplicate', 'passCode', 'newPaste', 'init', 'viewRaw')

		this.state = {
			passContent: null,
			duplicate: false,
			currentID: null
		}
	}

	componentWillMount() {
		this.init()
	}

	componentWillReceiveProps(nextProps) {
		this.setState({currentID: nextProps.params.id})
	}

	init() {
		this.setState({duplicate: false, currentID: this.props.params.id})
	}

	addPaste(paste) {
		$.ajax({
			url: apiNewPasteUrl,
			contentType: 'application/json',
			type: 'POST',
			data: JSON.stringify(paste),
			success: function addPasteSuccess(data) {
				this.context.router.push(`/${data._id}.${data.ext}`)
			}.bind(this),
			error: function addPasteError(xhr, status, err) {
				console.error(this.props.url, status, err.toString())
			}.bind(this)
		})
	}

	handleSave() {
		if (this.props.route.display) return
		const contentData = document.getElementById('editor').innerText
		if (contentData == null || contentData === undefined || contentData == '') return
		this.addPaste({content: contentData})
	}

	newPaste() {
		this.setState({duplicate: false, passContent: null})
		this.context.router.push(`/`)
	}

	viewRaw() {
		if (this.props.params.id === undefined) return
		this.context.router.push(`/raw/${this.props.params.id}`)
	}

	duplicate() {
		this.setState({duplicate: true})
		this.context.router.push(`/`)
	}

	passCode(pasteContent) {
		this.setState({passContent: pasteContent})
	}

	render() {
		const handlers = {
			'savePaste': (event) => {
				event.preventDefault()
				console.debug('Paste: saving')
				this.handleSave()
			},
			'newPaste': (event) => {
				event.preventDefault()
				console.debug('Paste: new')
				this.newPaste()
			},
			'editPaste': (event) => {
				event.preventDefault()
				console.debug('Paste: edit')
				this.duplicate()
			},
			'rawPaste': (event) => {
				event.preventDefault()
				console.debug('Paste: raw')
				this.viewRaw()
			}
		}

		return (
			<HotKeys keyMap={keyMap} tabIndex="0" handlers={handlers}>
				<NavBar displayType={this.props.route.display ? true : false} duplicate={this.duplicate} newPaste={this.newPaste} handleSave={this.handleSave} paramID={this.state.currentID}/>
				{this.props.route.display ? <DisplayPaste onPass={this.passCode} displayParam={this.state.currentID}/> : <NewPaste pasteContent={this.state.passContent} isDuplicate={this.state.duplicate} addPaste={this.addPaste} />}
			</HotKeys>
		)
	}
}

PasteList.contextTypes = {
	router: React.PropTypes.object,
}

PasteList.propTypes = {
	location: React.PropTypes.object,
	url: React.PropTypes.string
}

export default PasteList
