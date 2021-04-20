import { HolyGrailWrapper, HolyGrailFooter, HolyGrailNav, HolyGrailMain } from './styled'
import { HolyGrail, HolyGrailLayoutProps } from './types'

export const HolyGrailLayout: HolyGrail = ({ leftSidebar, footer, children }: HolyGrailLayoutProps) => (
  <HolyGrailWrapper>
    <HolyGrailMain>{children}</HolyGrailMain>
    {!!leftSidebar && <HolyGrailNav>{leftSidebar}</HolyGrailNav>}
    {!!footer && <HolyGrailFooter>{footer}</HolyGrailFooter>}
  </HolyGrailWrapper>
)
