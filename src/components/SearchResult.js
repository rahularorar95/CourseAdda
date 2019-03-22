import React, { Component } from "react"
import { connect } from "react-redux"
import CardDeck from "react-bootstrap/CardDeck"
import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Course from "./Course"
import Jumbotron from "react-bootstrap/Jumbotron"
import _ from "lodash"
import "../App.css"
import CustomMenu from "./CustomMenu"
export class SearchResult extends Component {
    state = { localCourses: [], childSubjects: [], filter: "All" }
    componentDidMount() {
        let childSubjects = this.props.searchResults
            .filter(item => {
                return item["Child Subject"] !== ""
            })
            .map(item => {
                return item["Child Subject"]
            })
        childSubjects = Array.from(new Set(childSubjects))
        childSubjects.unshift("All")
        this.setState({ localCourses: this.props.searchResults, childSubjects })
    }

    componentWillReceiveProps(nextProps) {
        let childSubjects = nextProps.searchResults
            .filter(item => {
                return item["Child Subject"] !== ""
            })
            .map(item => {
                return item["Child Subject"]
            })
        childSubjects = Array.from(new Set(childSubjects))
        childSubjects.unshift("All")
        this.setState({ localCourses: nextProps.searchResults, childSubjects, filter: "All" })
    }

    sortLength(val) {
        if (val === "high") {
            this.setState({ localCourses: _.sortBy(this.state.localCourses, "Length").reverse() })
        } else {
            this.setState({ localCourses: _.sortBy(this.state.localCourses, "Length") })
        }
    }
    onSelect(eventKey, eventObject) {
        this.setState({ filter: this.state.childSubjects[eventKey] })
    }
    render() {
        let content = (
            <div className='no-result'>
                No Results Found !<br />
                Search Again
            </div>
        )
        if (this.state.localCourses && this.state.localCourses.length > 0) {
            content = (
                <div>
                    <Jumbotron className='jumbotron'>
                        <div style={{ display: "-webkit-inline-box" }}>
                            <h4 style={{ marginBottom: "1.5rem" }}>Search Results for "<i>{this.props.searchTerm}</i>" </h4>
                            <Dropdown as={ButtonGroup} style={{ position: "absolute", right: "10%" }}>
                                <Button variant='success'>Sort By :</Button>

                                <Dropdown.Toggle split variant='success' id='dropdown-split-basic' />

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={e => this.sortLength("high")}>Highest Duration</Dropdown.Item>
                                    <Dropdown.Item onClick={e => this.sortLength("low")}>Lowest Duration</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown as={ButtonGroup} style={{ position: "absolute", right: "20%" }}>
                                <Button variant='success'>Filter: {this.state.filter === "All" ? "" : this.state.filter}</Button>
                                <Dropdown.Toggle split variant='success' id='dropdown-split-basic' />

                                <Dropdown.Menu as={CustomMenu} className='custom-dropdown'>
                                    {this.state.childSubjects.map((item, index) => {
                                        if (item === this.state.filter) {
                                            return (
                                                <Dropdown.Item key={index} eventKey={index} active='true'>
                                                    {item}
                                                </Dropdown.Item>
                                            )
                                        }
                                        return (
                                            <Dropdown.Item
                                                key={index}
                                                onSelect={(ek, eo) => this.onSelect(ek, eo)}
                                                eventKey={index}
                                            >
                                                {item}
                                            </Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                            ,
                        </div>
                        <CardDeck className='card-deck'>
                            {this.state.localCourses.map((item, index) => {
                                if (this.state.filter === "All" || item["Child Subject"] === this.state.filter)
                                    return <Course key={index} course={item} />
                                return ""
                            })}
                        </CardDeck>
                    </Jumbotron>
                </div>
            )
        }
        return (
            <>
                <div>
                    <Jumbotron className='jumbotron' />
                </div>
                <h3 className='total-courses-text'>
                    Total Courses Found :
                    {
                        this.state.localCourses.filter((item, index) => {
                            return this.state.filter === "All" || item["Child Subject"] === this.state.filter
                        }).length
                    }
                </h3>
                {content}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchResults: state.courses.searchResults,
        searchTerm: state.courses.searchTerm
    }
}

export default connect(mapStateToProps)(SearchResult)
