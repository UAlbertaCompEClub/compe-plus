import {
    Button,
    ButtonGroup,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    withStyles,
} from '@material-ui/core';
import React, { FC, useState } from 'react';

import { UserRole } from '../../util/serverResponses';

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

interface UserTableProps {
    users: UserRole[];
    action: (user: UserRole, isChecked: boolean, role: string) => void;
}

const UserTable: FC<UserTableProps> = (props: UserTableProps) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align='right'>Roles</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {props.users.map((user) => {
                        return (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component='th' scope='row'>
                                    {user.fullName}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    <FormControl>
                                        <FormGroup>
                                            {props.users.map((user) => {
                                                <>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox checked={user.roles.includes('student')} onChange={(e) => props.action(user, e.target.checked, e.target.name)} name='Student' />
                                                        }
                                                        label='Student'
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={user.roles.includes('reviewer') && user.roles.includes('interviewer')}
                                                                onChange={(e) => props.action(user, e.target.checked, e.target.name)}
                                                                name='Volunteer'
                                                            />
                                                        }
                                                        label='Volunteer'
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox checked={user.roles.includes('admin')} onChange={(e) => props.action(user, e.target.checked, e.target.name)} name='Admin' />}
                                                        label='Admin'
                                                    />
                                                </>;
                                            })}
                                        </FormGroup>
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

type userRoleState = {
    id: string;
    isAssigned: boolean;
    role: string;
};

const initialUserRoleState: userRoleState[] = [];

const Landing: FC = () => {
    // TODO: get users
    const [userRoles, setUserRoles] = useState(initialUserRoleState);

    const assignRole = (user: UserRole, isAssigned: boolean, role: string) => {
        setUserRoles([...userRoles, { id: user.id, isAssigned: isAssigned, role: role }]);
    };

    // TODO: render table (paginate??)
    return <div></div>;
};

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    wrapper: {
        marginTop: 25,
        marginBottom: 25,
    },
    pageGrid: {
        padding: 50,
    },
});

export default Landing;
