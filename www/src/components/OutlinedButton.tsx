// Libraries
import React, { FC } from 'react';

// Material UI
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) => ({
    root: {
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: theme.palette.text.secondary,
            color: theme.palette.primary.main,
        },
    },
});

type OutlinedButtonProps = {
    title: string;
    url: string;
    style?: CSSProperties;
};

const OutlinedButton: FC<OutlinedButtonProps & WithStyles<typeof styles>> = (props: OutlinedButtonProps & WithStyles<typeof styles>) => {
    return (
        <Button href={props.url} variant='outlined' size='small' color='secondary' style={props.style} className={props.classes.root}>
            {props.title}
        </Button>
    );
};

export default withStyles(styles)(OutlinedButton);
