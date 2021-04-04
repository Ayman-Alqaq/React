import './App.css';
import Header from './Header';
import BookLibrary from './BookLibrary';
import Book from './Book';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>

      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">A
            <BookLibrary />
          </Route>
          <Route path="/create">
            <Book />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
