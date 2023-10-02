import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, ::after, ::before{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body{
    font-family: 'Courier New', Courier, monospace;
  }

  img{
    max-width: 100%;
  }
  
  a{
    text-decoration: none;
    color: black;
  }
`

export default GlobalStyle