import React from 'react';

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

  return id;
}

export default getNextId;