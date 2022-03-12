import React, { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({entry}) => {

  const router = useRouter();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('entryID', entry._id);
    startDragging()
  }

  const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
    // todo: cancelar on drag
    endDragging()
  }

  const { startDragging, endDragging } = useContext(UIContext);

  const handleOnClick = () => {
    router.push(`/entries/${entry._id}`);
  }

  return (
    <Card 
      onClick={handleOnClick}
      sx={{
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
            { dateFunctions.getFormatDistanceToNow(entry.createdAt) }
          </Typography>
        </CardActions>
      </CardActionArea>

    </Card>
  )
}
