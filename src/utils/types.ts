import { JSXElementConstructor, ReactElement, ReactNode } from 'react';

export type ClickNavigateType = (identifier: string, path: string) => void;

export type ComponentType = ReactElement<ReactNode, string | JSXElementConstructor<ReactNode>>;

export type ExpectToMatchSnapshotType = (component: ComponentType) => void;

export type ExpectChildToHaveClassByTestIdType = (parentTestId: string, childIndex: number, childClass: string) => void;

export type ExpectChildToHaveInnerHTMLByTestIdType =
    (parentTestId: string, childIndex: number, innerHTMLValue: string) => void;

export type StringIdentifierVoidReturnType = (identifier: string) => void;

export type StringIdentifierStringValueVoidReturnTupe = (identifier: string, value: string) => void;

export type StringValueVoidReturnType = (value: string) => void;

export type StringIdentifierNumberIntegerVoidReturnType = (identifier: string, integer: number) => void;

// @TODO - check for better typescript definition
// eslint-disable-next-line
export type MockFunctionVoidReturnType = (mockFunction: jest.Mock<Function>) => void;

export type ExpectAttributeToEqualByTestIdType = (identifier: string, attribute: string, value: string) => void;

export type expectMockFunctionCalledXTimesType = (mockFunction: jest.Mock<Function>, integer: number) => void;
