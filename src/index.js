import "defaults.css";
import "./style.styl";
import "array-flat-polyfill";
import { Component } from "preact";

const essays = [
  {
    author: "Irina Evseenko",
    title: `Form follows 'X':<br/><span class="amour">a</span>nalysis of a trope`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Nadezhda Vorobieva",
    title: `Loading bars:<br/>designing wait`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Lyudmila Petrova",
    title: `Militant aesthetics<br/>and group identities`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Valeriia Ivanova",
    title: `Mimicry, transparency<br/>and repetition`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Anastasia Shmeleva",
    title: `Design for play:<br/>from physical to digital environments`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Maria Kharmandarian",
    title: `The future<br/>of language`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Elizaveta Stolyarova",
    title: `Silicon Valley ideology and reception<br/>of modernism in web design`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Alexandra Kravtsova",
    title: `3 cases of propaganda`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Alisa Kharas",
    title: `New types of written communication`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Maria Khegay",
    title: `The role of social media in behavioral changes`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Ekaterina Slobodskaya",
    title: `Irony and design:<br/>subvertising aesthetics`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Eva Chudina",
    title: `Make-up art:<br/>from beauty to body modification`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  }
];

const colors = ["swamp", "blood", "witch", "moss"];
const randomArrItem = arr => arr[Math.floor(Math.random() * arr.length)];

class Essay extends Component {
  state = {
    color: null,
    isHovered: false
  };

  render({ essay }, { color, isHovered }) {
    return (
      <a
        class="essay"
        onMouseEnter={() => {
          this.setState({
            isHovered: true,
            color: randomArrItem(colors.filter(c => c !== color))
          });
        }}
        onMouseLeave={() => {
          this.setState({
            isHovered: false
          });
        }}
      >
        <div class="l" style={{ marginLeft: essay.shift }}>
          {essay.author}
        </div>
        <h2
          class={`xxl center ${isHovered ? color : ""}`}
          dangerouslySetInnerHTML={{ __html: essay.title }}
        />
      </a>
    );
  }
}

export default class App extends Component {
  state = {
    texts: [],
    excerpt: [],
    lastExcerptCharIndex: -1,
    interval: null,
    lastExcerptColor: null
  };

  typeExcerpt = () => {
    const splitRegex = /[^\.!\?]+[\.!\?]+/g;
    const text = randomArrItem(this.state.texts);
    const sentences = text.content.match(splitRegex);
    const filteredSentences = sentences && sentences.filter(s => s.split(/\s/g).length > 1);
    if (filteredSentences && filteredSentences.length > 0) {
      const excerpt = randomArrItem(filteredSentences);
      this.setState({
        lastExcerptColor: randomArrItem(colors.filter(c => c !== this.state.lastExcerptCharIndex)),
        excerpt: excerpt.split(""),
        interval: window.setInterval(() => {
          if (this.state.lastExcerptCharIndex < excerpt.length - 1) {
            this.setState({
              lastExcerptCharIndex: this.state.lastExcerptCharIndex + 1
            });
          } else {
            window.clearInterval(this.state.interval);
            this.setState({ interval: null });
            window.setTimeout(this.detypeExcerpt, 5000);
          }
        }, 20)
      });
    } else {
      this.typeExcerpt();
    }
  };

  detypeExcerpt = () => {
    this.setState({
      interval: window.setInterval(() => {
        if (this.state.lastExcerptCharIndex >= 0) {
          this.setState({
            lastExcerptCharIndex: this.state.lastExcerptCharIndex - 1
          });
        } else {
          window.clearInterval(this.state.interval);
          this.setState({ interval: null });
          this.typeExcerpt();
        }
      }, 10)
    });
  };

  componentDidMount() {
    fetch("https://api.are.na/v2/channels/critical-digest").then(response => {
      response.json().then(content => {
        Promise.all(
          content.contents.map(c =>
            fetch(`https://api.are.na/v2/channels/${c.slug}`)
              .then(cj => cj.json())
              .then(channelCont => {
                return channelCont.contents
                  ? channelCont.contents.filter(ct => ct.class === "Text")
                  : [];
              })
          )
        ).then(texts => {
          this.setState(
            {
              texts: texts.flat(1)
            },
            this.typeExcerpt
          );
        });
      });
    });
  }

  render(props, { excerpt, lastExcerptCharIndex }) {
    return (
      <div>
        <div class="excerpts m">
          <div class={this.state.lastExcerptColor}>
            {excerpt.map((char, index) => (
              <span style={{ opacity: index <= lastExcerptCharIndex ? 1 : 0 }}>{char}</span>
            ))}
          </div>
        </div>
        <header class="xs uppercase">
          <a>About</a>
          <h1 class="s">
            Automatic <span class="amour">W</span>riting
          </h1>
          <a>Readings</a>
        </header>
        <main>
          {essays.map((essay, index) => (
            <Essay essay={essay} key={index} />
          ))}
        </main>
        <footer class="xs uppercase">
          <div>Autumn Semester 19/20</div>
          <div>C&CS module</div>
          <div>BHSAD (Britanka)</div>
          <div>
            developed by&nbsp;
            <a href="https://sergeyzakharov.dev" target="_blank">
              Sergey Zakharov
            </a>
          </div>
          <div>
            Taught and Designed by&nbsp;
            <a href="https://ermolaeva.co" target="_blank">
              Tanya Ermolaeva
            </a>
          </div>
        </footer>
      </div>
    );
  }
}
