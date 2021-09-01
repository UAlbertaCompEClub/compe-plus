import { useAuth0 } from '@auth0/auth0-react';
import {
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
import React, { FC, useEffect, useState } from 'react';

import { useAdminDispatch, useAdminSelector } from '../../redux/substores/admin/adminHooks';
import getAllUserRoles from '../../redux/substores/admin/thunks/getAllUserRoles';
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
    userRoles: UserRole[];
    action: (user: UserRole, isChecked: boolean, role: string) => void;
}

const UserRoleTable: FC<UserTableProps> = (props: UserTableProps) => {
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
                    {props.userRoles.map((userRole) => {
                        return (
                            <StyledTableRow key={userRole.id}>
                                <StyledTableCell component='th' scope='row'>
                                    {userRole.fullName}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    <FormControl>
                                        <FormGroup>
                                            {props.userRoles.map((user) => {
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
    const classes = useStyles();
    const { userRoles, userRolesIsLoading, shouldReload } = useAdminSelector((state) => state.userRoles);
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useAdminDispatch();

    const [updatedUserRoles, setUpdatedUserRoles] = useState(initialUserRoleState);

    useEffect(() => {
        if (shouldReload) {
            dispatch(getAllUserRoles({ tokenAcquirer: getAccessTokenSilently }));
        }
    }, [shouldReload]);

    const assignRole = (user: UserRole, isAssigned: boolean, role: string) => {
        setUpdatedUserRoles([...updatedUserRoles, { id: user.id, isAssigned: isAssigned, role: role }]);
    };

    return (
        <Grid container justify='center' alignItems='center' direction='column' className={classes.pageGrid}>
            <Grid container justify='flex-start' alignItems='flex-start' direction='column'>
                <Typography variant='h1'>Users</Typography>
                <Grid container justify='flex-start' alignItems='flex-start' className={classes.wrapper}>
                    {userRolesIsLoading && (
                        <Grid container justify='center' alignItems='flex-start'>
                            <CircularProgress />
                        </Grid>
                    )}
                    {!userRolesIsLoading && userRoles.length == 0 && <Typography>There are no users in CompE+, something is wrong :(</Typography>}
                    {!userRolesIsLoading && userRoles.length > 0 && <UserRoleTable userRoles={userRoles} action={assignRole} />}
                </Grid>
            </Grid>
        </Grid>
    );
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
