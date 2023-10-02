import styled from 'styled-components'

export const StyledNav = styled.nav`
    width: 100%;
    max-height: 10vh;
    height: 100%;
    padding: 1em;
    background-color: gray;
    margin-bottom: 2em;
    div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    div h1{
        font-size: 2em;
    }

    svg{
        cursor: pointer;
    }

    button{
    border: none;
    background-color: black;
    color: white;
    font-size: 1.5em;
    border-radius: 8px;
    margin-left: .5em;
    padding: .3em;
    margin-right: .5em;
    cursor: pointer;
    }

    @media(max-width: 728px){
        ul{
            display: none;
        }
    }
    @media(min-width: 728px){
        svg{
            display: none;
        }
    }
`