/* eslint-disable require-await */
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import {
  ClickNavigateType,
  ExpectToMatchSnapshotType,
  ExpectChildToHaveClassByTestIdType,
  ExpectChildToHaveInnerHTMLByTestIdType,
  StringIdentifierVoidReturnType,
  StringIdentifierStringValueVoidReturnTupe,
  StringValueVoidReturnType,
  StringIdentifierNumberIntegerVoidReturnType,
  MockFunctionVoidReturnType,
  ExpectAttributeToEqualByTestIdType,
  expectMockFunctionCalledXTimesType,
} from './types';

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

export const expectToMatchSnapshot: ExpectToMatchSnapshotType = (component) =>
  expect(renderer.create(component).toJSON()).toMatchSnapshot();

export const expectInDocByTestId: StringIdentifierVoidReturnType =
  (identifier) => expect(getByTestId(identifier)).toBeInTheDocument();

export const expectNotInDocByTestId: StringIdentifierVoidReturnType =
  (identifier) => expect(queryByTestId(identifier)).not.toBeInTheDocument();

export const expectInDocByRole: StringIdentifierVoidReturnType =
  (identifier) => expect(getByRole(identifier)).toBeInTheDocument();

export const clickByTestId: StringIdentifierVoidReturnType =
  (identifier) => act(() => click(getByTestId(identifier)));

export const clickByTestIdAsync: StringIdentifierVoidReturnType =
  (identifier) => act(async () => click(getByTestId(identifier)));

export const clickByRole: StringIdentifierVoidReturnType =
  (identifier) => act(() => click(getByTestId(identifier)));

export const clickByRoleAsync: StringIdentifierVoidReturnType =
  (identifier) => act(async () => click(getByRole(identifier)));

export const pathMatch: StringIdentifierVoidReturnType =
  (identifier) => expect(window.location.pathname).toEqual(identifier);

export const clickNavigateByTestId: ClickNavigateType = (identifier, path) => {
  clickByTestId(identifier);
  pathMatch(path);
};

export const clickNavigateByRole: ClickNavigateType = (identifier, path) => {
  clickByRole(identifier);
  pathMatch(path);
};

export const expectInnerHTMLByTestId: StringIdentifierStringValueVoidReturnTupe =
  (id, value) => expect(getByTestId(id).innerHTML).toEqual(value);

export const expectInnerHTMLByRole: StringIdentifierStringValueVoidReturnTupe =
  (role, value) => expect(getByRole(role).innerHTML).toEqual(value);

export const expectTextContentByTestId: StringIdentifierStringValueVoidReturnTupe =
  (id, text) => expect(getByTestId(id)).toHaveTextContent(text.toString());

export const expectInDocByLabelText: StringIdentifierVoidReturnType =
  (identifier) => expect(getByLabelText(identifier)).toBeInTheDocument();

export const setValueByLabelText: StringIdentifierStringValueVoidReturnTupe =
  (text, value) => act(async () => {
    const element = getByLabelText(text);
    clear(element);
    type(element, value);
  });

export const expectAttributeToEqualByTestId: ExpectAttributeToEqualByTestIdType =
  (identifier, attribute, value) => expect(getByTestId(identifier).getAttribute(attribute)).toEqual(value);

export const expectChildToHaveClassByTestId: ExpectChildToHaveClassByTestIdType =
  (parentTestId, childIndex, childClass) => {
    expect(getByTestId(parentTestId).childNodes[childIndex]).toHaveClass(childClass);
  };

export const expectLengthByRole: StringIdentifierNumberIntegerVoidReturnType = (identifier: string, integer: number) =>
  expect(queryAllByRole(identifier)).toHaveLength(integer);

export const clickChildByTestId: StringIdentifierNumberIntegerVoidReturnType = (identifier, integer) =>
  act(() => click(screen.getByTestId(identifier).children[integer]));

export const expectChildToHaveInnerHTMLByTestId: ExpectChildToHaveInnerHTMLByTestIdType =
  (parentTestId, childIndex, innerHTMLValue) =>
    expect(getByTestId(parentTestId).children[childIndex].innerHTML).toEqual(innerHTMLValue);

export const formAlertMessageCheck: StringValueVoidReturnType = (value) => {
  const messages = getAllByRole('alert').reduce(
    (messages: string[], alert: HTMLElement) => [...messages, alert.innerHTML], []
  );
  expect(messages.includes(value)).toBeTruthy();
};

export const expectMockFunctionCalled: MockFunctionVoidReturnType = (mockFunction) =>
  expect(mockFunction).toHaveBeenCalled();

export const expectMockFunctionNotCalled: MockFunctionVoidReturnType = (mockFunction) =>
  expect(mockFunction).not.toHaveBeenCalled();

export const expectMockFunctionCalledXTimes: expectMockFunctionCalledXTimesType = (mockFunction, integer) =>
  expect(mockFunction).toHaveBeenCalledTimes(integer);

export const clickExpectByTestId: StringIdentifierStringValueVoidReturnTupe =
  (identifier, value) => {
    clickByTestId(identifier);
    expectInDocByTestId(value);
  };
