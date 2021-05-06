import React from 'react';
import { render } from 'react-testing-library';

import FooterWrapper from '../index';

describe('<Wrapper />', () => {
  it('should render an <footer> tag', () => {
    const { container } = render(<FooterWrapper />);
    expect(container.querySelector('footer')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<Wrapper />);
    expect(container.querySelector('footer').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Wrapper id={id} />);
    expect(container.querySelector('footer').id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<Wrapper attribute="test" />);
    expect(container.querySelector('footer').getAttribute('attribute')).toBeNull();
  });
});
