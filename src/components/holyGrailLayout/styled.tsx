import styled from 'styled-components';
import {} from '../../utils/styleValues';

export const HolyGrailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HolyGrailMainWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-height: calc(100vh - ${(props) => props.theme.footerHeight});

  @media (min-width: 768px) {
    flex-direction: row;
    flex: 1;
  }
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
