import renderer from 'react-test-renderer';
import { Wrapper } from '../styled';

describe('<Wrapper />', () => {
  it('should match the stored snapshot', () => {
    expect(renderer.create(<Wrapper />).toJSON()).toMatchSnapshot();
  });
});
