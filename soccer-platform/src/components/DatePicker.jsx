import React from 'react';
import { Button, Popover, PopoverInteractionKind } from '@blueprintjs/core';
import { DatePicker } from '@blueprintjs/datetime';

class DatePickerButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            isOpen: false
        };
    }

    handleDateChange = (newDate) => {
        this.setState({ selectedDate: newDate }, ()=>{
            this.props.onChange(this.state.selectedDate);
        });
    };

    handleButtonClick = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    render() {
        return (
            <div>
                <Popover
                    content={<DatePicker value={this.state.selectedDate} onChange={this.handleDateChange} />}
                    interactionKind={PopoverInteractionKind.CLICK}
                    isOpen={this.state.isOpen}
                    onInteraction={(state) => this.setState({ isOpen: state })}
                >
                    <Button text={this.state.selectedDate.toLocaleDateString()} onClick={this.handleButtonClick} />
                </Popover>
            </div>
        );
    }
}

export default DatePickerButton;
