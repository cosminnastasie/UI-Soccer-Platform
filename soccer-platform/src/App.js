// App.js
import './App.css';
import './scss/style.scss';
import "@blueprintjs/core/lib/css/blueprint.css";
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { StoredCodeProvider } from './StoredCodeContext';
import AppRoutes from './AppRoutes'; // 👉 creezi această componentă nouă

class App extends React.Component {
	render() {
		return (
			<StoredCodeProvider>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</StoredCodeProvider>
		);
	}
}

export default App;
