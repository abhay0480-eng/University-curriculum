import { Backdrop, Box, Button, Card, CardActions, CardContent, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { startLoader, stopLoader } from './store/loader';
import { useDispatch, useSelector } from 'react-redux';
import service from './appwrite/config';
import { getProgramList } from './store/programListSlice';
import FormInput from './components/FormInput';
import { Delete, Update } from '@mui/icons-material';
import UpdateProgram from './components/UpdateProgram';
import { getSaveId } from './store/saveIdSlice';

const App = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.loader.status);
  const programList = useSelector((state) => state.program.programList);
  const [error, setError] = useState("")
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  async function deleteProgram(detailsid){
    try {
      dispatch(startLoader())
      const deleteRes =  await service.deleteProgram({documentId:detailsid})
      console.log("delete",deleteRes);
      if(deleteRes){
        const setProgramList = await service.getProgramList()
        if (setProgramList.documents.length > 0) {
          dispatch(getProgramList(setProgramList))
        }
    }
    } catch (error) {
        setError(error.message)
    }finally{
      dispatch(stopLoader())
    }
  }

  const CustomCard = ({ program, semesters, subjects,id}) => (
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
  );

  console.log(programList);

  return (
   <Container maxWidth="lg">
     <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

    <UpdateProgram open={open} setOpen={setOpen} handleClose={handleClose} handleOpen={handleOpen}  />

    <Paper elevation={3} style={{ padding: '20px', marginTop:'20px' }}>
    <FormInput addNew={true}/>
    </Paper>

    <Grid container spacing={3} style={{ marginTop: '20px' }}>
      {programList.length>0 && programList?.map((item, index) => (
        <Grid item lg={4} key={index}>
          <Paper elevation={3} style={{ padding: '10px' }}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{
              <CustomCard
                program={item.program}
                semesters={item.semesters}
                subjects={item.subjects}
                id={item.$id}
              />}
          </Card>
          </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
   </Container>
  )
}

export default App