import React, { FC, useState } from 'react';

import StyledSelect from '../../components/Styledselect';
const Registration: FC = () => {
    const [year, setYear] = useState('');
    const [speciality, setSpeciality] = useState('');
    return (
        <form>
            <StyledSelect title='Year' value={year} onChange={setYear} choices={['1', '2', '3', '4', '5', '5+']} />
            <StyledSelect title='Speciality' value={speciality} onChange={setSpeciality} choices={['Computer Co-op', 'Software Co-op', 'Nano Co-op', 'Computer Trad', 'Nano Trad']} />
        </form>
    );
};
export default Registration;
