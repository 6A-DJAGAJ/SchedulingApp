import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ko', {
  week: {
      dow: 1,
      doy: 1,
  },
});

const localizer = momentLocalizer(moment);

export default class App extends Component {
  constructor() {
    super();
    const now = new Date();
    
    const events = [
      {
        id: 0,
        title: 'Class',
        start: new Date(2019, 10, 7, 13, 55, 0),
        end: new Date(2019, 10, 7, 14, 45, 0),
        resourceId: 1,
      },
      {
        id: 1,
        title: 'Class',
        allDay: true,
        start: new Date(2019, 10, 7, 13, 55, 0),
        end: new Date(2019, 10, 7, 14, 45, 0),
        resourceId: 2,
      },
      {
        id: 2,
        title: 'Class',
        start: new Date(2019, 10, 7, 13, 55, 0),
        end: new Date(2019, 10, 7, 14, 45, 0),
        resourceId: 3,
      },
      {
        id: 11,
        title: 'Class',
        start: new Date(2019, 10, 7, 13, 55, 0),
        end: new Date(2019, 10, 7, 14, 45, 0),
        resourceId: 4,
      },
    ]

    const resourceMap = [
      { resourceId: 1, resourceTitle: 'Anthony' },
      { resourceId: 2, resourceTitle: 'Daniel' },
      { resourceId: 3, resourceTitle: 'Jaxson' },
      { resourceId: 4, resourceTitle: 'Jason' },
    ]
    

    this.state = {
      name: 'React',
      events,
      resourceMap
    };
  }

  render() {
    return (
      <div>
        <p>
          A test for the React Big Calendar.
        </p>
        <div style={{ height: '500pt'}}>
          <Calendar
            events={this.state.events}
            views={['month', 'week', 'day']}
            defaultView={Views.WEEK}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            resources={this.state.resourceMap}
            resourceIdAccessor="resourceId"
            resourceTitleAccessor="resourceTitle"
            localizer={localizer}
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));