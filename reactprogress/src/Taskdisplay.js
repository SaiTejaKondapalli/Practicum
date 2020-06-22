import React, { Component } from 'react';
import Progress from './Progress'
import Progresscircular from './Progresscircular';
import { Button, Card } from 'react-bootstrap';
import { Container, Col } from 'react-bootstrap';
import Slider from "react-slick";
import './Taskdisplay.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class Taskdisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            isData: false,
            skillCount: 0,
            status: 0,
            prog_totaldays: 0,
            prog_completeddays : 0
        }

    }

    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl +
            // 'https://0sd0yhz56i.execute-api.ap-south-1.amazonaws.com/prod/tasks/saiteja@gmail.com/Developer')
            'https://0sd0yhz56i.execute-api.ap-south-1.amazonaws.com/prod/tasks/manaswini@gmail.com/Mobile Developer')
            // 'https://0sd0yhz56i.execute-api.ap-south-1.amazonaws.com/prod/tasks/phani1@gmail.com/ADS')
            // 'https://0sd0yhz56i.execute-api.ap-south-1.amazonaws.com/prod/tasks/manu@gmail.com/Java Developer')
            // 'https://goaltrackerapi.herokuapp.com/tasks/saiteja@gmail.com/Quantitative Aptitude')
            .then(res => res.json())
            // .then(data => console.log(data))
            //     if (res.ok) {
            //         this.setState({
            //             isData: true
            //         })
            //         res.json()
            //         // console.log(res.json())
            //     }
            //     else {
            //         console.log("Data raale")
            //     }
            // })
            // .then(data => {
            //     this.setState({
            //         isData: true
            //     })
            // })
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                    tasks: null,
                }, () => {
                    // console.log(this.state.isLoaded)
                    var tdays = 0;
                    var cdays = 0;
                    var sCount = 0;
                    for (var char in this.state.items.tasks) {
                        sCount++;
                        tdays += this.state.items.tasks[char].totaldays;
                        cdays += this.state.items.tasks[char].complete;
                        }
                        this.setState({ skillCount: sCount,prog_totaldays: tdays, prog_completeddays: cdays });
                })
            })
            .catch(
                // console.log("asdagsdgsdgs")

            )
    }

    render() {
        // cards = 1 --- padding : 340px, slidesTOshow : 1, centerMode : true, novariable width
        // cards = 1 --- padding : 420px, slidesTOshow : 1, centerMode : true, novariable width, with container extension
        // cards = 2 --- padding : 120px, slidesToshow : 2,centerMode : true,novariable width
        // cards = 2 --- padding : 200px, slidesTOshow : 2, centerMode : true, novariable width, with container extension
        // cards = 3 or more --- slidesToshow : 3, nopadding,centermode : false
        var paddingValue = 0;
        var slides = 0;
        var middle = false;
        if (this.state.skillCount === 1) {
            paddingValue = "420";
            slides = 1;
            middle = true;

        }
        else if (this.state.skillCount === 2) {
            paddingValue = "200";
            slides = 2;
            middle = true;

        }
        else if (this.state.skillCount >= 3) {
            // paddingValue = "0";
            slides = 3;
            // middle = true;

        }

        var { isLoaded, items } = this.state;
        // console.log(this.state.skillCount);
        var settings = {
            dots: true,
            autoplay: false,
            centerMode: middle,
            centerPadding: paddingValue,
            // variableWidth: true,
            infinite: false,
            speed: 500,
            slidesToShow: slides,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1100,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    // infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                  }
                }
                // {
                //   breakpoint: 480,
                //   settings: {
                //     slidesToShow: 1,
                //     slidesToScroll: 1
                //   }
                // }
              ]
        };
        // if (!isData) {
        //     return <div>No strategies selected please select one.</div>;
        // }
        if (!isLoaded) {
            return <div>Loading....</div>;
        }
        else {
            return (
                <div className="Taskdisplay">
                <div className="bar">
                    {items.email}<br/>
                    <strong>Goal : </strong>{items.goal}<br /><br />
                    <strong>OVERALL STATUS</strong>
                </div>
                <div style={{textAlign:"center"}}>
                    <Progresscircular x={this.state.prog_totaldays} t={this.state.prog_completeddays} />
                </div>
                <br/>
                <div>
                    <Container className = "container">
                        <Slider {...settings}>
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
                        </Slider>
                    </Container>
                </div>
            </div>
            );
        }

    }
}

export default Taskdisplay;