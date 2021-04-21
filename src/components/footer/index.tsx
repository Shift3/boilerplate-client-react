import { FC } from 'react'
import { FooterWrapper } from './styled'
import { Constants } from '../../utils/constants'

const copyrightDate = () => {
  const creationYear = 2021
  const currentYear = new Date().getFullYear()

  return currentYear > creationYear ? `${creationYear} - ${currentYear}` : `${creationYear}`
}

export const Footer: FC = () => (
  <FooterWrapper>
    <span>&copy; Bitwise Technology Constulting - {Constants.version} Staging </span>
    {copyrightDate()}
  </FooterWrapper>
)
