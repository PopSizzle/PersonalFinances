import React from 'react';

const Table = ({title, cols, data}) => {

  let keys = Object.keys(data);

  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>{title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {cols.map((col, index) => (
              <td key={index}>{col}</td>
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
                      if(prop !== 'id'){
                        return  <td key={prop}>{data[key][prop]}</td>
                      }
                      })}
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