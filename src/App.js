import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './App.scss';
import Navbar from './components/navbar/navbar';
import DogImages from './views/dog-images/dog-images';
import DogList from './views/dog-list/dog-list';
import PageNotFound from './views/page-not-found/page-not-found';


export const LocationDisplay = () => 
{
	const location = useLocation()
  
	return <div data-testid="location-display">{location.pathname}</div>
}

export default function App() 
{
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Switch>
					<Route path="/" component={DogList} exact />
					<Route path="/dog/:type/:subType?" component={DogImages} />
					<Route component={PageNotFound}/>
				</Switch>
			</Router>
		</div>
	);
}
