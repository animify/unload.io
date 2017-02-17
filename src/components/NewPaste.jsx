import React from 'react'
import $ from 'jquery'

import BaseComponent from './common/BaseComponent'

class NewPaste extends BaseComponent {
	constructor() {
		super()
		this._bind('handleSubmit', 'loadDuplicate')
		this.state = {
			code: ''
		}
	}

	componentDidMount() {
		this.loadDuplicate(this.props.isDuplicate)
	}

	loadDuplicate(e) {
		var contentData
		(this.props.isDuplicate ? contentData = this.props.pasteContent : contentData = '')
		this.setState({code: contentData})
		document.getElementById('editor').innerText = contentData
		this.refs.editor.focus()
	}

	handleSubmit(e) {
		e.preventDefault()
		this.props.addPaste({content: this.refs.editor.innerText, status: 'new'})
	}

	onPaste(e) {
		e.preventDefault()
		document.execCommand('insertText', false, e.clipboardData.getData("text"))
	}

	render() {
		const options = { lineNumbers: true }
		return (
			<div className="code">
				<div className="editorLines"/>
				<div id="editor" className="editor" contentEditable="true" ref="editor" onPaste={this.onPaste} spellCheck="false"/>
			</div>
		)
	}
}

NewPaste.propTypes = {
	addPaste: React.PropTypes.func.isRequired,
	pasteContent: React.PropTypes.string,
	isDuplicate: React.PropTypes.bool
}

NewPaste.contextTypes = {
	router: React.PropTypes.object,
}

export default NewPaste
