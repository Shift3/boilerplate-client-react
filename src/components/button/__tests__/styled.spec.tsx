import { CustomButton } from '../styled';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

describe('Button Styled Component', () => {
  it('Should match the stored <CustomButton /> snapshot', () => expect(renderer.create(<CustomButton />).toJSON()).toMatchSnapshot());
});