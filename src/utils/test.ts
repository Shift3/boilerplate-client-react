import { JSXElementConstructor, ReactElement } from 'react';
import renderer from 'react-test-renderer';


export const snapshotMatch = (component: ReactElement<any, string | JSXElementConstructor<any>>) =>
    expect(renderer.create(component).toJSON()).toMatchSnapshot();

