import { render, cleanup, screen } from '@testing-library/react';
import { Footer } from '../../footer/index';
import { HolyGrailLayout } from '../index';

const { getByTestId } = screen;
let HolyGrailWrapper: HTMLElement;
let HolyGrailMainWrapper: HTMLElement;
let HolyGrailLeftAside: HTMLElement;
let HolyGrailMain: HTMLElement;
let HolyGrailRightAside: HTMLElement;

afterEach(cleanup);

describe('holyGrailLayout', () => {
  it('Should display when props are not present', () => {
    render(<HolyGrailLayout />);
    HolyGrailWrapper = getByTestId('wrapper');
    expect(HolyGrailWrapper).toBeInTheDocument();
  });
  it('Should display when all props are present', () => {
    const { rerender } = render(<HolyGrailLayout />);
    rerender(<HolyGrailLayout leftSidebar={<div />} rightSidebar={<div />} footer={Footer} />);
    HolyGrailWrapper = getByTestId('wrapper');
    expect(HolyGrailWrapper).toBeInTheDocument();
  });
  describe('wrappers', () => {
    it('Should render the HolyGrailWrapper', () => {
      render(<HolyGrailLayout />);
      HolyGrailWrapper = getByTestId('wrapper');
      expect(HolyGrailWrapper).toBeInTheDocument();
    });
    it('Should render the HolyGrailMainWrapper', () => {
      render(<HolyGrailLayout />);
      HolyGrailMainWrapper = getByTestId('mainWrapper');
      expect(HolyGrailMainWrapper).toBeInTheDocument();
    });
  });
  describe('leftSideBar', () => {
    it('Should render the leftAside when the leftSidebar prop is present', () => {
      const { rerender } = render(<HolyGrailLayout />);
      rerender(<HolyGrailLayout leftSidebar={<div />} />);
      HolyGrailLeftAside = getByTestId('leftAside');
      expect(HolyGrailLeftAside).toBeInTheDocument();
    });
    it('Should not render the leftAside when the leftSidebar prop is not present', () => {
      render(<HolyGrailLayout />);
      HolyGrailLeftAside = getByTestId('leftAside');
      expect(HolyGrailLeftAside).not.toBeInTheDocument();
    });
  });
  describe('rightSideBar', () => {
    it('Should render the rightAside when the rightSidebar prop is present', () => {
      const { rerender } = render(<HolyGrailLayout />);
      rerender(<HolyGrailLayout rightSidebar={<div />} />);
      HolyGrailRightAside = getByTestId('rightAside');
      expect(HolyGrailRightAside).toBeInTheDocument();
    });
    it('Should not render the rightAside when the rightSidebar prop is not present', () => {
      const { rerender } = render(<HolyGrailLayout />);
      rerender(<HolyGrailLayout />);
      HolyGrailRightAside = getByTestId('rightAside');
      expect(HolyGrailRightAside).not.toBeInTheDocument();
    });
  });
  describe('footer', () => {
    it('Should render footer if footer prop is present', () => {
      const { rerender } = render(<HolyGrailLayout />);
      rerender(<HolyGrailLayout footer={Footer} />);
      expect(Footer).toBeInTheDocument();
    });
    it('Should not render the footer when the footer prop is not present', () => {
      const { rerender } = render(<HolyGrailLayout />);
      rerender(<HolyGrailLayout />);
      expect(Footer).not.toBeInTheDocument();
    });
  });
  describe('children', () => {
    it('Should render HolyGrailMain component when children are present', () => {
      const { rerender } = render(<HolyGrailLayout />);
      rerender(
        <HolyGrailLayout>
          <div />
        </HolyGrailLayout>,
      );
      HolyGrailMain = getByTestId('main');
      expect(HolyGrailMain).toBeInTheDocument();
    });
    it('Should not render HolyGrailMain component when children are not present', () => {
      const { rerender } = render(<HolyGrailLayout />);
      rerender(<HolyGrailLayout />);
      HolyGrailMain = getByTestId('main');
      expect(HolyGrailMain).not.toBeInTheDocument();
    });
  });
});
