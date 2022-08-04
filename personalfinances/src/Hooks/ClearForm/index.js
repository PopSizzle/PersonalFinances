import React from 'react';

const clearExpenseForm = (e, array) =>{
  e.preventDefault();

  for(let element of array){
    document.getElementById(element).value = '';
  }
}

export default clearExpenseForm;