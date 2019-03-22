import React, { Component } from "react"
import { Navbar, Nav, Form, Button, Row, Col, Spinner } from "react-bootstrap"
import Dropdown from "react-bootstrap/Dropdown"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { connect } from "react-redux"
import { fetchCourses, setSearchResult } from "../actions"
import CustomMenu from "./CustomMenu"
import history from "../history"
import "../App.css"
export class Header extends Component {
    componentDidMount() {
        this.props.fetchCourses()
    }
    state = {
        primaryFilter: "All",
        primaryFilters: ["All", "Universities", "Providers", "Subjects"],
        secondaryFilter: "All",
        secondaryFilters: [],
        searchTerm: ""
    }
    onSelectPrimary(eventKey, eventObj) {
        this.setState({ primaryFilter: this.state.primaryFilters[eventKey] }, () => {
            let obj = this.props[this.state.primaryFilter.toLowerCase()]
            if (obj) {
                let secondaryFilters = Object.keys(obj)
                secondaryFilters.unshift("All")
                this.setState({ secondaryFilter: "All", secondaryFilters })
            } else {
                this.setState({ secondaryFilters: [] })
            }
        })
    }

    onChange(e) {
        this.setState({ searchTerm: e.target.value })
    }

    handleSearch(e) {
        e.preventDefault()
        let searchResults = []
        if (this.state.primaryFilter === "All") {
            searchResults = this.props.allCourses.filter(item => {
                return item["Course Name"].toLowerCase().includes(this.state.searchTerm)
            })
        } else {
            let resultObj = this.props[this.state.primaryFilter.toLowerCase()]

            if (this.state.secondaryFilter === "All") {
                for (let key in resultObj) {
                    if (key) {
                        for (let course of resultObj[key]) {
                            if (course["Course Name"].toLowerCase().includes(this.state.searchTerm)) {
                                searchResults.push(course)
                            }
                        }
                    }
                }
            } else {
                let arr = resultObj[this.state.secondaryFilter]
                searchResults = arr.filter(item => {
                    return item["Course Name"].toLowerCase().includes(this.state.searchTerm)
                })
            }
        }

        this.props.setSearchResult(Array.from(new Set(searchResults)),this.state.searchTerm)
    }

    onSelectSecondary(eventKey, eventObj) {
        this.setState({ secondaryFilter: this.state.secondaryFilters[eventKey] })
    }
    navigateHome = () => {
        this.setState({ primaryFilter: "All", secondaryFilters: [], searchTerm: "" })
        history.push("/")
    }
    render() {
        return (
            <div>
                <Navbar
                    expand='lg'
                    variant='dark'
                    style={{
                        backgroundColor: "#00953A"
                    }}
                >
                    <Navbar.Brand onClick={this.navigateHome} style={{ cursor: "pointer" }}>
                        CourseAdda{" "}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Nav.Link onClick={this.navigateHome} style={{ color: "white" }}>
                                Home
                            </Nav.Link>
                        </Nav>

                        <Form className='mr-auto' onSubmit={e => this.handleSearch(e)}>
                            <Row className='mr-auto'>
                                <Col className='search-box'>
                                    <Form.Control
                                        placeholder={this.props.allCourses ? "Enter course to search..." : "Loading Courses..."}
                                        value={this.state.searchTerm}
                                        onChange={e => this.onChange(e)}
                                    />
                                </Col>
                                <Col xs={3}>
                                    <Dropdown as={ButtonGroup}>
                                        <Button className='search-filter'>Search in</Button>
                                        <Dropdown.Toggle split variant='success' id='dropdown-split-basic'>
                                            {this.state.primaryFilter}&nbsp; &nbsp;
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className='custom-dropdown'>
                                            {this.state.primaryFilters.map((item, index) => {
                                                if (item === this.state.primaryFilter) {
                                                    return (
                                                        <Dropdown.Item key={index} eventKey={index} active='true'>
                                                            {item}
                                                        </Dropdown.Item>
                                                    )
                                                }
                                                return (
                                                    <Dropdown.Item
                                                        key={index}
                                                        onSelect={(ek, eo) => this.onSelectPrimary(ek, eo)}
                                                        eventKey={index}
                                                    >
                                                        {item}
                                                    </Dropdown.Item>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                {this.state.secondaryFilters.length > 0 && (
                                    <Col>
                                        <Dropdown as={ButtonGroup}>
                                            <Button className='search-filter'>{this.state.primaryFilter}:</Button>
                                            <Dropdown.Toggle split variant='success' id='dropdown-split-basic'>
                                                {this.state.secondaryFilter}&nbsp; &nbsp;
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu as={CustomMenu} className='custom-dropdown'>
                                                {this.state.secondaryFilters.map((item, index) => {
                                                    if (item === this.state.secondaryFilter) {
                                                        return (
                                                            <Dropdown.Item key={index} eventKey={index} active='true'>
                                                                {item}
                                                            </Dropdown.Item>
                                                        )
                                                    }
                                                    return (
                                                        <Dropdown.Item
                                                            key={index}
                                                            onSelect={(ek, eo) => this.onSelectSecondary(ek, eo)}
                                                            eventKey={index}
                                                        >
                                                            {item}
                                                        </Dropdown.Item>
                                                    )
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                )}

                                <Col>
                                    <Button variant='success' className='search-button' onClick={e => this.handleSearch(e)}>
                                        {this.props.allCourses ? (
                                            "Search Courses"
                                        ) : (
                                            <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
                                        )}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allCourses: state.courses.allCourses,
        providers: state.courses.providers,
        universities: state.courses.universities,
        subjects: state.courses.subjects
    }
}
export default connect(
    mapStateToProps,
    { fetchCourses, setSearchResult }
)(Header)
