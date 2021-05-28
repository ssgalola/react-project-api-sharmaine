import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [quote, setQuote] = useState("Please choose a category below.");
  const [author, setAuthor] = useState("");

  const Header = (props) => (
    <div className="header">
      <h1>{props.name}</h1>
    </div>
  );

  const Content = (props) => (
    <div className="content box">
      <div>
        <p>{props.quote}</p>
      </div>
      <div>
        <p>{props.author}</p>
      </div>
    </div>
  );

  const BibleVerse = (props) => (
    <button
      onClick={() => {
        getBibleVerse();
        setQuote("Fetching quote...");
        setAuthor("");
      }}
      className="bible-verse button"
    >
      {props.text}
    </button>
  );

  const InspirationalQuote = (props) => (
    <button
      onClick={() => {
        getInspirationalQuote();
        setQuote("Fetching quote...");
        setAuthor("");
      }}
      className="inspirational-quote button"
    >
      {props.text}
    </button>
  );

  const Joke = (props) => (
    <button
      onClick={() => {
        getJoke();
        setQuote("Fetching quote...");
        setAuthor("");
      }}
      className="joke button"
    >
      {props.text}
    </button>
  );

  const RandomQuote = (props) => (
    <button
      onClick={() => {
        getRandomQuote();
        setQuote("Fetching quote...");
        setAuthor("");
      }}
      className="random-quote button"
    >
      {props.text}
    </button>
  );

  function getBibleVerse() {
    fetch("https://uncovered-treasure-v1.p.rapidapi.com/random", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "995e4cdf72msh3f7af42ded5d529p172736jsnb0178d68c3d9",
        "x-rapidapi-host": "uncovered-treasure-v1.p.rapidapi.com"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setQuote('"' + data.results[0].text + '"');
        setAuthor(data.results[0].scriptures[0]);
      });
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function getInspirationalQuote() {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let randomNumber = getRandomInt(1, 1643);
        setQuote('"' + data[randomNumber].text + '"');
        setAuthor(data[randomNumber].author);
      });
  }

  function getJoke() {
    fetch(
      "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setQuote('"' + data.joke + '"');
        let jokeCategory = "Joke Category: " + data.category;
        setAuthor(jokeCategory);
      });
  }

  function getRandomQuote() {
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "995e4cdf72msh3f7af42ded5d529p172736jsnb0178d68c3d9",
        "x-rapidapi-host": "quotes15.p.rapidapi.com"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setQuote('"' + data.content + '"');
        setAuthor(data.originator.name);
      });
  }

  return (
    <div className="App">
      <Header name="Treasure Quotes"></Header>
      <Content quote={quote} author={author}></Content>

      <BibleVerse text="Bible Verse"></BibleVerse>
      <InspirationalQuote text="Inspirational Quote"></InspirationalQuote>
      <Joke text="Joke"></Joke>
      <RandomQuote text="Random Quote"></RandomQuote>
    </div>
  );
}
