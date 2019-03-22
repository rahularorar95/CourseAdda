import React, { Component } from "react"
import Header from "../Header"
import AllCourses from "../AllCourses"
import ProviderCourses from "../ProviderCourses"
import SearchResult from "../SearchResult"
import { Router, Route, Switch } from "react-router-dom"
import "./App.css"
import history from "../../history"
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
