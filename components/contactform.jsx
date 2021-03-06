import React from "react";
import "bootstrap-css-only";
import "react-bootstrap";
import axios from "axios";

import { Form, Col, Row } from "react-bootstrap";

import styles from "../styles/contact.module.scss";
import { db } from "../util/firebase";

class ContactForm extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {},

      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // get contact form input values
  handleChange(event) {
    let input = this.state.input;

    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  // submit input values
  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log(this.state.input);

      let input = {};

      input["firstName"] = "";

      input["lastName"] = "";

      input["title"] = "";

      input["email"] = "";

      input["message"] = "";

      this.setState({ input: input });

      // post contact form data to firebase
      db.collection("contacts").add({
        firstName: this.state.input.firstName,
        lastName: this.state.input.lastName,
        title: this.state.input.title,
        email: this.state.input.email,
        message: this.state.input.message,
      });

      alert("Your form has been submitted!");
    }
  }

  // validate email address
  validate() {
    let input = this.state.input;

    let errors = {};

    let isValid = true;

    if (!input["email"]) {
      isValid = false;

      errors["email"] = "Required";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(input["email"])) {
        isValid = false;

        errors["email"] = "Please enter valid email address.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  value={this.state.input.firstName}
                  className="form-control"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  id="firstName"
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  value={this.state.input.lastName}
                  className="form-control"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  id="lastName"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  value={this.state.input.title}
                  className="form-control"
                  placeholder="Title"
                  onChange={this.handleChange}
                  id="title"
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  value={this.state.input.email}
                  onChange={this.handleChange}
                  className={
                    this.state.errors.email
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter email"
                  id="email"
                />
                <span
                  className={
                    this.state.errors.email
                      ? styles.formEmailError
                      : styles.hidden
                  }
                >
                  Required
                </span>
              </div>
            </Col>
          </Row>

          <div className="form-group">
            <textarea
              name="message"
              value={this.state.input.comment}
              placeholder="Message"
              onChange={this.handleChange}
              className={
                this.state.errors.email
                  ? "form-control " + styles.formMessage
                  : "form-control"
              }
              rows={5}
              id="message"
            />
          </div>

          <div className={styles.formBtnContainer}>
            <input
              type="submit"
              value="Submit"
              className={
                this.state.errors.email ? styles.formBtnError : styles.formBtn
              }
              // onSubmit={this.onPost}
            />
          </div>
        </Form>
      </div>
    );
  }
}

export default ContactForm;
