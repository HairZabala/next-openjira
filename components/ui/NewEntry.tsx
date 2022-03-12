import React, { ChangeEvent, useState, useContext } from 'react'
import { Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box } from '@mui/system';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const handleInputChange = (value: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value.target.value);
  }

  const onSave = () => {
    if(inputValue.length === 0) return;

    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  }

  const handleCancelButton = () => {
    setIsAddingEntry(false);
    setTouched(false);
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      
      {!isAddingEntry ? (
        <Button
          startIcon={ <AddCircleOutlineOutlinedIcon /> }
          fullWidth
          variant='outlined'
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      ) : (
        <>
          <TextField 
            fullWidth
            sx={{
              marginTop: 2,
              marginBottom: 1
            }}
            placeholder='Nueva entrada'
            autoFocus
            multiline
            label='Nueva entrada'
            helperText={inputValue.length === 0 && touched && 'Ingrese un valor'}
            error={inputValue.length === 0 && touched}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={() => setTouched(true)}
          />

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Button
              variant='text'
              onClick={handleCancelButton}
            >
              Cancelar
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      )}

    </Box>
  )
}
