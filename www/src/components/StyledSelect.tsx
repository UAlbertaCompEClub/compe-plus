import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { FC } from 'react';

type StyledSelectProps = { choices: string[]; title: string; value: string; onChange: (value: string) => void };

const StyledSelect: FC<StyledSelectProps> = (props: StyledSelectProps) => {
    return (
        <FormControl style={{ width: '100%' }}>
            <InputLabel id='demo-simple-select-label' style={{ color: '#000' }}>
                {props.title}
            </InputLabel>

            <Select labelId='demo-simple-select-label' id='demo-simple-select' value={props.value} onChange={(e) => props.onChange(e.target.value as string)}>
                {props.choices.map((choice) => (
                    <MenuItem key={choice} value={choice}>
                        {choice}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default StyledSelect;
