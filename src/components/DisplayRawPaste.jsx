import React from 'react'
import $ from 'jquery'
import Link from 'react-router/lib/Link'

import Highlight from 'react-syntax-highlighter'
import BaseComponent from './common/BaseComponent'

class DisplayRawPaste extends BaseComponent {
	constructor() {
		super()
		this._bind('loadData')
		this.state = {
			code: ''
		}
	}

	componentDidMount() {
		this.loadData()
	}

	loadData() {
		$.ajax({
			url: `/api/pastes/${this.props.params.id}`,
			success: function loadDataSuccess(paste) {
				if (paste == null) return this.context.router.push(`/`)
				this.setState({code: paste.content, language: paste.language, ext: paste.ext})
			}.bind(this)
		})
	}

	render() {
		return (
			<div className="raw">
				<pre>
					{this.state.code}
				</pre>
			</div>
		)
	}
}

DisplayRawPaste.contextTypes = {
	router: React.PropTypes.object,
}

export default DisplayRawPaste
