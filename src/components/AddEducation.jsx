import React, { Component } from "react";
import CancelBtn from "../ui/CancelBtn";
import SubmitBtn from "../ui/SubmitBtn";

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endDate: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEndDate = this.toggleEndDate.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = document.querySelector(".education.name");
    const degree = document.querySelector(".education.degree");
    const city = document.querySelector(".education.city");
    const state = document.querySelector(".education.state");
    const zipcode = document.querySelector(".education.zipcode");
    const startMonth = document.querySelector(".education.start-month");
    const startYear = document.querySelector(".education.start-year");
    const endMonth = document.querySelector(".education.end-month");
    const endYear = document.querySelector(".education.end-year");
    const present = document.querySelector(".education.present");

    const result = {
      name: name.value,
      degree: degree.value,
      city:
        city.value.split("")[0].toUpperCase() +
        city.value.split("").slice(1).join(""),
      state: state.value.toUpperCase(),
      zipcode: zipcode.value,
      startMonth: startMonth.value,
      startYear: startYear.value,
      endMonth: endMonth.value,
      endYear: endYear.value,
      present: present.checked,
    };

    if (!this.props.params) {
      this.props.addEducation(result);
    } else {
      this.props.editEducation(this.props.params, result);
    }

    name.value = "";
    city.value = "";
    state.value = "";
    zipcode.value = "";
    degree.value = "";
    startMonth.value = "";
    startYear.value = "";
    endMonth.value = "";
    endYear.value = "";
    present.value = "";

    this.props.clearParams();
    this.props.handleToggle();
  }

  toggleEndDate(e) {
    const result = e.target.checked === true ? false : true;
    this.setState({
      endDate: result,
    });
  }

  render() {
    const { handleToggle, params } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>
            {(params && "edit education:") || "add new education:"}
          </legend>
          <input
            defaultValue={params && params.name}
            className="percent-45 education name"
            type="text"
            name="education-name"
            placeholder="School name"
            required
          />
          <input
            defaultValue={params && params.degree}
            className="percent-45 education degree"
            type="text"
            name="education-degree"
            placeholder="Title of study"
            required
          />
          <div className="location percent-45">
            <input
              defaultValue={params && params.city}
              className="percent-45 education city"
              type="text"
              name="education-city"
              placeholder="City"
              pattern="^[a-zA-Z]+$"
            />
            <input
              defaultValue={params && params.state}
              className="percent-22 education state"
              type="text"
              name="education-state"
              placeholder="State"
              pattern="^[a-zA-Z]{2}$"
            />
            <input
              defaultValue={params && params.zipcode}
              className="percent-22 education zipcode"
              type="text"
              name="education-zipcode"
              placeholder="Zipcode"
              pattern="^[0-9]{5}$"
            />
          </div>
          <div className="date-div">
            <div className="start-date">
              <h4>start date:</h4>
              <input
                defaultValue={params && params.startMonth}
                className="education start-month"
                type="text"
                name="education-start-month"
                placeholder="Month"
                pattern="^(0?[1-9]|1{1}[0-2]{1})$"
                required
              />
              <input
                defaultValue={params && params.startYear}
                className="education start-year"
                type="text"
                name="education-start-year"
                placeholder="Year"
                pattern="^[0-9]{4}$"
                required
              />
            </div>
            <div className="end-date">
              <h4>end date:</h4>
              <input
                defaultValue={params && params.endMonth}
                className="education end-month"
                type="text"
                name="education-end-month"
                placeholder="Month"
                pattern="^(0?[1-9]|1{1}[0-2]{1})$"
                disabled={this.state.endDate ? false : true}
              />
              <input
                defaultValue={params && params.endYear}
                className="education end-year"
                type="text"
                name="education-end-year"
                placeholder="Year"
                pattern="^[0-9]{4}$"
                disabled={this.state.endDate ? false : true}
              />
              <p>or</p>
              <label htmlFor="present">Present: </label>
              <input
                id="present"
                type="checkbox"
                name="education-present"
                className="education present"
                onChange={this.toggleEndDate}
                defaultChecked={params && params.present ? true : false}
              />
            </div>
          </div>
        </fieldset>
        <div className="btn-container">
          <SubmitBtn params={params} />
          <CancelBtn handleToggle={handleToggle} />
        </div>
      </form>
    );
  }
}

export default AddEducation;
