import { JSXElementConstructor, ReactElement } from 'react';
import renderer from 'react-test-renderer';


type expectToMatchSnapshotType = (component: ReactElement<any, string | JSXElementConstructor<any>>) => void;

export const expectToMatchSnapshot: expectToMatchSnapshotType = (component) => 
    expect(renderer.create(component).toJSON()).toMatchSnapshot();

