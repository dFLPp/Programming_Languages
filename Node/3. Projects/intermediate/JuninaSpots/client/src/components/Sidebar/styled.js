import styled from 'styled-components'

export const StyledSide = styled.aside`
    background-color: gray;
    display: block;
    max-width: 40vw;
    width: 100%;
    height: 100vh;
    @media(max-width: 728px){
        max-width: 70vw;
    }

    header{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 2em;
        padding: 1em .5em;
    }
    header h1{
        font-size: 2em;
    }
    header button{
        border-radius: 50%;
        border: none;
        background-color: white;
        color: red;
        width: 40px;
        height: 40px;
        font-size: 1.5em;
        cursor: pointer;
    }   

    ul{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    ul button{
        padding: .5em;
        border: none;
        background-color: white;
        cursor: pointer;
        font-size: 1.5em;
    }

`

export const Overlay = styled.aside`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .7);
`