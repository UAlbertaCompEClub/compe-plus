import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface ThemeOptions {
        themeName?: string;
    }
}

const palette = {
    primary: {
        main: '#79B178',
        light: '#E2F8E2',
        dark: '#124612',
    },
    text: {
        primary: '#000000',
        secondary: '#FFFFFF',
    },
    background: {
        default: '#E2F8E2',
    },
};

const typography = {
    h1: {
        fontSize: 62,
        fontWeight: 600,
    },
    h2: {
        fontSize: 32,
        fontWeight: 50,
    },
    h3: {
        fontSize: 26,
        fontWeight: 50,
    },
    h5: {
        fontSize: 24,
        fontWeight: 600,
    },
    body1: {
        fontSize: 24,
    },
    body2: {
        fontWeight: 600,
    },
    button: {
        color: '#FFFFFF',
    },
    fontSize: 18,
};

const themeName = 'CompE+ Theme';

export default responsiveFontSizes(createMuiTheme({ palette, typography, themeName }));
