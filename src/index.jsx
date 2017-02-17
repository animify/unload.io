import 'style!./styl/blossom.styl'

import React from 'react'
window.React = React

import ReactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import browserHistory from 'react-router/lib/browserHistory'
import Redirect from 'react-router/lib/Redirect'

import PasteList from './components/PasteList'
import DisplayPaste from './components/DisplayPaste'
import DisplayRawPaste from './components/DisplayRawPaste'
import PageNotFound from './components/PageNotFound'
import {HotKeys} from 'react-hotkeys'

ReactDOM.render(
	<Router history={browserHistory}>
	<Route path="/" component={PasteList} />
	<Route path="/:id" component={PasteList} display={true} addHandlerKey={true}/>
	<Route path="/raw/:id" component={DisplayRawPaste} />
	<Route path="*" component={PageNotFound} />
</Router>, document.getElementById('main'))
