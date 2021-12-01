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
    }
  }

  componentDidMount() {
    let text = "Geliyor gelmekte olan";
    let date = "2022-01-28T16:00:00.000Z";
    this.readData(date, text);
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

  readData(date, text) {   
    if (!date) {
      date = getNextDayOfWeek(new Date(), WeekDays.FRI, 17);
      if (!text) {
        text = "When's it again Friday?";
      }
    }
    this.setState({
      targetDate: new Date(date),
      text: text,
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
