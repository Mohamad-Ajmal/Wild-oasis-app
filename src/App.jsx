import React from "react"
import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"
import Heading from "./ui/Heading"
import Button from "./ui/Button"
import Input from "./ui/Input"
import Row from "./ui/Row"


const StyledApp = styled.main `
  /* background-color: orange; */
  padding: 20px;
`


export default function App() {
  return (
    <>
    <GlobalStyles />
    <StyledApp>
      <Row>

      <Row type="horizental">
      <Heading as='h1'>Hello Wolrd</Heading>
      <div>
        <Heading as='h2'>Check In and out</Heading>
        <Button onClick={()=>{}}>Check in</Button>
        <Button variation="secondary" size="small"  onClick={()=>{}}>Check out</Button>
      </div>
      </Row>
      <Row>

      <Heading as='h3'>Form</Heading>
      <form>

      <Input type="number" placeholder="Number of guests" />
      <Input type="number" placeholder="Number of guests" />
      </form>
      </Row>
      </Row>
    </StyledApp>
    </>
  )
}
