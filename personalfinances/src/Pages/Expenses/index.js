import { React, useEffect, useState } from 'react';
import Table from '../../Components/Table';
import Form from '../../Components/Form';

const Expenses = () => {

  const [currExpense, setCurrExpense] = useState({});
  const [expenseData, setExpenseData] = useState(JSON.parse(localStorage.getItem('expenses')) ? JSON.parse(localStorage.getItem('expenses')) : {});
  const [expenseTotals, setExpenseTotals] = useState(JSON.parse(localStorage.getItem('expenseTotals')) ? JSON.parse(localStorage.getItem('expenseTotals')) : {});

  useEffect(() =>{
    localStorage.setItem('expenses', JSON.stringify({...expenseData}));
    localStorage.setItem('expenseTotals', JSON.stringify({...expenseTotals}));
  },[expenseData, expenseTotals]);

  let title1 = 'Expense Tracker';
  let cols1 = ['Date', 'Description', 'Category', 'Cost'];

  let title2 = 'Total Expenses';
  let cols2 = ['Category', 'Total'];

  let form1Inputs = ['date', 'description', 'category', 'cost'];
  let form1Title = 'Add Expense';

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

    for(let element of form1Inputs){
      if(!currExpense[element]) return alert(`Please enter an input for ${element}`)
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

    totals[cat].total = parseFloat(totals[expense.category].total) + parseFloat(expense.cost);
    setExpenseTotals(totals);
    localStorage.setItem('ExpenseTotals', JSON.stringify({...expenseTotals}));

    let expenses = expenseData;
    expenses[id] = expense;
    setExpenseData(expenses);
    localStorage.setItem('expenses', JSON.stringify({...expenseData}));
    
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
    if(!totals[category].total) delete totals[category];
    setExpenseTotals(totals);

    let expenses = {...expenseData};
    delete expenses[id];
    setExpenseData(expenses);

  }

  const clearExpenseForm = (e) =>{
    e.preventDefault();
  
    for(let element of form1Inputs){
      document.getElementById(element).value = '';
    }
  }

  return (
    <div>
      <Form inputs={form1Inputs} title={form1Title} handleChange={handleExpenseChange} handleSubmit={handleExpenseSubmit} clear={clearExpenseForm}/>
      <Table title={title1} cols={cols1} data={expenseData} edit={true} deleteFunction={deleteExpense}/>
      <Table title={title2} cols={cols2} data={expenseTotals} edit={false} />
    </div>
  )
}

export default Expenses;