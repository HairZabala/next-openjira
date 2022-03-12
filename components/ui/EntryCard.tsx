import React, { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui';

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({entry}) => {

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('entryID', entry._id);
    startDragging()
  }

  const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
    // todo: cancelar on drag
    endDragging()
  }

  const { startDragging, endDragging } = useContext(UIContext);

  return (
    <Card sx={{
      marginBottom: 1
      // evento del drag
    }}
    draggable
    onDragStart={ onDragStart }
    onDragEnd={ onDragEnd }
    >
      
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>
            { entry.createdAt }
          </Typography>
        </CardActions>
      </CardActionArea>

    </Card>
  )
}
