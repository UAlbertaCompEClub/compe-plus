import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import dateFormat from 'dateformat';
import React, { FC } from 'react';

import { ResumeReviewWithUserDetails as RRWUD } from '../../util/serverResponses';

interface Action {
    name: string;
    func: (resumeReview: RRWUD) => void;
}

interface ResumeReviewTableProps {
    resumes: RRWUD[];
    actions: Action[];
}

const ResumeReviewTable: FC<ResumeReviewTableProps> = (props: ResumeReviewTableProps) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Uploaded On</StyledTableCell>
                        <StyledTableCell align='right'>Actions</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {props.resumes.map((resume) => {
                        return (
                            <StyledTableRow key={resume.id}>
                                <StyledTableCell component='th' scope='row'>
                                    {resume.revieweeName}
                                </StyledTableCell>
                                <StyledTableCell>{dateFormat(new Date(resume.createdAt), 'dddd, mmmm dS yyyy')}</StyledTableCell>
                                <StyledTableCell align='right'>
                                    <ButtonGroup>
                                        {props.actions.map((action) => {
                                            return (
                                                <Button key={action.name} onClick={() => action.func(resume)}>
                                                    {action.name}
                                                </Button>
                                            );
                                        })}
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        fontSize: 18,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default ResumeReviewTable;
