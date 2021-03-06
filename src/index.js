import "array-flat-polyfill";
import "defaults.css";

import "./style.styl";
import "./tailwind.css";

import { Component } from "preact";
import { arrayShuffle } from "@adriantombu/array-shuffle";
import { memo } from "preact/compat";

import React, { useState, useEffect, useCallback } from "react";

import Excerpts from "./components/excerpts";
import Footer from "./components/footer";
import Intro from "./components/intro";
import List from "./components/list";
import data from "../assets/data.json";

const SPLIT_REGEX = /[^\.!\?]+[\.!\?]+/g;

const textsToSentences = texts => {
  const sentences = texts
    .map(t => {
      const [name, slug] = t.title.split("|");
      return {
        sentences: t.content
          .match(SPLIT_REGEX)
          .filter(sentence => sentence.split(/\s/g).length > 1),
        slug
      };
    })
    .reduce(
      (agg, item) => [
        ...agg,
        ...item.sentences.map(sentence => ({ sentence: sentence.split(""), slug: item.slug }))
      ],
      []
    );
  return sentences;
};

const App = props => {
  const [sentences, setSentences] = useState([]);
  const [essays, setEssays] = useState([]);
  useEffect(() => {
    const storedData = window.localStorage.getItem("data");
    if (storedData) {
      const { sentences, essays } = JSON.parse(storedData);
      setSentences(arrayShuffle(sentences));
      setEssays(essays);
    } else {
      fetch(`https://api.are.na/v2/channels/txts-cuibefu45ra`)
        .then(cj => cj.json())
        .then(channelCont => {
          return channelCont.contents ? channelCont.contents.filter(ct => ct.class === "Text") : [];
        })
        .then(texts => {
          const sentences = arrayShuffle(textsToSentences(texts.flat(1).filter(Boolean)));
          setSentences(sentences);

          const essays = texts
            .map(text => {
              const [name, slug] = text.title.split("|");
              return {
                slug,
                name,
                title: text.description
              };
            })
            .reverse();
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
      {sentences.length > 0 && <Excerpts id="first" items={sentences} backgroundColor="#BBFF29" />}
      {essays.length > 0 && (
        <List listId="list-1" items={essays.slice(0, Math.floor(essays.length / 2))} />
      )}
      {sentences.length > 0 && <Excerpts id="second" items={sentences} backgroundColor="#A954FF" />}
      {essays.length > 0 && (
        <List listId="list-2" items={essays.slice(Math.floor(essays.length / 2))} />
      )}
      <Footer />
      {/*
       */}
    </div>
  );
};

export default App;
