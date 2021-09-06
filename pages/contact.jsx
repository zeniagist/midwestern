import { useRouter } from "next/router";
import { React, Component, useState, useEffect } from "react";
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";

import Navbar from "../components/navbar";
import ContactForm from "../components/contactform";

export default function Contact() {
  const [contactInfo, setContactInfo] = useState([]);
  const [contactForm, setContactForm] = useState([]);

  // get JSON contact info content
  useEffect(() => {
    let url = "https://api.mwi.dev/content/contact";

    // contact content
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setContactInfo(data.data[0]);
        setContactForm(data.data[0].page);
      });
  }, []);

  // get URL pathname
  const pathName = useRouter().pathname;

  return (
    <>
      <Navbar pathName={pathName} />
      <main className="main">
        {/* Contact Info */}
        <div className="contactInfoContainer">
          <div className="infoContainer">
            <h1 className="headingOneTitle">{contactInfo.title}</h1>
            <div className="headingOneTitleUnderline"></div>
            <p className="contactInfoContent">{contactInfo.content}</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contactFormContainer">
          <div className="formContainer">
            <h2 className="formTitle">{contactForm.name}</h2>
            <ContactForm />
          </div>
        </div>
      </main>
    </>
  );
}
