/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { React, Component, useState, useEffect } from "react";
import Image from "next/image";

import SimpleLayout from "../components/simplelayout";
import styles from "../styles/index.module.scss";
import { db } from "../util/firebase";

export default function Test() {
  const [cardContent, setCardContent] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const namesList1 = [
    {
      name: "Matt Johnson",
    },
    {
      name: "Bart Paden",
    },
    {
      name: "Ryan Doss",
    },
    {
      name: "Jared Malcolm",
    },
  ];
  const namesList2 = [
    {
      name: "Matt Johnson",
    },
    {
      name: "Bart Paden",
    },
    {
      name: "Jordan Heigle",
    },
    {
      name: "Tyler Viles",
    },
  ];
  const [namesList, setNamesList] = useState([]);

  const handleNamesListClick = () => {
    // name list is clicked
    setIsClicked(true);

    // alert user that button has already been clicked
    alert("List of names have been populated!");

    // remove duplicates from list
    const list = namesList1.concat(namesList2);
    setNamesList(
      [...new Set(list.map((obj) => JSON.stringify(obj)))].map((str) =>
        JSON.parse(str)
      )
    );
  };
  useEffect(() => {
    // get static data from firestore collection
    db.collection("homeCards").onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      // console.log(postData);
      setCardContent(postData[0]);
    });
  }, []);

  // get URL pathname
  const pathName = useRouter().pathname;

  return (
    <SimpleLayout pathName={pathName}>
      {/* Cards */}
      <div className={"container " + styles.container}>
        <div className={styles.cardContainer}>
          {/* Card 1 */}
          <section className={styles.contentCard}>
            <div className={styles.cardImg}>
              <article className={styles.article}>
                <img src={"/Talkie.png"} alt="talkie" />
              </article>
            </div>
            <div className={styles.cardDetails}>
              <h1 className={styles.cardTitle}>{cardContent.cardTitle1}</h1>
              <p className={styles.cardContent}>{cardContent.cardContent1}</p>
            </div>
            <div className={styles.cardBtnContainer}>
              <article className={styles.article}>
                <button className={styles.cardBtn}>Learn More</button>
              </article>
            </div>
          </section>
          {/* Card 2 */}
          <section className={styles.contentCard}>
            <div className={styles.cardImg}>
              <article className={styles.article}>
                <img src={"/Rabbit.png"} alt="talkie" />
              </article>
            </div>
            <div className={styles.cardDetails}>
              <h1 className={styles.cardTitle}>{cardContent.cardTitle2}</h1>
              <p className={styles.cardContent}>{cardContent.cardContent2}</p>
            </div>
            <div className={styles.cardBtnContainer}>
              <article className={styles.article}>
                <button className={styles.cardBtn}>Learn More</button>
              </article>
            </div>
          </section>
          {/* Card 3 */}
          <section className={styles.contentCard}>
            <div className={styles.cardImg}>
              <article className={styles.article}>
                <img src={"/Shield.png"} alt="talkie" />
              </article>
            </div>
            <div className={styles.cardDetails}>
              <h1 className={styles.cardTitle}>{cardContent.cardTitle3}</h1>
              <p className={styles.cardContent}>{cardContent.cardContent3}</p>
            </div>
            <div className={styles.cardBtnContainer}>
              <article className={styles.article}>
                <button className={styles.cardBtn}>Learn More</button>
              </article>
            </div>
          </section>
        </div>
        {/* Names List */}
        <div className={styles.namesContainer}>
          <h1 className="headingOneTitle">Heading One</h1>
          <div className="headingOneTitleUnderline"></div>
          <p className={styles.namesDescription}>
            Click{" "}
            <span className={styles.namesLink} onClick={handleNamesListClick}>
              this link
            </span>{" "}
            to show unordered list of 2 Javascript objects with duplicates
            removed
          </p>
          {isClicked && (
            <ul>
              {namesList.map((name) => (
                <div key={name.name}>
                  <li className={styles.nameItem}>{name.name}</li>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SimpleLayout>
  );
}
