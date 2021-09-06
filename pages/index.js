import { useRouter } from "next/router";
import { React, Component, useState, useEffect } from "react";
import Image from "next/image";

import Navbar from "../components/navbar";

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

      <div className="container">
        {/* Cards */}
        <div className="cardContainer">
          {cardContent.map((item) => (
            <>
              <div key={item.id}>
                <section className="contentCard">
                  <div className="cardImg">
                    <article>
                      <img
                        src={
                          item.id === 1
                            ? "Talkie.png"
                            : item.id === 2
                            ? "Rabbit.png"
                            : "Shield.png"
                        }
                        alt={item.title}
                      />
                    </article>
                  </div>
                  <div className="cardDetails">
                    <h1 className="cardTitle">{item.title}</h1>
                    <p className="cardContent">{item.content}</p>
                  </div>
                  <div className="cardBtnContainer">
                    <article>
                      <button className="cardBtn">Learn More</button>
                    </article>
                  </div>
                </section>
              </div>
            </>
          ))}
        </div>

        {/* Names List */}
        <div className="namesContainer">
          <h1 className="headingOneTitle">Heading One</h1>
          <div className="headingOneTitleUnderline"></div>
          <p className="namesDescription">
            Click{" "}
            <span className="namesLink" onClick={handleNamesListClick}>
              this link
            </span>{" "}
            to show unordered list of 2 Javascript objects with duplicates
            removed
          </p>
          {isClicked && (
            <ul>
              {namesList.map((name) => (
                <div key={name.name}>
                  <li className="nameItem">{name.name}</li>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
