import styled from 'styled-components'

export const StyledDashboard = styled.div`
    color: black;
    width: 90vw;
    height: 100%;
    padding: 1em;
    margin: 0 auto;

    h1{
        font-size: 2.1em;
        color: #DCD7C9;
        margin: 1em;
    }
    
    h2{
        font-size: 2em;
    }

    h3{
        font-size: 1.5em;
    }

    header{
        font-size: 1.5em;
        text-align: center;
        padding: 1em;
    }

    main{
        background-color: #2C3639;
    }

    article{
        padding: 1em;
        text-align: center;
        background-color: #3F4E4F;
    }

    article h2{
        margin-bottom: 1em;
    }

    article input{
        padding: .5em;
        margin: .5em;
        margin-bottom: 2em;
    }

    article button{
        font-size: 1.5em;
        border: none;
        padding: .5em;
        background-color: black;
        color: white;
        cursor: pointer;
        border-radius: 8px;
    }

    aside{
        background-color: #2C3639;
    }
    aside h1{
        text-align: center;
        margin: 1em;
    }

    .tripsContainer{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 5px;
    }

    .alert{
        padding: .5em;
        font-size: 1.5em;
        border-radius: 8px;
        background-color: red;
        color: white;
        word-wrap: break-word;
        max-width: 50vw;
        margin: auto auto;
        margin-top: 2em;
        display: ${(props) => props.showAlert ? 'span' : 'none' }
    }
`