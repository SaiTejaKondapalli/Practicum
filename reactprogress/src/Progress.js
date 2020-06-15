import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class Progressbar extends Component {
    render() {
        const now = Math.round((this.props.completed / this.props.total_days) * 100);
        const progressInstance = <ProgressBar now={now} label={`${now}%`} />;
        return (
            <div style={{ width: "100%"}}>
                {progressInstance}
            </div>
        );
    }
}

export default Progressbar;