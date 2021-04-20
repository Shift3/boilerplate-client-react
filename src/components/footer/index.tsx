import { FC } from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.div`
  width: 100%;
  text-align: center;
  border-top: 2px solid black;
`

const copyrightDate = () => {
  const creationYear = 2021
  const todayYear = new Date().getFullYear()

  return todayYear > creationYear ? `${creationYear} - ${todayYear}` : `${creationYear}`
}

export const Footer: FC = () => (
  <FooterWrapper>
    <span>&copy; Bitwise Technology Constulting - v0.1.0 Staging </span>
    {copyrightDate()}
  </FooterWrapper>
)
