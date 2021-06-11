import renderer from 'react-test-renderer';
import { Wrapper } from '../styled';

import 'jest-styled-components';

describe('<Wrapper />', () => {
  it('should match the stored snapshot', () => {
    expect(renderer.create(<Wrapper />).toJSON()).toMatchSnapshot();
  });
});
