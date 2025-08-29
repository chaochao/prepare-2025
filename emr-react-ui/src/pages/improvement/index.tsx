import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Paper } from '@mui/material';

export default function StateTextFields() {
  const [name, setName] = React.useState('in control');
  const [display, setDisplay] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = () => {
    const inputValue = inputRef.current ? inputRef.current.value : '';
    setDisplay(inputValue)
  };
  console.log("refresh")
  return (
    <Box component="div" sx={{margin: '1rem'}}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom:'0.5rem'}}>
        <TextField  id="outlined-uncontrolled" label="Ref" defaultValue="foo" inputRef={inputRef} />
        <TextField
          label="Controlled"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
      </div>
      <Button variant="outlined" onClick={handleClick}>Get ref value</Button> <span>{display}</span>
    </Box>
  );
}