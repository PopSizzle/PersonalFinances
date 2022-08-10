import React from 'react';
import getNextId from './getNextId';

const handleSubmit = (e, inputs, currObject, getState, setState, storageName) => {
  e.preventDefault();

  // Validation
  for(let element of inputs){
    if(!currObject[element]) alert(`Please enter an input for ${element}`)
  }

  let id = getNextId(getState);
  let temp = currObject

  setState({id: id, ...temp});

  // let totals = expenseTotals;
  // let cat = currExpense.category;
  // if(!totals[cat]){
  //   totals[cat] = {
  //     id: getNextId(totals),
  //     category: cat,
  //     total: 0
  //   }
  // }

  // totals[currExpense.category].total = parseFloat(totals[currExpense.category].total) + parseFloat(currExpense.cost);
  // setExpenseTotals(totals);
  // localStorage.setItem('totals', JSON.stringify({...expenseTotals}));

  let newState = getState;
  newState[id] = currObject;
  setState(newState);
  localStorage.setItem(storageName, JSON.stringify({...getState}));
  
}


export default handleSubmit