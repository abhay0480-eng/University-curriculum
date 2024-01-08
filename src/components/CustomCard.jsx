import React from 'react'
import { useDispatch } from 'react-redux';
import { getSaveId } from '../store/saveIdSlice';
import { CardActions, CardContent, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Delete, Update } from '@mui/icons-material';

const CustomCard = ({ program, semesters, subjects,id,deleteProgram,handleOpen}) => {

    const dispatch = useDispatch()
  return (
    <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Program
      </Typography>
      <Typography variant="h5" component="div">
        {program}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Semesters
      </Typography>
      <Typography variant="body2">
        {semesters}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Subjects
      </Typography>
      <Typography variant="body2">
        {subjects.join(', ')}
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={()=>deleteProgram(id)}  size="small"><Delete/></Button>
      <Button onClick={() => { dispatch(getSaveId(id)); handleOpen();  }}  size="small"><Update/></Button>
    </CardActions>
  </React.Fragment>
  )
}

export default CustomCard