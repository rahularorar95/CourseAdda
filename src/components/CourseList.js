import React, { Component } from "react"
import CardDeck from "react-bootstrap/CardDeck"
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"
import Course from "./Course"
import history from '../history'
import "../App.css"
export class CourseList extends Component {
    viewAll(e,provider) {
        e.preventDefault()
        history.push(`/provider/${provider}`)
    }
    render() {
        const { Provider } = this.props.courseList[0]
        let button = ""
        if (this.props.courseList.length > 6) {
            button = (
                <Button variant='success' className='button-primary' onClick={(e)=>this.viewAll(e,Provider)}>
                    View All
                </Button>
            )
        }
        if (Provider) {
            return (
                <Jumbotron
                    className='jumbotron'
                    style={{
                        padding: "2rem 1rem",
                        width: "87%",
                        "margin-right": "auto",
                        "margin-left": "auto",
                        "background-color": "#F8F9FA"
                    }}
                >
                    <h4 style={{ "margin-bottom": "1.5rem" }}>Courses from {Provider}</h4>
                    <CardDeck className='card-deck'>
                        {this.props.courseList.slice(0, 6).map((item, index) => {
                            return <Course key={index} course={item} />
                        })}
                    </CardDeck>
                    {button}
                </Jumbotron>
            )
        } else {
            return ""
        }
    }
}

export default CourseList
