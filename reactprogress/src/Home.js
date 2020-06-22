import React from 'react';
import Navigationbar from './Navigationbar';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Taskdisplay from './Taskdisplay';
import Dreamjobs from './Dreamjobs';
import About from './About';

function Home() {
  return (
    <div className="Home">
        <Router>
              <Navigationbar />
              <Switch>
                <Route exact path="/" component={Taskdisplay} />
                <Route path="/about" component={About} />
                <Route path="/dreamjob" component={Dreamjobs} />
              </Switch>
          </Router>
    </div>
  );
}

export default Home;
