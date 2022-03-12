import React, { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';
import { Layout } from '../../components/layouts';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { Entry } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { useSnackbar } from 'notistack';
import { dateFunctions } from '../../utils';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry
}

const EntryPage: FC<Props> = ({entry}) => {

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  const isNotValid = useMemo(() => inputValue.length === 0 && touched, [inputValue, touched ]);
  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const handleInputChange = (value: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value.target.value);
  }
  
  const onStatusChange = (value: ChangeEvent<HTMLInputElement>) => {
    setStatus(value.target.value as EntryStatus);
  }

  const router = useRouter();

  const handleOnSave = () => {

    if(inputValue.trim().length === 0) return;
    
    entry.status = status
    entry.description = inputValue;
    updateEntry(entry);
    enqueueSnackbar('Entrada actualizada', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      autoHideDuration: 1300
    });
    router.push('/');
  }

  const handleDeleteButton = async () => {
    await deleteEntry(entry);
    enqueueSnackbar('Entrada eliminada', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      autoHideDuration: 1300
    });
    router.push('/');
  }

  return (
    <Layout title={entry.description.substring(0,20) + '...'}>
      <Grid
        container
        justifyContent={'center'}
        sx={{ marginTop: 1 }}
      >

        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField 
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Nueva entrada'
                value={inputValue}
                helperText={ isNotValid && 'Ingrese un valor'}
                onChange={handleInputChange}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup 
                  row
                  value={status}
                  onChange={onStatusChange}
                  >
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={ <Radio /> }
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

            </CardContent>
            <CardActions>
              <Button
                startIcon={ <SaveOutlinedIcon /> }
                variant='contained'
                fullWidth
                onClick={handleOnSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{ 
          position: 'fixed',
          bottom: 30, 
          right: 30,
          backgroundColor: 'error.dark'
        }}
        onClick={handleDeleteButton}
      >
        <DeleteOutlinedIcon />
      </IconButton>

    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  
  const { id } = params as { id:string }

  const entry = await dbEntries.getEntryById(id);
  
  if(!entry){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;
