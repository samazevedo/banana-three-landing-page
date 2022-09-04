import styled from 'styled-components'

export const Container = styled.main`
    display: grid;
    font-family: 'Truculenta', sans-serif;
`
export const Header = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    text-transform: uppercase;
    transition: all 1s ease;
    padding: 1rem;
    & h1 {
        font-size: 10rem;
        margin: 0;
    }
    & h2 {
        font-size: 5rem;
        margin: 0;
    }
    @media only screen and (max-width: 700px) {
        h1 {
            font-size: 5rem;
        }
        h2 {
            font-size: 3rem;
        }
    }
`
