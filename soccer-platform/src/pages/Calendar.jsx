import React from 'react';
import {
  Card, Elevation,
  Button,
  ButtonProps,
  Code,
  Dialog,
  DialogStep,
  Divider,
  FormGroup,
  H5,
  MultistepDialog,
  MultistepDialogNavPosition,
  NumericInput,
  Radio,
  RadioGroup,
  SegmentedControl,
  Switch,
  Icon
} from "@blueprintjs/core";
import SoccerGameDialog from '../components/SoccerGameDialog'
import { getData, postData } from './../requests/requests';
import { URLS } from './../requests/constants'

function isSameDay(date1Str, date2Str, type) {
  let fix = date1Str.length === 10 ? 0 : 1;

  const date1 = new Date(date1Str);
  const date2 = new Date(date2Str);

  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() - fix === date2.getDate();
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
    getData(URLS.games).then(result => {
     console.log('GET DATA......');
      this.setState({ players: result })
      let results = result?.map(i => { i.eventType = 'game'; return i; });
      this.setState({ events: results })
    });
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
      if (g.IdGames === 3) {
        isSameDay(g.Date, day, 'checkForEvents')
      }
      return isSameDay(g.Date, day)
    })

    
    let title = `No event`;
    let description = 'Day off!';

    if (event.length) {
      // title = `${event[0].Type} game`;
      title = `Game`;
      if (event) {
        description = event[0].HomeAway === 'Away'
          ? event[0].Competitor + ' - ' + TEAM
          : TEAM + ' - ' + event[0].Competitor
      }
    }

    // Example title and description for each day

    let boxClass = 'calendar-day';

    if (isSameDay(this.state.currentDate, day, 0)) {
      boxClass += " highlight-today"
    }
    if (['Sat', 'Sun'].includes(dayOfWeek)) {
      boxClass += ' highlight-w-day ';
    }

    if (event.length) {
      boxClass += ' highlight-game'
    }

    return (
      <Card className={boxClass} interactive={true} elevation={Elevation.TWO}
        onClick={() => {
          if (event.length) {
            this.setState(
              { isAddEditEventOpen: true, activeDate: day, activeDay: event?.[0] }, () => { console.log(this.state.activeDay); }
            )
          } else {
            this.setState(
              { isAddEditEventOpen: true, activeDate: day}, () => { console.log(this.state.activeDay); }
            )
          }
        }}
      >
        <div className='card-header'>
          <div className="bp3-heading">{title}</div>
          <div className='date-top-right'>{dayOfWeek}, {dayOfMonth}</div>
        </div>
        <div className='card-description' >{description}</div>



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
    var finalButtonProps = {}
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
          />
        }

      </div>
    );
  }
}

function SelectPanel() {
  return <div>Panel content</div>
}
function ConfirmPanel() {
  return <div>Panel content</div>
}

export default Calendar;

