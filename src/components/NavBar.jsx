import React from 'react'
import Link from 'react-router/lib/Link'
import $ from 'jquery'

import BaseComponent from './common/BaseComponent'

class NavBar extends BaseComponent {
	constructor() {
		super()
		this._bind('handleSubmit', 'duplicateEdit', 'newEdit')
	}


	componentDidMount() {
console.log(this.props);
	}

	duplicateEdit() {
		this.props.duplicate()
	}

	newEdit() {
		this.props.newPaste()
	}

	handleSubmit(e) {
		this.props.handleSave()
	}

	render() {
		return (
			<nav className="sidebar">
				<ul>
					<li className="logo"><img src="/images/logo.png"/></li>
					<li className={this.props.displayType ? null : "disabled"}><a onClick={this.newEdit}><i className="ion-plus-round"/></a><span><b>New snippet</b><kbd>ctrl/cmd + q</kbd></span></li>
					<li className={this.props.displayType ? "disabled" : null}><a onClick={this.handleSubmit}><i className="ion-filing"/></a><span><b>Save snippet</b><kbd>ctrl/cmd + s</kbd></span></li>
					<li className={this.props.displayType ? null : "disabled"}><a onClick={this.duplicateEdit}><i className="ion-wand"/></a><span><b>Duplicate & edit</b><kbd>ctrl/cmd + e</kbd></span></li>
					<li className={this.props.displayType ? null : "disabled"}><Link to={this.props.paramID == null ? null : `/raw/${this.props.paramID}`}><i className="ion-document-text"/></Link><span><b>Plain text</b><kbd>ctrl/cmd + shift + r</kbd></span></li>
					<li className="pull-down"><Link to={`/about`}><i className="ion-help-circled"/></Link></li>
				</ul>
			</nav>
		)
	}
}

NavBar.contextTypes = {
	router: React.PropTypes.object,
	location: React.PropTypes.object
}

NavBar.propTypes = {
	handleSave: React.PropTypes.func.isRequired,
	newPaste: React.PropTypes.func.isRequired,
	duplicate: React.PropTypes.func.isRequired,
	displayType: React.PropTypes.bool,
	paramID: React.PropTypes.string
}

export default NavBar
