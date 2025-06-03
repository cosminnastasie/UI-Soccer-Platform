import React, { Component } from 'react';
import { PIN } from './../requests/constants'


class Security extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pin: '',
            isPinCorrect: false,
            code: '',
        };
    }

    handlePinChange = (event) => {
        this.setState({ pin: event.target.value });
    };

    handlePinSubmit = () => {
        if (this.state.pin === PIN) {
            this.setState({ isPinCorrect: true });
        } else {
            alert('Incorrect PIN');
        }
    };

    handleCodeChange = (event) => {
        this.setState({ code: event.target.value });
    };

    saveCodeToLocalStorage = () => {
        localStorage.setItem('key-write', this.state.code);
        alert('Code saved successfully!');
    };

    clearCodeFromLocalStorage = () => {
        localStorage.removeItem('key-write');
        alert('Code cleared successfully!');
    };

    render() {
        return (
            <div  style={{'width': '100vw', 'height': '100vh', 'background': '#000', 'padding': '100px 40px'}}>
                {!this.state.isPinCorrect && <div className='first-step'>
                    <label>
                        Enter PIN:
                        <input
                            type="password"
                            value={this.state.pin}
                            onChange={this.handlePinChange}
                        />
                    </label>
                    <button onClick={this.handlePinSubmit}>Submit PIN</button>
                </div>}
                {this.state.isPinCorrect && (
                    <div className='second-step'>
                        <label>
                            Save Code:
                            <input
                                type="text"
                                value={this.state.code}
                                onChange={this.handleCodeChange}
                            />
                        </label>
                        <button onClick={this.saveCodeToLocalStorage}>
                            Save Code
                        </button>
                        <button onClick={this.clearCodeFromLocalStorage}>
                            Clear Code
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default Security;
