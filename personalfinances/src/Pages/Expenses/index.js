import { React, useEffect, useState } from 'react';
import Table from '../../Components/Table';
import Form from '../../Components/Form';

const Expenses = () => {

  const [currExpense, setCurrExpense] = useState({});
  const [expenseData, setExpenseData] = useState(JSON.parse(localStorage.getItem('expenses')) ? JSON.parse(localStorage.getItem('expenses')) : {});
  const [expenseTotals, setExpenseTotals] = useState(JSON.parse(localStorage.getItem('totals')) ? JSON.parse(localStorage.getItem('totals')) : {});

  useEffect(() =>{
    localStorage.setItem('expenses', JSON.stringify({...expenseData}));
    localStorage.setItem('totals', JSON.stringify({...expenseTotals}));
  },[expenseData, expenseTotals]);

  let title1 = 'Expense Tracker';
  let cols1 = ['Date', 'Description', 'Category', 'Cost'];

  let title2 = 'Total Expenses';
  let cols2 = ['Category', 'Total'];

  let form1Inputs = ['date', 'description', 'category', 'cost']

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

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    if(!currExpense.date){
      alert('Please enter a date');
      console.log(currExpense.date, currExpense.date.typeof);
      return;
    }
    if(!currExpense.description){
      alert('Please enter a description');
      return;
    }
    if(!currExpense.category){
      alert('Please enter a category')
      return;
    }
    if(!currExpense.cost || isNaN(currExpense.cost)){
      alert('Please enter a number for the cost');
      return;
    }

    let id = getNextId(expenseData);
    let expense = currExpense

    setCurrExpense({id: id, ...expense});

    let totals = expenseTotals;
    let cat = currExpense.category;
    if(!totals[cat]){
      totals[cat] = {
        id: getNextId(totals),
        category: cat,
        total: 0
      }
    }

    totals[currExpense.category].total = parseFloat(totals[currExpense.category].total) + parseFloat(currExpense.cost);
    setExpenseTotals(totals);
    localStorage.setItem('totals', JSON.stringify({...expenseTotals}));

    let expenses = expenseData;
    expenses[id] = currExpense;
    setExpenseData(expenses);
    localStorage.setItem('expenses', JSON.stringify({...expenseData}));
    
  }

  const clearExpenseForm = (e) =>{
    e.preventDefault();

    for(let element of form1Inputs){
      document.getElementById(element).value = '';
    }
  }

  const handleExpenseChange = (e) => {

    let key = e.target.id;

    let expense = currExpense;
    expense[key] = e.target.value.toLowerCase();
    setCurrExpense(expense);
  }

  const deleteExpense = (e) =>{
    e.preventDefault();
    
    let id = e.target.id;
    let itemCost = parseFloat(expenseData[id].cost);
    let category = expenseData[id].category; 

    let totals = {...expenseTotals};
    totals[category].total = parseFloat(totals[category].total) - itemCost;
    if(totals[category].total <= 0) delete totals[category];
    setExpenseTotals(totals);

    let expenses = {...expenseData};
    delete expenses[id];
    setExpenseData(expenses);

  }

  return (
    <div>
      <Form inputs={form1Inputs} title='Add Expense' handleChange={handleExpenseChange} handleSubmit={handleExpenseSubmit} clear={clearExpenseForm}/>
      <Table title={title1} cols={cols1} data={expenseData} edit={true} deleteFunction={deleteExpense}/>
      <Table title={title2} cols={cols2} data={expenseTotals} edit={false} />
    </div>
  )
}

export default Expenses;