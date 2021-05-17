import { render, screen } from '@testing-library/react';
import { HolyGrailLayout } from '../index';

// const { version, creationYear } = Constants;
// const { getByTestId } = screen;
// let copyright: HTMLElement;

describe('holyGrailLayout', () => {
  beforeEach(() => {
    render(<HolyGrailLayout />);
  });
  screen.debug();
  // it('Should render the left sidebar, () => {
});

// import { render, screen } from '@testing-library/react';
// import { HolyGrailLayout } from './';
// import {
//     HolyGrailWrapper,
//     HolyGrailMainWrapper,
//     HolyGrailLeftAside,
//     HolyGrailMain,
//     HolyGrailRightAside
// } from './styled';
// const { getByTestId } = screen;
// xdescribe('HolyGrailLayout', () => {
//   let holyGrailLayout: HTMLElement;
//   let children: HTMLElement[];
//   beforeEach(() => {
//     render(
//         <HolyGrailLayout
//             leftSidebar={<div data-testid="leftSidebar"></div>}
//             rightSidebar={<div data-testid="leftSidebar"></div>}
//             footer={<div data-testid="leftSidebar"></div>}
//         >
//         { /* @TODO MOCK CHILDREN - this will allow the HolyGrailMain wrapper to be rendered as well*/ }
//         </HolyGrailLayout>
//     );
//     holyGrailLayout = getByTestId("holyGrailLayout");
//   })
//   it('Should render', () => {
//     expect(holyGrailLayout).toBeInTheDocument();
//     expect(HolyGrailWrapper).toBeInTheDocument();
//     expect(HolyGrailMainWrapper).toBeInTheDocument();
//     expect(HolyGrailLeftAside).toBeInTheDocument();
//     // expect(HolyGrailMain).toBeInTheDocument();
//     expect(HolyGrailRightAside).toBeInTheDocument();
//   });
// })
