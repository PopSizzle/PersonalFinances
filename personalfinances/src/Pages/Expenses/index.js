import React from 'react';
import Table from '../../Components/Table';

let title = 'Personal Expenses';
let cols = ['Date', 'Description', 'Total'];
let data = {
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

const Expenses = () => {
  return(
    <div>
      <Table title={title} cols={cols} data={data}/>
    </div>
  )
}

export default Expenses;