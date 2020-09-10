import React, { Component } from 'react';
import PhotoConextProvider from "./context/PhotoContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Item from "./components/Item";
import Search from "./components/Search";
import NotFound from "./components/NotFound";


class App extends Component {

  handleSubmit = (e, history, searchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    history.push(url);
  }
  render() {
    return (
      <PhotoConextProvider>
        <HashRouter basename="/s1">
          <div className="container">
            <Route 
              render={ props => (
                <Header 
                  handleSubmit={this.handleSubmit}
                  history={props.history}
                />
              )}
            />
            <Switch>
              <Route 
                exact
                path="/"
                render={()=><Redirect to="sky"/>}
              />
              <Route 
                path="/mountain"
                render={()=><Item searchTerm="mountain" />}
              />
              <Route 
                path="/sky"
                render={()=><Item searchTerm="sky" />}
              />
              <Route path="/beach" render={()=><Item searchTerm="beach" />} />
              <Route 
                path="/search/:searchInput"
                render={props=>(<Search searchTerm={props.match.params.searchInput}/>)}
              />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </HashRouter>
      </PhotoConextProvider>
    );
  }
}


export default App;
