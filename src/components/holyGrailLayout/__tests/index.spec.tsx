import { render } from '@testing-library/react';
import { HolyGrailLayout } from '../index';

let HolyGrailWrapper: HTMLElement;
let HolyGrailMainWrapper: HTMLElement;
let HolyGrailLeftAside: HTMLElement | null;
let HolyGrailMain: HTMLElement;
let HolyGrailRightAside: HTMLElement;

describe('HolyGrailLayout', () => {
  describe('wrappers', () => {
    describe('no props are passed in', () => {
      it('should display HolyGrailWrapper', () => {
        const { getByTestId } = render(<HolyGrailLayout />);
        HolyGrailWrapper = getByTestId('wrapper');
        expect(HolyGrailWrapper).toBeInTheDocument();
      });

      it('should display the HolyGrailMainWrapper', () => {
        const { getByTestId } = render(<HolyGrailLayout />);
        HolyGrailMainWrapper = getByTestId('mainWrapper');
        expect(HolyGrailMainWrapper).toBeInTheDocument();
      });

      it('should not display HolyGrailLeftAside', () => {
        const { queryByTestId } = render(<HolyGrailLayout />);
        HolyGrailLeftAside = queryByTestId('leftAside');
        expect(HolyGrailLeftAside).not.toBeInTheDocument();
      });
    });

    describe('all props passed in', () => {
      it('should display HolyGrailWrapper', () => {
        const { getByTestId } = render(
          <HolyGrailLayout leftSidebar={<div />} rightSidebar={<div />} footer={<div />} />,
        );
        HolyGrailWrapper = getByTestId('wrapper');
        expect(HolyGrailWrapper).toBeInTheDocument();
      });
    });
  });

  // describe('leftSideBar', () => {
  //   it('should display the left aside when the leftSidebar prop is present', () => {
  //     const { rerender } = render(<HolyGrailLayout />);
  //     rerender(<HolyGrailLayout leftSidebar={<div />} />);
  //     HolyGrailLeftAside = getByTestId('leftAside');
  //     expect(HolyGrailLeftAside).toBeInTheDocument();
  //   });
  //   it('should not display the left aside when the leftSidebar prop is not present', () => {
  //     render(<HolyGrailLayout />);
  //     HolyGrailLeftAside = getByTestId('leftAside');
  //     expect(HolyGrailLeftAside).not.toBeInTheDocument();
  //   });
  // });
  // describe('rightSideBar', () => {
  //   it('should display the right aside when the rightSidebar prop is present', () => {
  //     const { rerender } = render(<HolyGrailLayout />);
  //     rerender(<HolyGrailLayout rightSidebar={<div />} />);
  //     HolyGrailRightAside = getByTestId('rightAside');
  //     expect(HolyGrailRightAside).toBeInTheDocument();
  //   });
  //   it('should not display the right aside when the rightSidebar prop is not present', () => {
  //     const { rerender } = render(<HolyGrailLayout />);
  //     rerender(<HolyGrailLayout />);
  //     HolyGrailRightAside = getByTestId('rightAside');
  //     expect(HolyGrailRightAside).not.toBeInTheDocument();
  //   });
  // });
  // describe('footer', () => {
  //   it('should display if footer prop is present', () => {
  //     const { rerender } = render(<HolyGrailLayout />);
  //     rerender(<HolyGrailLayout footer={Footer} />);
  //     expect(Footer).toBeInTheDocument();
  //   });
  //   it('should not display when the footer prop is not present', () => {
  //     const { rerender } = render(<HolyGrailLayout />);
  //     rerender(<HolyGrailLayout />);
  //     expect(Footer).not.toBeInTheDocument();
  //   });
  // });
  // describe('children', () => {
  //   it('should display HolyGrailMain component when children are present', () => {
  //     const { rerender } = render(<HolyGrailLayout />);
  //     rerender(
  //       <HolyGrailLayout>
  //         <div />
  //       </HolyGrailLayout>,
  //     );
  //     HolyGrailMain = getByTestId('main');
  //     expect(HolyGrailMain).toBeInTheDocument();
  //   });
  //   it('should not display HolyGrailMain component when children are not present', () => {
  //     const { rerender } = render(<HolyGrailLayout />);
  //     rerender(<HolyGrailLayout />);
  //     HolyGrailMain = getByTestId('main');
  //     expect(HolyGrailMain).not.toBeInTheDocument();
  //   });
  // });
});
