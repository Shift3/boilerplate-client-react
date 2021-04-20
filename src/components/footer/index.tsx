import { FC } from 'react'
import { FooterWrapper } from './styled'

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
