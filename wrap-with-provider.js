import React from "react"

import Helmet from "react-helmet"

import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import blue from "@material-ui/core/colors/blue"
import grey from "@material-ui/core/colors/grey"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: blue["A200"],
    },
  },
})

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Helmet>
        {element}
      </ThemeProvider>
    </>
  )
}
