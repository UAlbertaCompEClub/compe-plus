import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeTermsOfServiceDialog } from '../../redux/slices/userSlice';

const TermsOfServiceDialog: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isTermsOfServiceDialogOpen } = useAppSelector((state) => state.user);

    const closeDialog = () => {
        dispatch(closeTermsOfServiceDialog());
    };

    const handleAgreeToTermsOfService = () => {
        // TODO: Update user hasAgreedToTermsOfService status
    };

    return (
        <Dialog onClose={closeDialog} open={isTermsOfServiceDialogOpen} scroll='paper' maxWidth='lg'>
            <DialogTitle>Terms of service</DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    <p>
                        <strong>IMPORTANT - LEGAL NOTICE</strong>
                    </p>
                    <p>
                        <u>CONFIDENTIALITY NOT GUARANTEED</u> — Confidentiality of any submissions by you, including your curriculum vitae / resume, cannot be guaranteed. Internet transmissions are
                        vulnerable to interception, use, viruses and/or alteration by person(s) other than the intended recipient(s). Further, submissions may be subject to review by multiple persons
                        involved with *.
                    </p>
                    <p>
                        <u>NO REPRESENTATIONS</u> - INFORMATION ONLY, NOT ADVICE – Any feedback or information provided to you by * or its members in relation to career planning, interview preparation
                        and curriculum vitae / resume review or otherwise is free of charge and merely the opinion of the person(s) providing such information. We caution that all such persons
                        providing the information are students and none are required to have any special expertise, designations or credentials in this area. All such information is therefore provided
                        without any representation or warranty, including without any representation of fitness for your purposes, and such information is not, and shall not be construed as,
                        professional advice upon which you should rely.
                    </p>
                    <p>
                        <u>DISCLAIMER OF LIABILITY</u> – Accordingly, any communications or submissions between you, * and any of its members, and any reliance by you on any information provided to
                        you as aforesaid, shall be done at your sole risk. None of *, nor its members, shall be liable for any damages or claims, whether direct, indirect, special, incidental,
                        punitive or consequential, suffered by you or any other person relating to the information provided to you or the disclosure or interception of any transmissions, submissions
                        or communications by or to you.
                    </p>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color='primary'>
                    Cancel
                </Button>
                <Button onClick={handleAgreeToTermsOfService} color='primary'>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TermsOfServiceDialog;
