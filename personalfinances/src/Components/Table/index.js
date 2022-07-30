import React from 'react';

const Table = ({ title, cols, data, edit, deleteFunction}) => {

  let keys = Object.keys(data);

  return (
    <div>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>{title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {cols.map((col, index) => (
              <td key={index}><h4>{col}</h4></td>
            ))}
          </tr>
          {
            // If data is provided 
            keys.length > 0 ?
              keys.map(
                key =>
                  <tr key={key}>
                    {Object.keys(data[key]).map(
                      prop => {
                        if (prop !== 'id') {
                          return <td key={prop}>{data[key][prop]}</td>
                        }
                      })}
                    {edit ? <td><button className='styled-button'>Edit</button><button className='styled-button' onClick={e => deleteFunction(e)} id={key}>Delete</button></td> : null}
                  </tr>)
              :
              // else if no data provided
              <tr>
                {cols.forEach(el => <td></td>)}
              </tr>}
        </tbody>
      </table>
    </div>
  )
}

export default Table;