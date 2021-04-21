import { HolyGrailWrapper, HolyGrailFooter, HolyGrailNavLeft, HolyGrailNavRight, HolyGrailMain } from './styled'
import { HolyGrail, HolyGrailLayoutProps } from './types'

export const HolyGrailLayout: HolyGrail = ({ navBar, footer, children }: HolyGrailLayoutProps) => (
  <HolyGrailWrapper>
    <HolyGrailNavLeft>{navBar}</HolyGrailNavLeft>
    <HolyGrailMain>{children}</HolyGrailMain>
    <HolyGrailNavRight />
    <HolyGrailFooter>{footer}</HolyGrailFooter>
  </HolyGrailWrapper>
)
