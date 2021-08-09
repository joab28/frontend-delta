import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";

const theme = extendTheme({
  //styles: {
  //global: {
  // styles for the `body`
  //  body: {
  //    bg: "#00acae",
  // },
  //},
  //},
  components: {
    Button: {
      variants: {
        solid: (props) => ({
          bg: props.colorMode === "dark" ? "blue.300" : "blue.200",
        }),
      },
    },
    Input: {
      variants: {
        outline: (props) => ({
          field: {
            bg: props.colorMode === "dark" ? "blue.300" : "white",
          },
        }),
      },
    },
  },
});
ReactDOM.render(
  <>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="light" key="chakra-ui-no-flash" />
      <App />
    </ChakraProvider>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
