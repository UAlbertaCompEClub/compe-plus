import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { Grid, Button } from '@material-ui/core';
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
        <Grid container item justify='center'>
            <form onSubmit={handleSubmit}>
                <Grid container item spacing={1} justify='center' alignItems='center'>
                    <Grid item>
                        <Paper className={`${classes.root} ${error ? classes.error : ''}`}>
                            <InputBase
                                onBlur={() => clearError()}
                                required
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
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderRadius: 0,
        backgroundColor: theme.palette.primary.light,
    },
    text_input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    error: {
        outline: `2px solid ${theme.palette.error.main}`,
    },
}));
