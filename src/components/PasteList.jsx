import React from 'react'
import $ from 'jquery'

import BaseComponent from './common/BaseComponent'
import NewPaste from './NewPaste'
import NavBar from './NavBar'
import DisplayPaste from './DisplayPaste'

const apiGetPasteUrl = '/api/pastes'
const apiNewPasteUrl = '/api/pastes'

class PasteList extends BaseComponent {
	constructor() {
		super()
		this._bind('addPaste', 'handleSave', 'duplicate', 'passCode', 'newPaste', 'init')
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
		this.setState({duplicate: false, currentID: nextProps.params.id})
	}

	init() {
		this.setState({duplicate: false, currentID: this.props.location.pathname})
	}

	addPaste(paste) {
		$.ajax({
			url: apiNewPasteUrl,
			contentType: 'application/json',
			type: 'POST',
			data: JSON.stringify(paste),
			success: function addPasteSuccess(data) {
				this.context.router.push(`/${data._id}`)
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
		this.addPaste({content: contentData, status: 'new'})
	}

	newPaste() {
		this.setState({duplicate: false, passContent: null})
		this.context.router.push(`/`)
	}

	duplicate() {
		this.setState({duplicate: true})
		this.context.router.push(`/`)
	}

	passCode(pasteContent) {
		this.setState({passContent: pasteContent})
	}

	render() {
		return (
			<div>
				<NavBar displayType={this.props.route.display ? true : false} duplicate={this.duplicate} newPaste={this.newPaste} handleSave={this.handleSave}/>
				{this.props.route.display ? <DisplayPaste onPass={this.passCode} displayParam={this.state.currentID}/> : <NewPaste pasteContent={this.state.passContent} isDuplicate={this.state.duplicate} addPaste={this.addPaste} />}
			</div>
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
