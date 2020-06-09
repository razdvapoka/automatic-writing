import "array-flat-polyfill";
import "defaults.css";

import "./style.styl";
import "./tailwind.css";

import { Component } from "preact";
import { arrayShuffle } from "@adriantombu/array-shuffle";
import { memo } from "preact/compat";

import React, { useState, useEffect, useCallback } from "react";

import Excerpts from "./components/excerpts";
import Intro from "./components/intro";
import List from "./components/list";
import data from "../assets/data.json";

const SPLIT_REGEX = /[^\.!\?]+[\.!\?]+/g;

const textsToSentences = texts => {
  return texts
    .map(t => t.content)
    .join("")
    .match(SPLIT_REGEX)
    .filter(s => s.split(/\s/g).length > 1)
    .map(s => s.split(""));
};

const App = props => {
  const [sentences, setSentences] = useState([]);
  const [essays, setEssays] = useState([]);
  useEffect(() => {
    //this.setState({ sentences: data.sentences.map(s => s.split("")) });

    const storedData = window.localStorage.getItem("data");
    if (storedData) {
      const { sentences, essays } = JSON.parse(storedData);
      setSentences(arrayShuffle(sentences));
      setEssays(arrayShuffle(essays));
    } else {
      fetch(`https://api.are.na/v2/channels/txts-cuibefu45ra`)
        .then(cj => cj.json())
        .then(channelCont => {
          return channelCont.contents ? channelCont.contents.filter(ct => ct.class === "Text") : [];
        })
        .then(texts => {
          const sentences = arrayShuffle(textsToSentences(texts.flat(1).filter(Boolean)));
          setSentences(sentences);

          const essays = texts.map(text => {
            const [name, slug] = text.title.split("|");
            return {
              slug,
              name,
              title: text.description
            };
          });
          setEssays(essays);
          window.localStorage.setItem("data", JSON.stringify({ sentences, essays }));
        });
      /*
    fetch("https://api.are.na/v2/channels/critical-digest").then(response => {
      response.json().then(content => {
        Promise.all([
          ...content.contents.map(c =>
            fetch(`https://api.are.na/v2/channels/${c.slug}`)
              .then(cj => cj.json())
              .then(channelCont => {
                return channelCont.contents
                  ? channelCont.contents.filter(ct => ct.class === "Text")
                  : [];
              })
          )
        ]).then(texts => {
          const sentences = arrayShuffle(textsToSentences(texts.flat(1).filter(Boolean)));
          this.setState({ sentences });
        });
      });
    });
    */
    }
  }, []);

  return (
    <div>
      <Intro />
      {sentences && <Excerpts id="first" items={sentences} backgroundColor="#BBFF29" />}
      <List listId="list-1" items={essays.slice(0, Math.floor(essays.length / 2))} />
      {sentences && <Excerpts id="second" items={sentences} backgroundColor="#A954FF" />}
      <List listId="list-2" items={essays.slice(Math.floor(essays.length / 2))} />
    </div>
  );
};

export default App;
