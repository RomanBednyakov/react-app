import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {getListUsers} from "../../common/api";


const InputAutoComplete = (props) => {
    const {setActiveName, checkError} = props;
    const [options, setOptions] = React.useState([]);

    const handleChange = async (e, newValue) => {
        if (newValue) {
            const response = await getListUsers(newValue);
            if (response.errorState) {
                checkError(response.error);
            } else {
                setOptions(response);
            }
        } else {
            setOptions([]);
        }
        setActiveName(newValue)
    };
    return (
        <Autocomplete
            id="size-small-standard"
            options={options}
            getOptionLabel={(option) => option.name}
            style={{width: '100%'}}
            onInputChange={handleChange}
            renderOption={(option) => (
                <React.Fragment>
                    <span>{option.name}</span>
                </React.Fragment>
            )}
            renderInput={params => {
                return (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Select user"
                        placeholder="Favorites"
                        fullWidth
                    />
                )
            }}
        />
    );
};
export default InputAutoComplete;