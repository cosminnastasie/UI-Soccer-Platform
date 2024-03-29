import React from 'react';
import { Card, Elevation, Icon} from "@blueprintjs/core";
import SoccerGameDialog from '../components/SoccerGameDialog'
import { getData,  } from './../requests/requests';
import { areDatesInSameMonthAndYear, stringToDate } from './../requests/helpers';
import { URLS } from './../requests/constants'

function isSameDay(date1Str, date2Str, type) {

  let fix = date1Str.length === 10 ? 0 : 0;

  const date1 = new Date(date1Str);
  const date2 = new Date(date2Str);

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
      calendarDate: new Date(),
      calendarDays: [],
      events: [],
    };
  }

  getEvents = async () => {
    getData(URLS.events).then(result => {
        this.setState({ events: result })

    });
  }

  componentDidMount() {
    this.generateCalendar();
    this.getEvents();
    
   
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.calendarDate.getMonth() !== this.state.calendarDate.getMonth()) {
      this.generateCalendar();
    }
  }

  generateCalendar = () => {
    const { calendarDate } = this.state;
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Adjusting so that Monday is the first day of the week
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;

    const daysInThisMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    let calendarDays = [];

    // Fill in days from the previous month
    for (let i = firstDayOfWeek; i > 0; i--) {
        calendarDays.push(new Date(year, month - 1, daysInPreviousMonth - i + 1));
    }

    // Fill in days for the current month
    for (let day = 1; day <= daysInThisMonth; day++) {
        calendarDays.push(new Date(year, month, day));
    }

    // Fill in days from the next month if needed
    let nextMonthDay = 1;
    while (calendarDays.length < 35) {
        calendarDays.push(new Date(year, month + 1, nextMonthDay));
        nextMonthDay++;
    }

    this.setState({ calendarDays });
};

  goToPreviousMonth = () => {
    this.setState(prevState => ({
      calendarDate: new Date(prevState.calendarDate.getFullYear(), prevState.calendarDate.getMonth() - 1, 1)
    }), this.generateCalendar);
  };

  goToNextMonth = () => {
    this.setState(prevState => ({
      calendarDate: new Date(prevState.calendarDate.getFullYear(), prevState.calendarDate.getMonth() + 1, 1)
    }), this.generateCalendar);
  };

  renderDay = (day) => {
    const dayOfMonth = day ? day.getDate() : '';
    const dayOfWeek = day ? day.toLocaleString('en-us', { weekday: 'short' }) : '';
    let event = this.state.events.filter(g => {
      if( g?.Date?.includes('.') ){
       g.Date = stringToDate(g.Date);
      }
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

    if( !areDatesInSameMonthAndYear(day, this.state.calendarDate)){
      boxClass += ' not-al-box';
    }

    let title = `Day off`;
    let description = '';
    let gameResult = '';
    if(event.length && event?.[0]?.ActivityType === 'Game'){
        title = `Game`;
        gameResult = event[0].Result;
        description = event[0].HomeAway === 'Away'
        ? event[0].Competitor + ' - ' + TEAM
        : TEAM + ' - ' + event[0].Competitor
        boxClass += " highlight-game";
    }
    
    if(event.length && event?.[0]?.ActivityType === 'Training'){
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
        {
          gameResult !== '' ? <div className="mono-font" >{gameResult}</div>: ''
        }
        
      </Card>
    );
  };

  render() {
    const { calendarDays, calendarDate } = this.state;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log('Game STATE', this.state);
    return (
      <div className="overview-layout ss-full-width">
        <div className="calendar-container">
          <h1>Calendar</h1>

          <div>
            <div className="month-navigation">
              <button onClick={this.goToPreviousMonth}><Icon icon="chevron-left" /></button>
              <h2>{monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}</h2>
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

