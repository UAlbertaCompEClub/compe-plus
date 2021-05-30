import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface ThemeOptions {
        themeName?: string;
    }
}

const palette = {
    primary: {
        main: '#79B178',
    },
    secondary: {
        main: '#D9FFD9',
    },
    text: {
        primary: '#FFFFFF',
    },
};

const typography = {
    h1: {
        fontSize: 62,
        fontWeight: 600,
    },
    h2: {
        fontSize: 28,
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
    body2: {
        fontWeight: 600,
    },
    button: {
        color: '#FFFFFF',
    },
    fontSize: 18,
    // allVariants: {
    //     color: '#FFFFFF',
    // },
};

const themeName = 'CompE+ Theme';

export default createMuiTheme({ palette, typography, themeName });
