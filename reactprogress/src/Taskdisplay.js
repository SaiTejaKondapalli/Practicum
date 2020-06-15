import React, { Component } from 'react';
import Progress from './Progress'
import Progresscircular from './Progresscircular';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import './Taskdisplay.css';
import { Container,Col } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


class Taskdisplays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            prog_totaldays: 0,
            prog_completeddays : 0
        }

    }

    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl + 'https://goaltrackerapi.herokuapp.com/tasks/saiteja@gmail.com/Quantitative Aptitude')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                    tasks: null
                }, () => {
                    // console.log(this.state.isLoaded)
                    var tdays = 0;
                    var cdays = 0;
                    for(var char in this.state.items.tasks){
                        tdays += this.state.items.tasks[char].totaldays;
                        cdays += this.state.items.tasks[char].complete;
                        }
                        this.setState({ prog_totaldays: tdays, prog_completeddays: cdays });
                })
            })
            .catch({

            })
    }

    render() {
        var { isLoaded, items } = this.state;
        var settings = {
            dots: true,
            autoplay : true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
          };
        if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <div className="Taskdisplay">
                    <div className="bar">
                        {items.email}<br/>
                        <strong>Goal : </strong>{items.goal}<br />
                        <strong>OVERALL STATUS</strong>
                    </div>
                    <div>
                        <Progresscircular x={this.state.prog_totaldays} t={this.state.prog_completeddays} />
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <div>
                        <Container className = "container">
                        <Slider {...settings}>
                        {/* <Card> */}
                                {items.tasks.map(tsk => (

                                        <Col>
                                <Card border = "primary" bg="secondary" style={{ width: '25rem' }}>
                                    <Card.Header style = {{color:"white",fontSize:20}}>{tsk.skillName}</Card.Header>
                                    <Card.Body>
                                        <Card.Text style = {{color:"white"}}>
                                            <strong>Start date : </strong>{tsk.start_date}<br/>
                                            <strong>End date : </strong>{tsk.end_date}<br/>
                                            <strong>Total days : </strong>{tsk.totaldays}<br/>
                                            <strong>Completed : </strong>{tsk.complete}<br/><br/>
                                            <Progress total_days={tsk.totaldays} completed={tsk.complete} /><br />
                                            <Button variant="primary">Edit</Button>
                                        </Card.Text>
                                    </Card.Body>
                                            </Card>
                                            </Col>

                            ))}
                        {/* </Card> */}
                            </Slider>
                            </Container>
                    </div>
                </div>
            );
        }

    }
}

export default Taskdisplays;