/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { React, Component, useState, useEffect } from "react";
import Image from "next/image";

import Navbar from "../components/navbar";
import styles from "../styles/index.module.scss";

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

  // get JSON card content
  useEffect(() => {
    let url = "https://api.mwi.dev/content/home";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCardContent(data.data);
      });
  }, []);

  // get URL pathname
  const pathName = useRouter().pathname;

  return (
    <>
      <Navbar pathName={pathName} />

      <div className={"container " + styles.container}>
        {/* Cards */}
        <div className={styles.cardContainer}>
          {cardContent.map((item) => (
            <>
              <div key={item.id}>
                <section className={styles.contentCard}>
                  <div className={styles.cardImg}>
                    <article className={styles.article}>
                      <img
                        src={
                          item.id === 1
                            ? "/Talkie.png"
                            : item.id === 2
                            ? "/Rabbit.png"
                            : "/Shield.png"
                        }
                        alt={item.title}
                      />
                    </article>
                  </div>
                  <div className={styles.cardDetails}>
                    <h1 className={styles.cardTitle}>{item.title}</h1>
                    <p className={styles.cardContent}>{item.content}</p>
                  </div>
                  <div className={styles.cardBtnContainer}>
                    <article className={styles.article}>
                      <button className={styles.cardBtn}>Learn More</button>
                    </article>
                  </div>
                </section>
              </div>
            </>
          ))}
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
    </>
  );
}
