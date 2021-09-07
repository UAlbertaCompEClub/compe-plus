import { makeStyles } from '@material-ui/core/styles';

const useGlobalStyles = makeStyles((theme) => ({
    main_button: {
        backgroundColor: theme.palette.primary.dark,
        outlineColor: theme.palette.primary.dark,
        color: theme.palette.primary.light,
        fontWeight: 500,
        borderRadius: 0,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
        },
    },
    secondary_button: {
        border: '2px solid',
        outlineColor: theme.palette.primary.dark,
        color: theme.palette.primary.dark,
        fontWeight: 500,
        borderRadius: 0,
        '&:hover': {
            color: theme.palette.primary.light,
            outlineColor: theme.palette.primary.light,
        },
        transition: theme.transitions.create(['background-color', 'color'], {
            duration: theme.transitions.duration.short,
        }),
    },
}));

export default useGlobalStyles;
