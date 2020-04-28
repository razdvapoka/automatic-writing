const ROOT_FONT_SIZE = 32;

const pxToRem = px => `${px / ROOT_FONT_SIZE}rem`;

const sequence = length => Array.from(Array(length).keys());

const spacing = sequence(21).reduce(
  (s, i) => ({
    ...s,
    [i]: pxToRem(i * 5)
  }),
  {}
);

module.exports = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
    colors: {
      black: "#111111",
      white: "#ffffff",
      dark: "#111111",
      darkgrey: "#909090",
      lightgrey: "#c4c4c4",
      darkgreyBG: "#C9C9C9",
      greyBG: "#EDE9E9",
      lightgreyBG: "#FFFDFD",
      acidgreen: "#bbff29",
      acidpurple: "#a954ff",
      acidpine: "#00FF66"
    },
    spacing
  }
};
