import React, { Component } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Progresscircular extends Component {
    render() {
        const value = Math.round((this.props.t / this.props.x)*100);
        const circular = <CircularProgressbar value={value} maxvalue={1} text={`${value}%`} />;
        return (
            <div style = {{ width: 180,position:"absolute",left:680,top:80}}>
                {circular}
            </div>
        );
    }
}

export default Progresscircular;