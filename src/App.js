import React, { Component } from "react"
import Header from "./components/Header"
import AllCourses from "./components/AllCourses"
import ProviderCourses from "./components/ProviderCourses"
import SearchResult from "./components/SearchResult"
import { Router, Route, Switch } from "react-router-dom"
import "./App.css"
import history from "./history"
class App extends Component {
    render() {
        return (
            <div className='App'>
                <Router history={history}>
                    <Header />
                    <Switch>
                        <Route path='/' exact component={AllCourses} />
                        <Route path='/provider/:id' exact component={ProviderCourses} />
                        <Route path='/search' exact component={SearchResult} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App
