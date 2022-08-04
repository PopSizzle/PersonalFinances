import React from 'react';

const Form = ({ inputs, title, handleChange, handleSubmit, clear }) => {

  return (
    <form className='styled-form' id={title} onSubmit={e => handleSubmit(e)} >
      <h3>{title}</h3>
      {inputs.map((name, index) => {

        let labelName = name.charAt(0).toUpperCase() + name.slice(1)

        return (
          <label key={index}>
            {labelName}
            <input type='text' id={name} onChange={e => handleChange(e, name)} />
          </label>
        )
      })}
      <input className='styled-button' type='submit' value='Submit' />
      <button className='styled-button' onClick={e => clear(e,inputs)} datatitle={title}>Clear Form</button>
    </form>

  )
}

export default Form;
