import styled from 'styled-components'

export const HolyGrailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media all and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

export const HolyGrailMain = styled.main`
  border: 2px solid blue;
  @media all and (min-width: 768px) {
    flex: 2;
    order: 2;
    min-height: 80vh;
  }
`

export const HolyGrailNav = styled.aside`
  border: 2px solid;
  @media all and (min-width: 768px) {
    order: 1;
    flex: 1;
  }
`

export const HolyGrailFooter = styled.footer`
  border: 2px solid gray;
  width: 100vw;
  order: 4;
`
