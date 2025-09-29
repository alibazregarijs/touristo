import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

type SelectFieldProps = {
  label: string;
  placeholder?: string;
  options: string[];
  defaultValue?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  placeholder,
  options,
  defaultValue,
}) => {
  return (
    <Autocomplete
      options={options}
      defaultValue={defaultValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />
      )}
    />
  );
};

export default SelectField;
