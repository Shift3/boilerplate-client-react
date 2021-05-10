import { render, rerender, getByText, screen } from '@testing-library/react';
import { Footer, copywriteDate, creationYear } from './index';
import { Constants } from '../../utils/constants';
import { Wrapper } from './styled';

const { version } = Constants;
const { getByRole } = screen;

// class State {
//   constructor() {
//     this.questionnaire = new Questionnaire();
//     this.participants;
//     this.auth = new Auth();
//   }
// }
// let mock_state = new State();

// jest.mock('react-redux', () => ({
//   useSelector: jest.fn((fn) => fn(mock_state)),
//   useEffect: () => jest.fn(),
//   useDispatch: () => jest.fn(),
// }));
// jest.mock('react-router', () => ({
//   useParams: () => jest.fn(),
//   useHistory: () => jest.fn(),
// }));

describe('Footer', () => {
  let footer: HTMLElement;
  // beforeEach(() => {
  //   render(<Footer />);
  //   footer = getByRole('footer');
});

describe('render()', () => {
  const { container, getByText } = render(<Footer />);
  it('Should contain the creationYear', () => {
    expect(getByText('2021')).toBeInTheDocument();
  });
  it('Should contain the Version', () => {
    const { container, getByText } = render(<Footer />);
    expect(getByText(/Bitwise Technology Constulting - 0.1.0 Staging/)).toBeInTheDocument();
  });
  it('Should contain the properly formatted copyright date', () => {
    // expect(getByText('copywriteDate')).toBeInTheDocument();
    //   expect(copywriteDate()).toEqual(`${creationYear}` || `${creationYear} - ${new Date().getFullYear()}`);
  });
});

describe('Wrapper', () => {
  let wrapper: HTMLElement;
});

describe('render()', () => {
  const { container, getByText } = render(<Wrapper />);
});
