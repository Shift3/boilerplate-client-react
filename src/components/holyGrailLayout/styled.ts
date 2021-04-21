import styled from 'styled-components'

export const HolyGrailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
  @media all and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

export const HolyGrailMain = styled.main`
  flex: 1;
  order: 2;
  @media all and (min-width: 768px) {
    flex: 2;
    order: 2;
    min-height: 80vh;
  }
`

export const HolyGrailNavLeft = styled.aside`
  flex: 1;
  order: 1;
`

export const HolyGrailNavRight = styled.aside`
  display: none;
  @media all and (min-width: 768px) {
    order: 3;
    flex: 1;
  }
`

export const HolyGrailFooter = styled.footer`
  flex: shrink;
  width: 100vw;
  order: 4;
`
