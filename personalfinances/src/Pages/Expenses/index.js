import React from 'react';
import Table from '../../Components/Table';
import Form from '../../Components/Form';

let title1 = 'Expense Tracker';
let cols1 = ['Date', 'Description', 'Cost'];
let data1 = {
  1: {
    id: 1,
    date: '7/28',
    description: 'Clothes from Ross',
    total: 32.69
  },
  2: {
    id: 2,
    date: '7/28',
    description: 'Graphic novels from Green Apple',
    total: 27.49
  }
}

let title2 = 'Total Expenses';
let cols2 = ['Category', 'Amount']
let data2 = {
  1: {
    id: 1,
    category: 'Clothing',
    amount: 32.69
  },
  2: {
    id: 2,
    category: 'Entertainment',
    amount: 27.49
  }
}

let form1Inputs = ['date', 'description', 'category', 'cost']

const handleForm1Submit = (e) => {
  e.preventDefault();
  console.log('form 1 submitted');
}

const handleForm1Change = (e) => {
  console.log(e.target.value);
}

const Expenses = () => {
  return (
    <div>
      <Form inputs={form1Inputs} title='Add Expense' handleChange={handleForm1Change} handleSubmit={handleForm1Submit} />
      <Table title={title1} cols={cols1} data={data1} edit={true} />
      <Table title={title2} cols={cols2} data={data2} edit={false} />
    </div>
  )
}

export default Expenses;