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
        category: 'Clothing',
        cost: 32.69
      },
      2: {
        id: [2],
        date: '7/28',
        description: 'Graphic novels from Green Apple',
        category: 'Entertainment',
        cost: 27.49
      }
    }
  )

  const [expenseTotals, setExpenseTotals] =useState(
    {
      'clothing': {
        id: 1,
        category: 'Clothing',
        total: 32.69
      },
      'entertainment': {
        id: 2,
        category: 'Entertainment',
        total: 27.49
      }
    }
  )

  let title1 = 'Expense Tracker';
  let cols1 = ['Date', 'Description', 'Cateogry', 'Cost'];

  let title2 = 'Total Expenses';
  let cols2 = ['Category', 'Total'];

  let form1Inputs = ['date', 'description', 'category', 'cost']

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    let id;
    let keys = Object.keys(expenseData);
  
    // Find the next available id
    for(let i=0; i<=keys.length+1; i++){
      console.log(parseInt(keys[i]));
      if(parseInt(keys[i]) !== i){
        id=i;
        break;
      }
    }

    setCurrExpense({id: id, ...currExpense})

    let expenses = expenseData;
    expenses[id] = currExpense;
    setExpenseData(expenses);

    let totals = expenseTotals;
    totals[currExpense.category].total = parseFloat(totals[currExpense.category].total) + parseFloat(currExpense.cost);
    setExpenseTotals(totals);
    
  }

  const handleExpenseChange = (e) => {
    let key = e.target.id;

    let expense = currExpense;
    expense[key] = e.target.value
    setCurrExpense(expense);
  }

  return (
    <div>
      <Form inputs={form1Inputs} title='Add Expense' handleChange={handleExpenseChange} handleSubmit={handleExpenseSubmit} />
      <Table title={title1} cols={cols1} data={expenseData} edit={true} />
      <Table title={title2} cols={cols2} data={expenseTotals} edit={false} />
    </div>
  )
}

export default Expenses;