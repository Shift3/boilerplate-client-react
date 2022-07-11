/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JSXElementConstructor, ReactElement } from 'react';
import renderer from 'react-test-renderer';

const { getByTestId, getByRole, getByLabelText, queryAllByRole, queryByTestId, getAllByRole } = screen;

const { click, clear, type } = userEvent;

type expectToMatchSnapshotType = (component: ReactElement<any, string | JSXElementConstructor<any>>) => void;

export const expectToMatchSnapshot: expectToMatchSnapshotType = component =>
  expect(renderer.create(component).toJSON()).toMatchSnapshot();

export const expectInDocByTestId = (id: string) => expect(getByTestId(id)).toBeInTheDocument();

export const expectNotInDocByTestId = (id: string) => expect(queryByTestId(id)).not.toBeInTheDocument();

export const expectInDocByRole = (role: string) => expect(getByRole(role)).toBeInTheDocument();

export const expectInnerHTMLByTestId = (id: string, value: string) => expect(getByTestId(id).innerHTML).toEqual(value);

export const expectInnerHTMLByRole = (role: string, value: string) => expect(getByRole(role).innerHTML).toEqual(value);

export const clickByTestId = (id: string) => act(() => click(getByTestId(id)));

export const clickByTestIdAsync = (id: string) => act(async () => click(getByTestId(id)));

export const clickByRole = (role: string) => act(() => click(getByTestId(role)));

export const clickByRoleAsync = (role: string) => act(async () => click(getByRole(role)));

export const pathMatch = (path: string) => expect(window.location.pathname).toEqual(path);

export const clickNavigateByTestId = (id: string, path: string) => {
  clickByTestId(id);
  pathMatch(path);
};
export const clickNavigateByRole = (role: string, path: string) => {
  clickByRole(role);
  pathMatch(path);
};

export const expectTextContentByTestId = (id: string, text: string) =>
  expect(getByTestId(id)).toHaveTextContent(text.toString());

export const expectInDocByLabelText = (text: string) => expect(getByLabelText(text)).toBeInTheDocument();

export const expectLengthByRole = (role: string, length: number) => expect(queryAllByRole(role)).toHaveLength(length);

export const setValueByLabelText = (text: string, value: string) =>
  act(async () => {
    const element = getByLabelText(text);
    clear(element);
    type(element, value);
  });

export const formAlertMessageCheck = (message: string) => {
  const messages = getAllByRole('alert').reduce(
    (messages: string[], alert: HTMLElement) => [...messages, alert.innerHTML],
    [],
  );
  expect(messages.includes(message)).toBeTruthy();
};

export const expectMockFunctionCalled = (mockFunction: jest.Mock<any, any>) => expect(mockFunction).toHaveBeenCalled();

export const expectMockFunctionNotCalled = (mockFunction: jest.Mock<any, any>) =>
  expect(mockFunction).not.toHaveBeenCalled();

export const clickExpectByTestId = (clickId: string, expectId: string) => {
  clickByTestId(clickId);
  expectInDocByTestId(expectId);
};
