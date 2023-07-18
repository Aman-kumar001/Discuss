import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/login/Login';
import Dashboard from './Components/dashboard/Dashboard';
import { useEffect, useState } from 'react';
import Lost from './Components/lost/Lost';
function App() {
	const [token, setToken] = useState('');
	useEffect(() => {
		if (localStorage.getItem('token')) {
			setToken(JSON.parse(localStorage.getItem('token')));
			console.log(JSON.parse(localStorage.getItem('token')));
		}
	}, []);
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Login token={token} setToken={setToken} />}
					/>
					{token != '' && (
						<Route path='/dashboard' element={<Dashboard token={token} />} />
					)}
					//default route
					<Route path='*' element={<Lost />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
