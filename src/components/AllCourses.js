import React, { Component } from "react"
import CourseList from "./CourseList"
import { connect } from "react-redux"
import { fetchCourses } from "../actions/index"
import Jumbotron from "react-bootstrap/Jumbotron"
import "./App/App.css"
import Loader from "./Loader/Loader";
export class AllCourses extends Component {
    componentDidMount() {
        //this.props.fetchCourses()
    }

    renderAllLists() {
        const providers = this.props.providers

        const List = Object.keys(providers).map((key, index) => {
            return <CourseList key={index} courseList={providers[key]} />
        })

        return List
    }
    render() {
        if (this.props.providers) {
            return (
                <div>
                    <div>
                        <Jumbotron className='jumbotron' />
                    </div>
                    <h3 className='total-courses-text'>Total Courses Found : {this.props.allCourses.length}</h3>
                    {this.renderAllLists()}
                </div>
            )
        }

        return <Loader />
    }
}
const mapStateToProps = state => {
    return {
        allCourses: state.courses.allCourses,
        providers: state.courses.providers
    }
}
export default connect(
    mapStateToProps,
    { fetchCourses }
)(AllCourses)
