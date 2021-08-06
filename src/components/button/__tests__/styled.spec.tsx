import renderer from 'react-test-renderer';
import { CustomButton } from '../styled';
import 'jest-styled-components';

describe('Button Styled Component', () => {
  it.skip('Should match the stored <CustomButton /> snapshot', () =>
    expect(renderer.create(<CustomButton />).toJSON()).toMatchSnapshot());
});
