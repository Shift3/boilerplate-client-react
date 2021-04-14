import React, { FC } from 'react'
import styled from 'styled-components'

const HolyGrailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media all and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

const Header = styled.header`
  border: 2px solid green;
  width: 100%;
`
const Main = styled.main`
  border: 2px solid blue;
  @media all and (min-width: 768px) {
    flex: 2;
    order: 2;
    min-height: 80vh;
  }
`

const LeftNav = styled.aside`
  border: 2px solid red;
  @media all and (min-width: 768px) {
    order: 1;
    flex: 1;
  }
`

const Footer = styled.footer`
  border: 2px solid gray;
  width: 100%;
  order: 4;
`
// export interface IHolyGrailProps {
//   header: FC
//   main: FC
//   leftNav: FC
//   footer: FC
// }

export const HolyGrailLayout: FC = () => (
  <HolyGrailWrapper>
    <Header>
      <h1>Header</h1>
    </Header>
    <LeftNav>Side Nav</LeftNav>
    <Main>Main Content</Main>
    <Footer>
      <h2>Footer</h2>
    </Footer>
  </HolyGrailWrapper>
)
