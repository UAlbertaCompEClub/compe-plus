import { Button, Grid } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC, useState } from 'react';

import useGlobalStyles from '../styles/style';

type FormProps = {
    textPlaceholder: string;
    callback: (value: string) => void;
    buttonPlaceholder: string;
    valueValidator: (value: string) => boolean;
};

export const Form: FC<FormProps> = (props: FormProps) => {
    const { textPlaceholder, callback, buttonPlaceholder, valueValidator } = props;
    const classes = useStyles();
    const global = useGlobalStyles();
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        if (valueValidator(value)) {
            callback(value);
        } else {
            setError('Invalid email!');
        }
        e.preventDefault();
    };

    const clearError = () => {
        if (error) {
            setError('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container item spacing={1} justify='center' alignItems='center'>
                <Grid item>
                    <Paper elevation={3} square className={`${classes.root} ${error ? classes.error : ''}`}>
                        <InputBase
                            onBlur={() => clearError()}
                            required
                            fullWidth
                            className={classes.text_input}
                            placeholder={textPlaceholder}
                            onChange={(e) => {
                                clearError();
                                setValue(e.target.value);
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained' className={global.main_button}>
                        {buttonPlaceholder}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
    },
    text_input: {
        paddingLeft: '5px',
        paddingRight: '5px',
        flex: 1,
    },
    error: {
        outline: `2px solid ${theme.palette.error.main}`,
    },
}));
