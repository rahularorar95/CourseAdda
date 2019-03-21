import React, { Component } from "react"
import Card from "react-bootstrap/Card"
import "../App.css"
export class Course extends Component {
    handleClick(url) {
        if (url) window.open(url, "_blank")
    }
    render() {
        const { course } = this.props
        //console.log(course)
        return (
            <>
                <Card className='course-card' onClick={() => this.handleClick(course.Url)} Title={course["Course Name"]}>
                    <Card.Body>
                        <Card.Title>{course["Course Name"]}</Card.Title>
                        <Card.Text>
                            {course["Parent Subject"]}
                            <br />
                            {course["Universities"]["Institutions"].split("|||").join(",")}
                            <br />
                            <p className='course-length'>{course["Length"]} weeks</p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className='text-muted'>Next Session: {course["Next Session Date"]}</small>
                    </Card.Footer>
                </Card>
            </>
        )
    }
}

export default Course
