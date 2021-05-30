// Libraries
import React, { FC } from 'react';

// Material UI
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) => ({
    root: {
        borderRadius: '10px',
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.primary,
        '&:hover': {
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.primary.main,
        },
    },
});

type Props = {
    title: string;
    url: string;
    style?: CSSProperties;
};

const OutlinedButton: FC<Props & WithStyles<typeof styles>> = (props: Props & WithStyles<typeof styles>) => {
    return (
        <Button href={props.url} variant="outlined" size="small" color="secondary" style={props.style} className={props.classes.root}>
            {props.title}
        </Button>
    );
};

export default withStyles(styles)(OutlinedButton);
