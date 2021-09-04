import { useAuth0 } from '@auth0/auth0-react';
import {
    Button,
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
import useGlobalStyles from '../../styles/style';
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
    userRoles: userRoleTableEntries;
    action: (id: string, isUnassigned: boolean, role: string) => void;
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
                    {Object.entries(props.userRoles).map(([id, userRole]) => {
                        return (
                            <StyledTableRow key={id}>
                                <StyledTableCell component='th' scope='row'>
                                    {userRole.name}
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                    <FormControl>
                                        <FormGroup>
                                            <>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={userRole.roles.includes('student')}
                                                            onChange={(e) => props.action(id, !e.target.checked, e.target.name)}
                                                            name='student'
                                                            color='primary'
                                                        />
                                                    }
                                                    label='Student'
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={userRole.roles.includes('reviewer')}
                                                            onChange={(e) => props.action(id, !e.target.checked, e.target.name)}
                                                            name='reviewer'
                                                            color='primary'
                                                        />
                                                    }
                                                    label='Reviewer'
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={userRole.roles.includes('interviewer')}
                                                            onChange={(e) => props.action(id, !e.target.checked, e.target.name)}
                                                            name='interviewer'
                                                            color='primary'
                                                        />
                                                    }
                                                    label='Interviewer'
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={userRole.roles.includes('admin')}
                                                            onChange={(e) => props.action(id, !e.target.checked, e.target.name)}
                                                            name='admin'
                                                            color='primary'
                                                        />
                                                    }
                                                    label='Admin'
                                                />
                                            </>
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

type userRoleTableEntries = {
    [key: string]: {
        roles: string[];
        name: string;
    };
};

type SuperSet = {
    [key: string]: number;
};

const initialUserRoleTableState: userRoleTableEntries = {};
const initialUpdatedUserRolesState: string[] = [];

// https://stackoverflow.com/questions/6229197/how-to-know-if-two-arrays-have-the-same-values/55614659#55614659
function areArraysEqualSets(a1: string[], a2: string[]) {
    const superSet: SuperSet = {};
    for (const i of a1) {
        const e = i + typeof i;
        superSet[e] = 1;
    }

    for (const i of a2) {
        const e = i + typeof i;
        if (!superSet[e]) {
            return false;
        }
        superSet[e] = 2;
    }

    for (const e in superSet) {
        if (superSet[e] === 1) {
            return false;
        }
    }

    return true;
}

const Landing: FC = () => {
    const classes = useStyles();
    const globalClasses = useGlobalStyles();
    const { userRoles, userRolesIsLoading, shouldReload } = useAdminSelector((state) => state.userRoles);
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useAdminDispatch();

    const [userRolesTable, setUserRolesTable] = useState(initialUserRoleTableState);
    const [originalUserRoles, setOriginalUserRoles] = useState(initialUserRoleTableState);
    const [updatedUserRoles, setUpdatedUserRoles] = useState(initialUpdatedUserRolesState);

    const createUserRolesTable = (userRoles: UserRole[]) => {
        return userRoles.reduce((accum, userRole) => ({ ...accum, [userRole.id]: { roles: userRole.roles, name: userRole.fullName } }), {});
    };

    const updateRole = (id: string, isUnassigned: boolean, role: string) => {
        const updatedRoles = isUnassigned ? userRolesTable[id].roles.filter((userRole) => userRole !== role) : [...userRolesTable[id].roles, role];

        if (areArraysEqualSets(originalUserRoles[id].roles, updatedRoles)) {
            setUpdatedUserRoles(updatedUserRoles.filter((userId) => userId !== id));
        } else if (!updatedUserRoles.includes(id)) {
            setUpdatedUserRoles([...updatedUserRoles, id]);
        }

        setUserRolesTable({ ...userRolesTable, [id]: { ...userRolesTable[id], roles: updatedRoles } });
    };

    useEffect(() => {
        if (shouldReload) {
            dispatch(getAllUserRoles({ tokenAcquirer: getAccessTokenSilently }));
        }
    }, [shouldReload]);

    useEffect(() => {
        if (userRoles.length > 0) {
            setUserRolesTable(createUserRolesTable(userRoles));
            setOriginalUserRoles(createUserRolesTable(userRoles));
        }
    }, [userRoles]);

    return (
        <Grid container justify='center' alignItems='center' direction='column' className={classes.pageGrid}>
            <Grid container justify='flex-start' alignItems='flex-start' direction='column'>
                <Typography variant='h1'>Users</Typography>
                <Button disabled={updatedUserRoles.length <= 0} className={globalClasses.main_button}>
                    Update Roles
                </Button>
                <Grid container justify='flex-start' alignItems='flex-start' className={classes.wrapper}>
                    {userRolesIsLoading && (
                        <Grid container justify='center' alignItems='flex-start'>
                            <CircularProgress />
                        </Grid>
                    )}
                    {!userRolesIsLoading && userRoles.length == 0 && <Typography>There are no users in CompE+, something is wrong :(</Typography>}
                    {!userRolesIsLoading && userRoles.length > 0 && <UserRoleTable userRoles={userRolesTable} action={updateRole} />}
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
