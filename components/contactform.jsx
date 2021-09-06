import React from "react";
import ReactDOM from "react-dom";
import "bootstrap-css-only";
import "react-bootstrap";
import axios from "axios";

import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Col,
  Row,
  Button,
} from "react-bootstrap";

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      errors: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  handleInputChange(event) {
    var key = event.target.name;
    var value = event.target.value;
    var obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  handleSubmit(event) {
    event.preventDefault();

    //VALIDATE
    var errors = [];

    //email
    const expression = /\S+@\S+/;
    var validEmail = expression.test(String(this.state.email).toLowerCase());

    if (!validEmail) {
      errors.push("email");
    }

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return false;
    } else {
      alert("Form has been submitted!");
    }
  }

  onSubmit(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://api.mwi.dev/contact",
      data: this.state,
    }).then((response) => {
      if (response.data.status === "success") {
        alert("Message Sent.");
        this.resetForm();
      } else if (response.data.status === "fail") {
        alert("Message failed to send.");
      }
    });
  }

  render() {
    return (
      <Form className="row" onSubmit={this.onSubmit.bind(this)} method="POST">
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="First Name"
              className="mb-3 formItem"
              name="firstName"
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Last name"
              className="mb-3 formItem"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Title"
              className="mb-3 formItem"
            />
          </Col>
          <Col>
            <Form.Control
              type="email"
              placeholder="Email"
              className={
                this.hasError("email")
                  ? "form-control border-danger mb-3 formItem"
                  : "form-control mb-3 formItem"
              }
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <span
              className={this.hasError("email") ? "formEmailError" : "hidden"}
            >
              Required
            </span>
          </Col>
        </Row>
        <Row className="mb-3 col-md-12">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Message"
            className={
              this.hasError("email") ? "formItem formMessage" : "formItem"
            }
          />
        </Row>
        <div className="col-lg-12 formBtnContainer">
          <button
            className={
              this.hasError("email") ? "formBtn formBtnError" : "formBtn"
            }
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </Form>
    );
  }
}
