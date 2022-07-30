import { React, useEffect, useState } from 'react';
import Table from '../../Components/Table';
import Form from '../../Components/Form';

const Expenses = () => {

  const [currExpense, setCurrExpense] = useState({});
  const [expenseData, setExpenseData] = useState(
    {
      1: {
        id: [1],
        date: '7/28',
        description: 'Clothes from Ross',
        category: 'clothing',
        cost: 32.69
      },
      2: {
        id: [2],
        date: '7/28',
        description: 'Graphic novels from Green Apple',
        category: 'entertainment',
        cost: 27.49
      }
    }
  )

  const [expenseTotals, setExpenseTotals] =useState(
    {
      'clothing': {
        id: 1,
        category: 'clothing',
        total: 32.69
      },
      'entertainment': {
        id: 2,
        category: 'entertainment',
        total: 27.49
      }
    }
  )

  useEffect(() =>{
  },[]);

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

    console.log(id)

    return id;
  }

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    let id = getNextId(expenseData);
    let expense = currExpense

    setCurrExpense({id: id, ...expense});

    console.log(currExpense);

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

    let expenses = expenseData;
    expenses[id] = currExpense;
    setExpenseData(expenses);
    
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

    console.log(id,itemCost,category);

    let totals = expenseTotals;
    console.log(totals[category]);
    totals[category].total = parseFloat(totals[category].total) - itemCost;
    setExpenseTotals(totals);

    let expenses = expenseData;
    delete expenses[id];
    setExpenseData(expenses);

  }

  return (
    <div>
      <Form inputs={form1Inputs} title='Add Expense' handleChange={handleExpenseChange} handleSubmit={handleExpenseSubmit} />
      <Table title={title1} cols={cols1} data={expenseData} edit={true} deleteFunction={deleteExpense}/>
      <Table title={title2} cols={cols2} data={expenseTotals} edit={false} />
    </div>
  )
}

export default Expenses;