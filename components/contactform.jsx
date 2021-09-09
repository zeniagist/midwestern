import React from "react";
import "bootstrap-css-only";
import "react-bootstrap";
import axios from "axios";
import { Form, Col, Row } from "react-bootstrap";
import styles from "../styles/contact.module.scss";

import { db } from "../utils/firebase";

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
      console.log(this.state);

      let input = {};

      input["firstName"] = "";

      input["lastName"] = "";

      input["title"] = "";

      input["email"] = "";

      input["message"] = "";

      this.setState({ input: input });
      console.log(input);

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

  // post contact form data to API
  onPost(e) {
    e.preventDefault();
    // db.collection("contacts")
    //   .add({
    //     name: name,
    //     email: email,
    //     message: message,
    //   })
    //   .then(() => {
    //     setLoader(false);
    //     alert("Your message has been submitted👍");
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //     setLoader(false);
    //   });
    // axios({
    //   method: "POST",
    //   url: "https://api.mwi.dev/contact",
    //   data: this.state,
    // }).then((response) => {
    //   if (response.data.status === "success") {
    //     alert("Message Sent.");
    //     this.resetForm();
    //   } else if (response.data.status === "fail") {
    //     alert("Message failed to send.");
    //   }
    // });
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
                  name="name"
                  value={this.state.input.firstName}
                  className="form-control"
                  placeholder="First Name"
                  id="firstName"
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={this.state.input.lastName}
                  className="form-control"
                  placeholder="Last Name"
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
                  name="name"
                  value={this.state.input.title}
                  className="form-control"
                  placeholder="Title"
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
                    this.state.errors.email ? styles.formEmailError : "hidden"
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
              className={
                this.state.errors.email
                  ? "form-control " + styles.formMessage
                  : "form-control"
              }
              rows={5}
              id="message"
            />
          </div>

          <div className="formBtnContainer">
            <input
              type="submit"
              value="Submit"
              className={
                this.state.errors.email ? "formBtn formBtnError" : "formBtn"
              }
              onSubmit={this.onPost}
            />
          </div>
        </Form>
      </div>
    );
  }
}

export default ContactForm;

// import React, { useState } from "react";
// import "bootstrap-css-only";
// import "react-bootstrap";
// import axios from "axios";

// import { Form, Col, Row } from "react-bootstrap";

// import styles from "../styles/contact.module.scss";
// // import { firestore } from "../utils/firebase";
// import { db } from "../utils/firebase";

// const ContactForm = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [title, setTitle] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     db.collection("users")
//       .add({
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         title: title,
//         message: message,
//       })
//       .catch((err) => console.log(err));

//     setFirstName("");
//     setLastName("");
//     setTitle("");
//     setEmail("");
//     setMessage("");
//   };
//   return (
//     <div>
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col>
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="firstName"
//                 id="firstName"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 placeholder="First Name"
//                 maxLength="20"
//               />
//             </div>
//           </Col>
//           <Col>
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="lastName"
//                 id="lastName"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 placeholder="Last Name"
//                 maxLength="20"
//               />
//             </div>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <div className="form-group">
//               <input
//                 type="text"
//                 name="title"
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Title"
//                 maxLength="50"
//               />
//             </div>
//           </Col>
//           <Col>
//             <div className="form-group">
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//               />
//             </div>
//           </Col>
//         </Row>
//         <div className="form-group">
//           <textarea
//             name="message"
//             value={message}
//             placeholder="Message"
//             className="form-control"

//             rows={5}
//             id="message"
//           />
//         </div>
//         <div className={styles.formBtnContainer}>
//           <input
//             type="submit"
//             value="Submit"
//             // className={
//             //   this.state.errors.email
//             //     ? "formBtn " + styles.formBtnError
//             //     : "formBtn"
//             // }
//           />
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default ContactForm;
