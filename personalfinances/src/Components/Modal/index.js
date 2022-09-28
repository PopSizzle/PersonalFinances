import React from 'react';
import './modal.css';

const Modal = ({ expense, categories, handleChange, handleSubmit, show, close }) => {

  if (!show) return null;

  return (
    <div className='modal' id='editModal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>Edit Expense</h4>
        </div>
        <div className='modal-body'>
          <form>
            {categories.map((name, index) => {
              let prop = name.toLowerCase()

              return (
                <label key={index}>
                  {name}
                  <input type='text' id={name} defaultValue={expense[prop]} onChange={e => handleChange(e, expense)} />
                </label>
              )
            }
            )}
          </form>
        </div>
        <div className='modal-footer'>
          <button>Save Changes</button><button onClick={close}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal