import "defaults.css";
import "./tailwind.css";
import "./style.styl";
import "array-flat-polyfill";
import { memo } from "preact/compat";
import { arrayShuffle } from "@adriantombu/array-shuffle";
import { Component } from "preact";
import Intro from "./components/intro";
import Excerpts from "./components/excerpts";
import data from "../assets/data.json";

const SPLIT_REGEX = /[^\.!\?]+[\.!\?]+/g;

const essays = [
  {
    author: "Irina Evseenko",
    title: `Form follows 'X':<br/><span class="amour">a</span>nalysis of a trope`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Nadezhda Vorobieva",
    title: `Loading bars:<br/><span class="amour">d</span>esigning wait`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Lyudmila Petrova",
    title: `Militant <span class="amour">a</span>esthetics<br/>and group identities`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Valeriia Ivanova",
    title: `<span class="amour">M</span>imicry, transparency<br/>and repetition`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Anastasia Shmeleva",
    title: `Design for <span class="amour">p</span>lay:<br/>from physical to&nbsp;digital environments`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Maria Kharmandarian",
    title: `The <span class="amour">f</span>uture<br/>of language`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Elizaveta Stolyarova",
    title: `Silicon <span class="amour">V</span>alley ideology and reception<br/>of modernism in web design`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Alexandra Kravtsova",
    title: `3 cases of <span class="amour">p</span>ropaganda`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Alisa Kharas",
    title: `New types of written <span class="amour">c</span>ommunication`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Maria Khegay",
    title: `The role of social media in <span class="amour">b</span>ehavioral changes`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Ekaterina Slobodskaya",
    title: `Irony and design:<br/><span class="amour">s</span>ubvertising aesthetics`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Eva Chudina",
    title: `Make-up <span class="amour">a</span>rt:<br/>from beauty to body modification`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  }
];

const textsToSentences = texts => {
  return texts
    .map(t => t.content)
    .join("")
    .match(SPLIT_REGEX)
    .filter(s => s.split(/\s/g).length > 1)
    .map(s => s.split(""));
};

export default class App extends Component {
  state = {
    sentences: null
  };

  componentDidMount() {
    //this.setState({ sentences: data.sentences.map(s => s.split("")) });

    const storedSentences = window.localStorage.getItem("sentences");
    if (storedSentences) {
      this.setState({ sentences: JSON.parse(storedSentences) });
    } else {
      fetch(`https://api.are.na/v2/channels/txts-cuibefu45ra`)
        .then(cj => cj.json())
        .then(channelCont => {
          return channelCont.contents ? channelCont.contents.filter(ct => ct.class === "Text") : [];
        })
        .then(texts => {
          const sentences = arrayShuffle(textsToSentences(texts.flat(1).filter(Boolean)));
          this.setState({ sentences });
          window.localStorage.setItem("sentences", JSON.stringify(sentences));
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
  }

  render(props, { sentences }) {
    return (
      <div>
        <Intro />
        {sentences && (
          <Excerpts id="first" items={sentences.slice(0, 10)} backgroundColor="#BBFF29" />
        )}
        <div style={{ height: 200 }}>spacer</div>
        {sentences && (
          <Excerpts id="second" items={sentences.slice(10, 20)} backgroundColor="#A954FF" />
        )}
        <div style={{ height: 600 }}>spacer</div>
      </div>
    );
  }
}
