import renderer from 'react-test-renderer';
import { Wrapper } from '../Wrapper';

describe('<Wrapper />', () => {
  it('should match the stored snapshot', () => {
    expect(renderer.create(<Wrapper />).toJSON()).toMatchSnapshot();
  });
});
