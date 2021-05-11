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
//
//
// export const HolyGrailWrapper = styled.div`
// <<<<<<< HEAD
//   background: grey;
//   height: 100%;
//   min-width: 400px;
//   min-height: 600px;
// =======
//   border: 1px solid black;
//   min-height: 100vh;
//   display: grid;
// `;
//
// export const HolyGrailMainWrapper = styled.div`
//   border: 1px solid black;
//   min-height: 100vh;
//   grid-template-columns: repeat(6, fr);
//   grid-template-areas:
//     'navbar main main'
//     'footer footer footer';
// >>>>>>> 4d5699f... feat(holy-grail): updated styled.ts
// `;
//
// export const HolyGrailHeader = styled.div`
//   border: 1px solid black;
//   padding: 20px;
//   text-align: center;
// `;
//
// export const HolyGrailLeftAside = styled.aside`
//   border: 1px solid black;
//   padding: 20px;
//   text-align: center;
// `;
//
// export const HolyGrailMain = styled.main`
//   border: 1px solid black;
//   padding: 20px;
//   text-align: center;
// `;
//
// export const HolyGrailRightAside = styled.aside`
//   border: 1px solid black;
//   padding: 20px;
//   text-align: center;
// `;
=======
  background: grey;
  height: 100%;
  min-width: 400px;
  min-height: 600px;
`;

export const HolyGrailHeader = styled.div`
  border: 1px solid black;
  padding: 20px;
  text-align: center;
`;

export const HolyGrailLeftAside = styled.aside`
  border: 1px solid black;
  padding: 20px;
  text-align: center;
`;

export const HolyGrailMain = styled.main`
  border: 1px solid black;
  padding: 20px;
  text-align: center;
`;

export const HolyGrailRightAside = styled.aside`
  border: 1px solid black;
  padding: 20px;
  text-align: center;
`;
>>>>>>> 1b12d0f... feat(holy-grail):updated styles
