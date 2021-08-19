import { Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import validator from 'validator';

import config from '../util/config';
import { Form } from './Form';

const MailChimpForm: FC = () => {
    const getMessage = (status: string | null): string => {
        if (status == 'error') {
            return 'Something went wrong 😔 Please try again';
        } else if (status == 'sending') {
            return 'Adding you to the mailing list...';
        } else if (status == 'success') {
            return 'You have been added to the mailing list 😀';
        }

        return '';
    };
    return (
        <Grid container item justify='center' alignItems='center' direction='column' spacing={2}>
            <MailchimpSubscribe
                url={config.mailchimpUrl}
                render={({ subscribe, status }) => (
                    <Grid container item justify='center' alignItems='center' spacing={1}>
                        <Grid container item justify='center' alignItems='center'>
                            <Form
                                textPlaceholder='Email Address'
                                callback={(email) => {
                                    subscribe({ EMAIL: email });
                                }}
                                buttonPlaceholder='Submit'
                                valueValidator={(email) => validator.isEmail(email)}
                            />
                        </Grid>

                        <Grid container item justify='center' alignItems='center'>
                            <Typography align='center' variant='body1' style={{ fontWeight: 200 }}>
                                {getMessage(status)}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            />
            <Grid item>
                <Typography variant='body1' align='center' style={{ fontWeight: 200, fontSize: 22 }}>
                    We promise not to spam you 😁
                </Typography>
            </Grid>
        </Grid>
    );
};

export default MailChimpForm;
