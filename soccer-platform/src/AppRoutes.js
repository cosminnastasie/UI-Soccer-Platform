// AppRoutes.js
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './elements/Layout';
import Players from "./pages/Players";
import Calendar from "./pages/Calendar";
import Training from "./pages/Training";
import TrainingFormation from "./pages/TrainingFormation";
import Security from "./pages/Security";
import { StoredCodeContext } from './StoredCodeContext';

class AppRoutes extends React.Component {
	static contextType = StoredCodeContext;

	render() {
		const storedCode = this.context;
		console.log("Stored code in AppRoutes:", storedCode);

		return (
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Calendar />} />
					<Route path="/Security" element={<Security />} />
					<Route path="*" element={<div>404</div>} />
					{storedCode === 'copadelmondo' && (
						<Route path="/players" element={<Players />} />
					)}
					<Route path="/calendar" element={<Calendar />} />
					<Route path="/training" element={<Training />} />
					<Route path="/TrainingFormation" element={<TrainingFormation />} />
					
				</Route>
			</Routes>
		);
	}
}

export default AppRoutes;
