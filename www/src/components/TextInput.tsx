import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { Grid, Button } from '@material-ui/core';
import useGlobalStyles from '../styles/style';

type TextInputProps = {
    textPlaceholder: string;
    callback: (value: string) => void;
    buttonPlaceholder: string;
};

export const TextInput: FC<TextInputProps> = (props: TextInputProps) => {
    const { textPlaceholder, callback, buttonPlaceholder } = props;
    const classes = useStyles();
    const global = useGlobalStyles();
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        callback(value);
        e.preventDefault();
    };

    return (
        <Grid container item justify='center' spacing={1}>
            <form onSubmit={handleSubmit}>
                <Grid item>
                    <Paper className={classes.text_input_root}>
                        <InputBase required className={classes.text_input} placeholder={textPlaceholder} onChange={(e) => setValue(e.target.value)} />
                    </Paper>
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained' className={global.main_button}>
                        {buttonPlaceholder}
                    </Button>
                </Grid>
            </form>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    text_input_root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderRadius: 0,
    },
    text_input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    text_input_icon_button: {
        padding: 10,
    },
    text_input_divider: {
        height: 28,
        margin: 4,
    },
}));
