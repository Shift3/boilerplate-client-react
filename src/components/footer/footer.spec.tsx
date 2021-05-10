import { render, getByText, screen } from '@testing-library/react';
import { Footer, copyrightDate, creationYear } from './index';
import { Constants } from '../../utils/constants';
import { Wrapper } from './styled';

const { version } = Constants;
const { getByRole } = screen;

test('screen debug element', () => {
  render(<Footer />);
  screen.debug();
});

test('should return element based on its role', () => {
  const { getByRole } = render(<div role="footer" />);
  expect(getByRole('footer')).toMatchInlineSnapshot(`
    <div
      role="footer"
    />
  `);
});

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

describe('footer', () => {
  let footer: HTMLElement;

  describe('render()', () => {
    const { getByText } = render(<Footer />);

    it('Should contain the creationYear', () => {
      const { getByText } = render('2021');
      expect(getByText(2021)).toBeInTheDocument();
    });
    it('Should contain the Version', () => {
      const { getByText } = render(<Footer />);
      expect(getByText(/Bitwise Technology Constulting - 0.1.0 Staging/)).toBeInTheDocument();
    });
    it('Should contain the properly formatted copyright date', () => {
      const { getByText } = render('copyrightDate');
      expect(getByText('copyrightDate')).toBeInTheDocument();
      expect(copyrightDate()).toEqual(`${creationYear}` || `${creationYear} - ${new Date().getFullYear()}`);
    });
  });
});

// describe('Wrapper', () => {
//   let wrapper: HTMLElement;
// });
//
// // describe('render()', () => {
// //   const { container, getByText } = render(<Wrapper />);
// // });

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
// }))
