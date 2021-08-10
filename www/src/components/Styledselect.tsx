import { InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { FC } from 'react';
type StyledSelectProps = { choices: string[]; title: string };
const StyledSelect: FC<StyledSelectProps> = (props: StyledSelectProps) => {
    return (
        <div>
            <InputLabel id='demo-simple-select-label'>{props.title}</InputLabel>

            <Select labelId='demo-simple-select-label' id='demo-simple-select'>
                {props.choices.map((choice) => (
                    <MenuItem key={choice} value={choice}>
                        {choice}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};
{
    /* <Select 
onChange = {(event) => props.handleChange(event.target.value)}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function MultilineTextFields() {
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setValue(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete='off'>
            <div>
                <TextField id='outlined-multiline-flexible' label='Year' multiline maxRows={4} value={value} onChange={handleChange} variant='outlined' />
            </div>
            <div>
                <TextField id='outlined-multiline-flexible' label='Speciality' multiline maxRows={4} value={value} onChange={handleChange} variant='outlined' />
            </div>
            <select>
              choices.map(el => <MenuItem value = {el.value}></MenuItem>
            </select>
        </form>
    );
} */
}
export default StyledSelect;
