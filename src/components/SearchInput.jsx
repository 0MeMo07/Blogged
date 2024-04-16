import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { RiSearchLine } from 'react-icons/ri';

const SearchInput = ({ onChange, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onChange(e.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="standard"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleInputChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <RiSearchLine style={{ color: '#757575' }} />
          </InputAdornment>
        ),
        style: { marginBottom: '10px' },
      }}
    />
  );
};

export default SearchInput;
