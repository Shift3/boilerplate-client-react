import { render } from '@testing-library/react';
import { Footer } from 'components/footer';
import { HolyGrailLayout } from '../index';

let HolyGrailWrapper: HTMLElement;
let HolyGrailMainWrapper: HTMLElement;
let HolyGrailLeftAside: HTMLElement | null;
let HolyGrailMain: HTMLElement | null;
let HolyGrailRightAside: HTMLElement | null;

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

      it('should not display HolyGrailMain', () => {
        const { queryByTestId } = render(<HolyGrailLayout />);
        HolyGrailMain = queryByTestId('main');
        expect(HolyGrailMain).not.toBeInTheDocument();
      });

      it('should not display HolyGrailRightAside', () => {
        const { queryByTestId } = render(<HolyGrailLayout />);
        HolyGrailRightAside = queryByTestId('rightAside');
        expect(HolyGrailRightAside).not.toBeInTheDocument();
      });

      it('should not display <Footer/>', () => {
        render(<HolyGrailLayout />);
        expect(Footer).not.toBeInTheDocument;
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

      it('should display HolyGrailMainWrapper', () => {
        const { getByTestId } = render(
          <HolyGrailLayout leftSidebar={<div />} rightSidebar={<div />} footer={<div />} />,
        );
        HolyGrailMainWrapper = getByTestId('mainWrapper');
        expect(HolyGrailMainWrapper).toBeInTheDocument();
      });

      it('should display HolyGrailLeftAside', () => {
        const { getByTestId } = render(
          <HolyGrailLayout leftSidebar={<div />} rightSidebar={<div />} footer={<div />} />,
        );
        HolyGrailLeftAside = getByTestId('mainWrapper');
        expect(HolyGrailLeftAside).toBeInTheDocument();
      });

      it('should display HolyGrailMain', () => {
        const { getByTestId } = render(
          <HolyGrailLayout>
            <div />
          </HolyGrailLayout>,
        );
        HolyGrailMain = getByTestId('main');
        expect(HolyGrailMain).toBeInTheDocument();
      });

      it('should display HolyGrailRighttAside', () => {
        const { getByTestId } = render(
          <HolyGrailLayout leftSidebar={<div />} rightSidebar={<div />} footer={<div />} />,
        );
        HolyGrailRightAside = getByTestId('rightAside');
        expect(HolyGrailRightAside).toBeInTheDocument();
      });

      // it.only('should display <Footer/>', () => {
      //   render(<HolyGrailLayout footer={<div />} />);
      //   expect(Footer).toBeInTheDocument();
      // });
    });
  });
});
