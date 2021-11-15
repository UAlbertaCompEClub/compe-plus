import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { Overrides } from '@material-ui/core/styles/overrides';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface ThemeOptions {
        themeName?: string;
    }
}

const palette: PaletteOptions = {
    primary: {
        main: '#79B178',
        light: '#ABD3AB',
        dark: '#124612',
        contrastText: '#fff',
    },
    secondary: {
        main: '#D9FFD9',
        light: '#E2F8E2',
    },
    text: {
        primary: '#000000',
        secondary: '#FFFFFF',
    },
    background: {
        default: '#E2F8E2',
    },
    error: {
        main: '#820B00',
    },
};

const typography: TypographyOptions = {
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

const overrides: Overrides = {
    MuiPaper: {
        rounded: {
            borderRadius: 0,
        },
        root: {
            backgroundColor: '#ABD3AB',
        },
    },
};

export default responsiveFontSizes(
    createMuiTheme({
        palette,
        typography,
        themeName,
        overrides,
    }),
);
