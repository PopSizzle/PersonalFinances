import { React, useEffect, useState } from 'react';
import Table from '../../Components/Table';
import Form from '../../Components/Form';

const Exercise = () => {

  const [currExercise, setCurrExercise] = useState({});
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() =>{
    localStorage.setItem('exercises', JSON.stringify({...exerciseData}));
  }, [exerciseData]);

  let title1 = 'Exercise Log';
  let cols1 = ['Date', 'Type', 'Description'];
  let data1 = [];

  let form1Inputs = ['date','type','description'];
  let form1Title = 'Add Exercise';

  const getNextId = (object) =>{
    
    let id;
    let keys = Object.keys(object);
  
    // Find the next available id
    for(let i=0; i<keys.length+1; i++){
      if(!keys[i] || parseInt(keys[i]) !== i+1){
      id=i+1;
      break;
      }
    }

    return id;
  }

  const handleExerciseChange = (e) =>{
    let key = e.target.id;
    let exercise = currExercise;
    exercise[key] = e.target.value.toLowerCase();
    setCurrExercise(exercise);
  }

  const handleExerciseSubmit = (e) =>{
    e.preventDefault();

    let id = getNextId(exerciseData);
    let exercise = currExercise;

    setCurrExercise({id: id, ...exercise});

    let exercises = exerciseData;
    exercises[id] = currExercise;
    setExerciseData(exercises);

    localStorage.setItem('exercises', JSON.stringify({...exerciseData}));
  }

  const clearExerciseForm = (e) =>{
    e.preventDefault();
  
    for(let element of form1Inputs){
      document.getElementById(element).value = '';
    }
  }

  return (
    <div>
      <Form inputs={form1Inputs} title={form1Title} handleChange={handleExerciseChange} handleSubmit={handleExerciseSubmit} clear={clearExerciseForm} />
      <Table title={title1} cols={cols1} data={data1} edit={false} />
    </div>
  )
}

export default Exercise;