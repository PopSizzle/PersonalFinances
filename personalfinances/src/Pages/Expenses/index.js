import React from 'react';
import Table from '../../Components/Table';

let title1 = 'Expense Tracker';
let cols1 = ['Date', 'Description', 'Total'];
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
    id:1,
    category: 'Clothing',
    amount: 32.69
  },
  2: {
    id:2,
    category: 'Entertainment',
    amount: 27.49
  }
}

const Expenses = () => {
  return(
    <div>
      <Table title={title1} cols={cols1} data={data1} edit={true}/>
      <Table title={title2} cols={cols2} data={data2} edit={false}/>
    </div>
  )
}

export default Expenses;