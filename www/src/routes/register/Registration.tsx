import React, { FC } from 'react';

import StyledSelect from '../../components/Styledselect';
const Registration: FC = () => {
    return (
        <form>
            <StyledSelect title='Year' choices={['1', '2', '3', '4', '5', '5+']} />
            <StyledSelect title='Speciality' choices={['Computer Co-op', 'Software Co-op', 'Nano Co-op', 'Computer Trad', 'Nano Trad']} />
        </form>
    );
};
export default Registration;
