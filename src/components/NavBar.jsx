import React from 'react'
import Link from 'react-router/lib/Link'
import $ from 'jquery'

import BaseComponent from './common/BaseComponent'

class NavBar extends BaseComponent {
	constructor() {
		super()
		this._bind('handleSubmit', 'duplicateEdit', 'newEdit')
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
					<li><a onClick={this.newEdit}><i className="ion-plus-circled"/></a></li>
					{this.props.displayType ? null : <li><a onClick={this.handleSubmit}><i className="ion-filing"/></a></li>}
					{this.props.displayType ? <li><a onClick={this.duplicateEdit}><i className="ion-document"/></a></li> : null}
					{this.props.displayType ? <li><Link to={`/raw${this.context.location.pathname}`}><i className="ion-qr-scanner"/></Link></li> : null}
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
	displayType: React.PropTypes.bool
}

export default NavBar
