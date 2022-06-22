import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getNextDayOfWeek, WeekDays } from "../logic/dates.js"
import Counter from "./Counter";
import Thought from "./Thought";
import "./App.css";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      targetDate: new Date(),
      text: "",
      datePickerDisabled: true
    }
  }

  componentDidMount() {
    this.readData();
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <DatePicker
            showTimeSelect
            timeIntervals={1}
            timeFormat="HH:mm"
            dateFormat="PP - HH:mm"
            selected={this.state.targetDate}
            onChange={date => this.onChange(date)}
            disabled = {this.state.datePickerDisabled}
          />
        </div>
        <div className="center">
          <div className="content">
            <Thought text={this.state.text} />
            <Counter targetDate={this.state.targetDate} />
          </div>
        </div>
      </div>
    );
  }

  readData() {
    let text = "Geliyor gelmekte olan";
    const urlParams = new URLSearchParams(window.location.search);
    let date = urlParams.get('date') ? urlParams.get('date') : "2023-05-28T18:00:00.000Z";
    let friday = urlParams.get('f') === "1" ? true : false;
    if (friday) {
      date = getNextDayOfWeek(new Date(), WeekDays.FRI, 17);
      text = "When's it again Friday?";
    }
    this.setState({
      targetDate: new Date(date),
      text: text,
      datePickerDisabled: friday
    });
  }

  onChange(date) {
    if (window.history.pushState) {
      const newURL = new URL(window.location.href);
      newURL.search = `date=${date.toISOString()}`;
      window.history.pushState({ path: newURL.href }, '', newURL.href);
    }
    this.readData();
  }
}
