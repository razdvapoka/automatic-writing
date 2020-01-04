import "defaults.css";
import "./style.styl";
import { Component } from "preact";

const essays = [
  {
    author: "Maria Kharmandaryan",
    title: `The paradoxical <span class="amour">n</span>ature of visual language`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Maria Kharmandaryan",
    title: `design and <span class="amour">p</span>lay:<br/> childhood reinvented`,
    slug: "essay-1",
    shift: `${Math.floor(Math.random() * 50)}%`
  },
  {
    author: "Maria Kharmandaryan",
    title: `form follows x:<br/><span class="amour">a</span>nalysis of a trope`,
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
  render() {
    return (
      <div>
        <header class="m">
          <a>About</a>
          <h1 class="xl">
            Automatic <span class="amour">W</span>riting
          </h1>
          <a>Readings</a>
        </header>
        <main>
          {essays.map((essay, index) => (
            <Essay essay={essay} key={index} />
          ))}
        </main>
        <footer class="l">
          <div class="footer-top">
            <div>Autumn Semester 19/20</div>
            <div>C&CS module</div>
            <div>BHSAD (Britanka)</div>
          </div>
          <div class="credits center">
            <div>
              <div>development</div>
              <a href="https://sergeyzakharov.dev" target="_blank">
                Sergey Zakharov
              </a>
            </div>
            <div>
              <div>Taught and Designed by</div>
              <a href="https://ermolava.co" target="_blank">
                Tanya Ermolaeva
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
