import { expectToMatchSnapshot } from '../../../utils/test';
import {
  HolyGrailWrapper,
  HolyGrailMainWrapper,
  HolyGrailLeftAside,
  HolyGrailMain,
  HolyGrailRightAside,
} from '../styled';

import 'jest-styled-components';

describe('<HolyGrailLayout /> styled components', () => {
  it('should match the stored <HolyGrailWrapper /> snapshot', () =>
    expectToMatchSnapshot(<HolyGrailWrapper />));
  it('should match the stored <HolyGrailMainWrapper /> snapshot', () =>
    expectToMatchSnapshot(<HolyGrailMainWrapper />));
  it('should match the stored <HolyGrailLeftAside /> snapshot', () =>
    expectToMatchSnapshot(<HolyGrailLeftAside />));
  it('should match the stored <HolyGrailMain /> snapshot', () =>
    expectToMatchSnapshot(<HolyGrailMain />));
  it('should match the stored <HolyGrailRightAside /> snapshot', () =>
    expectToMatchSnapshot(<HolyGrailRightAside />));
});