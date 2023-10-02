import styled, { createGlobalStyle } from "styled-components";

export const AuthStyle = createGlobalStyle`
  *, ::after, ::before{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body{
    font-family: 'Courier New', Courier, monospace;
    height: 100%;
    width: 100%;
    background-color: black;
    color: white;
  }

  img{
    max-width: 100%;
  }
`

export const LoginStyled = styled.main`
    width: 90vw;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: start;
    margin-top: 3%;
    align-items: center;
    flex-direction: column;
    text-align: center;
    font-family: 'Courier New', Courier, monospace;

    input{
        padding: 1em;
        margin-bottom: 2em;
    }

    button{
        padding: .5em;
        background-color: transparent;
        border: 1px solid white;
        color: white;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 2em;
        transition: all ease 100ms;
    }

    button:hover{
        background-color: white;
        color: black;
    }

    h1{
        padding: 1em;
    }

    .alert{
        padding: .5em;
        font-size: 1.5em;
        border-radius: 8px;
        background-color: red;
        color: white;
        display: ${(props) => props.showAlert ? 'block' : 'none' }
    }
    a{
      color: white;
    }

`