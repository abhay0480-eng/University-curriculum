

import { Button, Grid, IconButton, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoader, stopLoader } from '../store/loader'
import service from '../appwrite/config'
import { getProgramList } from '../store/programListSlice'

  const FormInput = ({ addNew, handleClose, notify }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const programList = useSelector((state) => state.program.programList);
  const id = useSelector((state) => state.saveId.updateId);

const itemDetails = !addNew?programList.filter((item)=> item.$id === id): ""

const initialFormData = {
    program: itemDetails[0]?.program || '',
    semesters: itemDetails[0]?.semesters || '',
    subjects:  itemDetails[0]?.subjects || [],
  };

  const [formData, setFormData] = useState(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleAddSubject = () => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        subjects: [...prevFormData.subjects, ''] // Adding an empty string as a placeholder for a new subject
      }
    })
  }

  const handleSubjectChange = (index, value) => {
    setFormData((prevFormData) => {
      const updatedSubjects = [...prevFormData.subjects]
      updatedSubjects[index] = value
      return {
        ...prevFormData,
        subjects: updatedSubjects
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      dispatch(startLoader())
      if (addNew) {
        console.log(formData)
        const AddProgramRes = await service.addProgramInfo({ ...formData })
        console.log("AddProgramRes", AddProgramRes)
        if (AddProgramRes) {
          notify()
          const setProgramList = await service.getProgramList()
          if (setProgramList.documents.length > 0) {
            dispatch(getProgramList(setProgramList))
          }
        }
      } else {
        const updateProgramRes =  await service.updateProgramInfo({ ...formData },id)
        console.log("updateProgramRes")
        if (updateProgramRes) {
            handleClose()
            const setProgramList = await service.getProgramList()
            if (setProgramList.documents.length > 0) {
              dispatch(getProgramList(setProgramList))
            }
          }

      }
    } catch (error) {
      setError(error.message)
    } finally {
        resetForm();
      dispatch(stopLoader())
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoader())
        const setProgramList = await service.getProgramList()
        if (setProgramList.documents.length > 0) {
          dispatch(getProgramList(setProgramList))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        dispatch(stopLoader())
      }
    }

    fetchData()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Program Name"
          fullWidth
          margin="normal"
          value={formData.program}
          name='program'
          onChange={handleChange}
        />

        <TextField
          label="Number of Semesters"
          fullWidth
          margin="normal"
          type="number"
          value={formData.semesters}
          name='semesters'
          onChange={handleChange}
        />

</Stack>

        <Grid container spacing={2} alignItems="center">
          <Grid item lg={10}>
            {formData.subjects.map((subject, index) => (
              <TextField
                key={index}
                label={`Subject ${index + 1}`}
                fullWidth
                margin="normal"
                value={subject}
                onChange={(e) => handleSubjectChange(index, e.target.value)}
              />
            ))}
          </Grid>
          <Grid item lg={2}>
            <IconButton color="primary" size='small' onClick={handleAddSubject}>
              Add Subject
            </IconButton>
          </Grid>
        </Grid>

        <Button type='submit' fullWidth  variant="contained">{addNew?"Add Program":"Update Program"}</Button>
      
    </form>
  )
}

export default FormInput
