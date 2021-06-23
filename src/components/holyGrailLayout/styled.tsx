import styled from 'styled-components';
import styleValues from '../../utils/styleValues';
import { Constants } from '../../utils/constants';

const { footerHeight, topNavHeight } = styleValues;
const { navPosition } = Constants;

export const HolyGrailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HolyGrailMainWrapper = styled.div`
  display: flex;
  flex-direction: ${ navPosition === 'top' ? 'column' : 'row' };
  flex: 1;
  min-height: ${ navPosition === 'top'
    ? `calc(100vh - ${footerHeight} - ${topNavHeight})`
    : `calc(100vh - ${footerHeight})` };
`;

export const HolyGrailLeftAside = styled.aside`
  order: -1;
  flex: 0 0 12em;
  @media (min-width: 768px) {
    flex: 0 0 12em;
  }
`;

export const HolyGrailMain = styled.main`
  flex: 1;
  @media (min-width: 768px) {
    flex: 1;
  }
`;

export const HolyGrailRightAside = styled.aside`
  flex: 0 0 12em;

  @media (min-width: 768px) {
    flex: 0 0 12em;
  }
`;
