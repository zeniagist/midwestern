import { useRouter } from "next/router";
import { React, Component, useState, useEffect } from "react";
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";

import Navbar from "../components/navbar";
import SimpleLayout from "../components/simplelayout";
import ContactForm from "../components/contactform";
import styles from "../styles/contact.module.scss";
import { db } from "../util/firebase";

export default function Contact() {
  const [contactInfo, setContactInfo] = useState([]);
  const [contactForm, setContactForm] = useState([]);

  useEffect(() => {
    // get static data from firestore cont
    db.collection("contactpage").onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      setContactInfo(postData[0]);
      setContactForm(postData[1]);
    });
  }, []);

  // get URL pathname
  const pathName = useRouter().pathname;

  return (
    <SimpleLayout pathName={pathName}>
      <main className={styles.main}>
        {/* Contact Info */}
        <div className={styles.contactInfoContainer}>
          <div className={styles.infoContainer}>
            <h1 className="headingOneTitle">{contactInfo.contactInfoTitle}</h1>
            <div className="headingOneTitleUnderline"></div>
            <p className={styles.contactInfoContent}>
              {contactInfo.contactInfoContent}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.contactFormContainer}>
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>{contactForm.contactFormTitle}</h2>
            <ContactForm />
          </div>
        </div>
      </main>
    </SimpleLayout>
  );
}
