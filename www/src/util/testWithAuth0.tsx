/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth0Context, Auth0ContextInterface } from '@auth0/auth0-react';
import { render, RenderResult } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

function shallowWithAuth0(
    component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    authState: Partial<Auth0ContextInterface>,
): Enzyme.ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>> {
    return shallow(component, {
        wrappingComponent: Auth0Context.Provider,
        wrappingComponentProps: {
            value: authState,
        },
    });
}

function renderWithAuth0(component: React.ReactElement<any, string | React.JSXElementConstructor<any>>, authState: Partial<Auth0ContextInterface>): RenderResult {
    return render(<Auth0Context.Provider value={authState as any}>{component}</Auth0Context.Provider>);
}

export { renderWithAuth0, shallowWithAuth0 };
