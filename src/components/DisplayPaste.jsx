import React from 'react'
import $ from 'jquery'
import Link from 'react-router/lib/Link'

import Highlight from 'react-syntax-highlighter'
import BaseComponent from './common/BaseComponent'
import NavBar from './NavBar'

class DisplayPaste extends BaseComponent {
	constructor() {
		super()
		this._bind('loadData')
		this.state = {
			code: '',
			display: true,
			displayID: ''
		}
	}

	componentDidMount() {
		this.loadData()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.displayParam != this.state.displayID) {
			this.loadData()
		}
	}

	loadData() {
		$.ajax({
			url: `/api/pastes/${this.props.displayParam}`,
			success: function loadDataSuccess(paste) {
				if (paste == null) return this.context.router.push(`/`)
				this.props.onPass(paste.content)
				this.setState({code: paste.content, language: paste.language, ext: paste.ext, displayID: this.props.displayParam})
			}.bind(this)
		})
	}

	render() {
		const lineContainStyle = {
			paddingLeft: '2px',
			paddingRight: '15px',
			textAlign: 'right',
			float: 'left'
		}
		return (
			<div className="code">
				<Highlight lineNumberContainerStyle={lineContainStyle} useInlineStyles={false} language={this.state.ext} showLineNumbers={true}>
					{this.state.code}
				</Highlight>
			</div>
		)
	}
}

DisplayPaste.contextTypes = {
	router: React.PropTypes.object,
	location: React.PropTypes.object
}

DisplayPaste.propTypes = {
	display: React.PropTypes.object,
	onPass: React.PropTypes.func.isRequired,
	displayParam: React.PropTypes.string
}

export default DisplayPaste
