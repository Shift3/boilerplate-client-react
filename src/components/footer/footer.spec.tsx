import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { Footer, copyrightDate, creationYear } from './index';
import { Constants } from '../../utils/constants';
import { Wrapper } from './styled';

const { version } = Constants;
const { getByRole } = screen;

let container: any = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
//
// describe('Footer', () => {
//   let footer: HTMLElement;
//   beforeEach(() => {
//     render(<Footer />);
//     footer = getByRole('footer');
//   });

describe('footer', () => {
  let footer: HTMLElement;
  beforeEach(() => {
    render(<Footer />);
    footer = getByRole('footer');
  });
  const { getByText } = render(<Footer />);
  it('Should contain the creationYear', () => {
    expect(container.textContent).toBe('2021');
  });
  it('Should contain the Version', () => {
    const { getByText } = render(<Footer />);
    expect(container.textContent).toBe(/Bitwise Technology Constulting - 0.1.0 Staging/);
  });
  it('Should contain the properly formatted copyright date', () => {
    expect(getByText('copywriteDate')).toBeInTheDocument();
    expect(copyrightDate()).toEqual(`${creationYear}` || `${creationYear} - ${new Date().getFullYear()}`);
  });
});

describe('Wrapper', () => {
  let wrapper: HTMLElement;
});

describe('render()', () => {
  const { getByText } = render(<Wrapper />);
});

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
