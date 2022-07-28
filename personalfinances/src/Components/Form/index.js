import React from 'react';

const Form = ({ inputs, title, handleChange, handleSubmit }) => {

  return (
    <form className='styled-form' onSubmit={e => handleSubmit(e)} >
      <h3>{title}</h3>
      {inputs.map((name, index) => {

        name = name.charAt(0).toUpperCase() + name.slice(1)

        return (
          <label key={index}>
            {name}
            <input type='text' id={name} onChange={e => handleChange(e, name)} />
          </label>
        )
      })}
      <input className='styled-button' type='submit' value='submit' />
    </form>

  )
}

export default Form;
