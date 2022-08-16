import { React, useEffect, useState } from 'react';
import Table from '../../Components/Table';
import Form from '../../Components/Form';

const Exercise = () => {

  const [currExercise, setCurrExercise] = useState({});
  const [exerciseData, setExerciseData] = useState(JSON.parse(localStorage.getItem('exercises')) ? JSON.parse(localStorage.getItem('exercises')) : {});
  const [exerciseTotals, setExerciseTotals] = useState(JSON.parse(localStorage.getItem('exerciseTotals')) ? JSON.parse(localStorage.getItem('exerciseTotals')) : {});

  useEffect(() =>{
    localStorage.setItem('exercises', JSON.stringify({...exerciseData}));
    localStorage.setItem('exerciseTotals', JSON.stringify({...exerciseTotals}));
  }, [exerciseData, exerciseTotals]);

  let title1 = 'Exercise Log';
  let cols1 = ['Date', 'Type', 'Description', 'Time', 'Distance'];

  let title2 = 'Exercise Types';
  let cols2 = ['Type', 'Total time', 'Total Distance (if applicable)']

  let form1Inputs = ['date','type','description', 'time', 'distance'];
  let form1Title = 'Add Exercise';

  // localStorage.clear();

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

    for(let element of form1Inputs){
      if(!currExercise[element]) return alert(`Please enter an input for ${element}`)
    }


    let id = getNextId(exerciseData);
    let exercise = currExercise;

    setCurrExercise({id: id, ...exercise});

    let totals = exerciseTotals;
    let type = currExercise.type;
    if(!totals[type]){
      totals[type] = {
        id: getNextId(totals),
        type: type,
        totalTime: 0,
        totalDistance: ''
      }
    }

    totals[type].totalTime = parseFloat(totals[type].totalTime) + parseFloat(exercise.time);
    if(exercise.distance > 0){
      if(totals[type].distance === '') totals[type].distance = 0;
      totals[type].distance = parseFloat(totals[type].distance) + parseFloat(exercise.distance)
    }

    setExerciseTotals(totals);
    localStorage.setItem('exerciseTotals', JSON.stringify({...exerciseTotals}))

    let exercises = exerciseData;
    exercises[id] = exercise;
    setExerciseData(exercises);

    localStorage.setItem('exercises', JSON.stringify({...exerciseData}));
  }

  const clearExerciseForm = (e) =>{
    e.preventDefault();
  
    for(let element of form1Inputs){
      document.getElementById(element).value = '';
    }
  }

  const deleteExercise = (e) =>{
    e.preventDefault();

    let id = e.target.id;
    let time = parseFloat(exerciseData[id].time);
    let type = exerciseData[id].type;

    let totals = {...exerciseTotals};
    totals[type].time = parseFloat(totals[type].time) - time;
    if(!totals[type].time) delete totals[type];
    setExerciseTotals(totals);
    localStorage.setItem('exerciseTotals', JSON.stringify({...exerciseTotals}));

    let exercises = {...exerciseData};
    delete exercises[id];
    setExerciseData(exercises);
    localStorage.setItem('exercises', JSON.stringify({...exerciseData}));
  }

  return (
    <div>
      <Form inputs={form1Inputs} title={form1Title} handleChange={e=>handleExerciseChange(e)} handleSubmit={e=>handleExerciseSubmit(e)} clear={clearExerciseForm} />
      <Table title={title1} cols={cols1} data={exerciseData} edit={true} deleteFunction={e=> deleteExercise(e)}/>
      <Table title={title2} cols={cols2} data={exerciseTotals} edit={false} />
    </div>
  )
}

export default Exercise;