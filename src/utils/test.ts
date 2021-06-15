/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable require-await */
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';
import renderer from 'react-test-renderer';

const {
  getByTestId,
  getByRole,
  getByLabelText,
  queryAllByRole,
  queryByTestId,
  getAllByRole
} = screen;

const {
  click,
  clear,
  type
} = userEvent;

export const clickByTestId = (id: string) => act(() => click(getByTestId(id)));

export const clickByRole = (role: string) => act(() => click(getByRole(role)));

export const clickByRoleAsync = (role: string) => act(() => click(getByRole(role)));

export const pathMatch = (path: string) => expect(window.location.pathname).toEqual(path);

export const expectToMatchSnapshot = (
  component: ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>
) => expect(renderer.create(component).toJSON()).toMatchSnapshot();

export const expectInDocByTestId = (id: string) =>
  expect(getByTestId(id)).toBeInTheDocument();

export const expectNotInDocByTestId = (id: string) =>
  expect(queryByTestId(id)).not.toBeInTheDocument();

export const expectInDocByRole = (role: string) =>
  expect(getByRole(role)).toBeInTheDocument();

export const expectInnerHTMLByTestId = (id: string, value: string) =>
  expect(getByTestId(id).innerHTML).toEqual(value);

export const expectInnerHTMLByRole = (role: string, value: string) =>
  expect(getByRole(role).innerHTML).toEqual(value);

export const expectTextContentByTestId = (id: string, text: string) =>
  expect(getByTestId(id)).toHaveTextContent(text.toString());

export const expectInDocByLabelText = (text: string) =>
  expect(getByLabelText(text)).toBeInTheDocument();

export const expectLengthByRole = (role: string, length: number) =>
  expect(queryAllByRole(role)).toHaveLength(length);

export const expectMockFunctionCalled = (mockFunction: jest.Mock<Function>) =>
  expect(mockFunction).toHaveBeenCalled();

export const expectMockFunctionNotCalled = (mockFunction: jest.Mock<Function>) =>
  expect(mockFunction).not.toHaveBeenCalled();

export const expectChildToHaveClassByTestId = (
  parentTestId: string,
  childIndex: number,
  childClass: string
) => expect(getByTestId(parentTestId).childNodes[ childIndex ]).toHaveClass(childClass);

export const expectChildToHaveInnerHTMLByTestId = (
  parentTestId: string,
  childIndex: number,
  innerHTMLValue: string
) => {
  const test = getByTestId(parentTestId).children[ childIndex ].innerHTML;
  console.log("HERE", test);
  expect(test).toEqual(innerHTMLValue);
};

export const clickChildByTestId = (parentTestId: string, childIndex: number) =>
  act(() => click(screen.getByTestId(parentTestId).children[ childIndex ]));

export const clickNavigateByTestId = (id: string, path: string) => {
  clickByTestId(id);
  pathMatch(path);
};
export const clickNavigateByRole = (role: string, path: string) => {
  clickByRole(role);
  pathMatch(path);
};

export const setValueByLabelText = (text: string, value: string) => act(() => {
  const element = getByLabelText(text);
  clear(element);
  type(element, value);
});

export const formAlertMessageCheck = (message: string) => {
  const messages = getAllByRole('alert').reduce((messages: string[], alert: HTMLElement) =>
    [ ...messages, alert.innerHTML ], []);
  expect(messages.includes(message)).toBeTruthy();
};

export const clickExpectByTestId = (clickId: string, expectId: string) => {
  clickByTestId(clickId);
  expectInDocByTestId(expectId);
};
