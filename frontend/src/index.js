import React from 'react'
import { render } from 'react-dom'
import 'assets/styles/main.scss'
import 'assets/styles/normalize.css'
import App from 'containers/App'
import { AppContainer } from 'react-hot-loader'


const renderApp = Component => {
	render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.querySelector('#mount_place')
	)
}

renderApp(App)

if(module.hot) {
	module.hot.accept('containers/App', () => { renderApp(App) })
}