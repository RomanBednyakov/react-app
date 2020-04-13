import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {getListUsers} from "../../common/thunks/user";


const InputAutoComplete = (props) => {
  const {setActiveName, createNotification, userInfo} = props;
  const [options, setOptions] = React.useState([]);

  const handleChange = async (e, newValue) => {
    if (newValue) {
      const {res, err} = await getListUsers(newValue);
      if (err) {
        createNotification('error', 'Invalid user', err);
      } else {
        const filteredRes  = res.filter(user => user.id !== userInfo.id);
        setOptions(filteredRes);
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
