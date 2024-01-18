import React from 'react';
import { Card, Elevation, Icon} from "@blueprintjs/core";
import SoccerGameDialog from '../components/SoccerGameDialog'
import { getData } from './../requests/requests';
import { URLS } from './../requests/constants'

function isSameDay(date1Str, date2Str, type) {

  let fix = date1Str.length === 10 ? 0 : 0;

  const date1 = new Date(date1Str);
  const date2 = new Date(date2Str);
  // if(type === true){
  //   console.log('..............', {
  //     fix,
  //     LEN: date1Str.length,
  //     date1Str, date2Str,
  //     1: date1.getFullYear(), d2: date2.getFullYear(),
  //     M1: date1.getMonth(), M2: date2.getMonth(),
  //     D1: date1.getDate() - fix, D2: date2.getDate()
  //   });
  // }
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() - fix === date2.getDate();
}

function filterEventsByDate(events, dateString) {
  // Parse the provided date string and extract year, month, and day
  const givenDate = new Date(dateString);
  const givenYear = givenDate.getFullYear();
  const givenMonth = givenDate.getMonth(); // Note: getMonth() returns 0 for January, 1 for February, etc.
  const givenDay = givenDate.getDate();

  // Filter the events
  return events.filter(event => {
      // Parse the event date string
      const eventDate = new Date(event.Date);
      const eventYear = eventDate.getFullYear();
      const eventMonth = eventDate.getMonth();
      const eventDay = eventDate.getDate();

      // Compare year, month, and day
      return eventYear === givenYear && eventMonth === givenMonth && eventDay === givenDay;
  });
}
const TEAM = 'U. Bascov'

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      calendarDays: [],
      events: [],
    };
  }

  getEvents = async () => {
    getData(URLS.events).then(result => {
        this.setState({ events: result })

    });
    // getData(URLS.games).then(result => {
    //   let results = result?.map(i => { i.eventType = 'game'; return i; });
    //   let events = [...this.state.events];
    //   console.log(1, events);
    //   events = events.length ? events.filter(e=>e.eventType !== 'game'): [];
    //   results.forEach(r=>{
    //     events.push(r);
    //   })
    //   this.setState({ events: results })
    // });

    // getData(URLS.trainings).then(result => {
    //   let results = result?.map(i => { i.eventType = 'training'; return i; });
    //   let events = [...this.state.events];
    //   console.log(2, events);
    //   events = events.length ? events.filter(e=>e.eventType !== 'training'): [];
    //   results.forEach(r=>{
    //     events.push(r);
    //   })
      
      
      // this.setState({ events: results })
    // });
  }

  componentDidMount() {
    this.generateCalendar();
    this.getEvents();
    
   
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentDate.getMonth() !== this.state.currentDate.getMonth()) {
      this.generateCalendar();
    }
  }

  generateCalendar = () => {
    const { currentDate } = this.state;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Adjusting so that Monday is the first day of the week
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
    const daysInThisMonth = new Date(year, month + 1, 0).getDate();

    let calendarDays = [];

    // Fill in days from the previous month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null);
    }

    // Fill in days for the current month
    for (let day = 1; day <= daysInThisMonth; day++) {
      calendarDays.push(new Date(year, month, day));
    }

    this.setState({ calendarDays });
  };

  goToPreviousMonth = () => {
    this.setState(prevState => ({
      currentDate: new Date(prevState.currentDate.getFullYear(), prevState.currentDate.getMonth() - 1, 1)
    }), this.generateCalendar);
  };

  goToNextMonth = () => {
    this.setState(prevState => ({
      currentDate: new Date(prevState.currentDate.getFullYear(), prevState.currentDate.getMonth() + 1, 1)
    }), this.generateCalendar);
  };

  renderDay = (day) => {

    const dayOfMonth = day ? day.getDate() : '';
    const dayOfWeek = day ? day.toLocaleString('en-us', { weekday: 'short' }) : '';
    let event = this.state.events.filter(g => {
      return isSameDay(g.Date, day)
    })
    
    //  Box classes

    let boxClass = 'calendar-day';

    let today = new Date();
    if (isSameDay(today, day)) {
      isSameDay(today, day, true)
      boxClass += " highlight-today"
    }

    if (['Sat', 'Sun'].includes(dayOfWeek)) {
      boxClass += ' highlight-w-day ';
    }

    if (event.length) {
    }
    if(day === null){
      boxClass += ' not-al-box';
    }

    let title = `Day off`;
    let description = '';

    if(event.length && event?.[0]?.ActivityType === 'Game'){
        console.log(event);
        title = `Game`;
        description = event[0].HomeAway === 'Away'
        ? event[0].Competitor + ' - ' + TEAM
        : TEAM + ' - ' + event[0].Competitor
        boxClass += " highlight-game";
    }
    
    if(event.length && event?.[0]?.ActivityType === 'Training'){
        console.log(event);
        title = `Training`;
        description = (event[0].Hour? `Hour: ${event[0].Hour}`: 'No info') + ' ' + event[0].Location;
        boxClass += " highlight-training";
    }




    var descriptionClass = 'card-description'
    if(description === ''){
      description = 'Add event'
    }
    return (
      <Card className={boxClass} interactive={true} elevation={Elevation.TWO}
        onClick={() => {
          if (event.length) {
            this.setState(
              { isAddEditEventOpen: true, activeDate: day, activeDay: event?.[0]}
            )
          } else {
            this.setState(
              { isAddEditEventOpen: true, activeDate: day}, () => {}
            )
          }
        }}
      >
        <div className='card-header'>
          <div className="bp3-heading">{title}</div>
          <div className='date-top-right'>{dayOfWeek}, {dayOfMonth}</div>
        </div>
        <div className={descriptionClass} >{description}</div>



      </Card>
    );
  };

  handleSelectionChange = () => {
    console.log('Change selection');
  }

  render() {
    const { calendarDays, currentDate } = this.state;
    console.log(this.state);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
      <div className="overview-layout ss-full-width">
        <div className="calendar-container">
          <h1>Calendar</h1>

          <div>
            <div className="month-navigation">
              <button onClick={this.goToPreviousMonth}><Icon icon="chevron-left" /></button>
              <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button onClick={this.goToNextMonth}><Icon icon="chevron-right" /></button>
            </div>
            <div className="calendar-grid">
              {calendarDays.map((day, index) => (
                <div key={index} className="calendar-grid-item">
                  {this.renderDay(day)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {
          this.state.isAddEditEventOpen &&
            <SoccerGameDialog
              isOpen={this.state.isAddEditEventOpen}
              handleClose={() => { this.setState({ isSaving: true, isAddEditEventOpen: false }, () => this.getEvents()) }}
              activeDate={this.state.activeDate}
              events={filterEventsByDate(this.state.events, this.state.activeDate)}
            />
        }

      </div>
    );
  }
}

export default Calendar;

