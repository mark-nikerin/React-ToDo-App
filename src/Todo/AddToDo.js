import React from "react"; 
import PropTypes from 'prop-types'

function useInputValue(defaultValue = '') {
  const [value, setValue] = React.useState(defaultValue)

  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
   clear: () => setValue(''),
   value: () => value
  }
}

function AddToDo( {onCreate}) {
  const input = useInputValue('')  

  function submitHandler(event) {
    event.preventDefault();

    if(input.value().trim()) {
      onCreate(input.value())
      input.clear()
    }
  }

  return (
    <form style={{marginBottom: '1rem'}} onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type='submit'>Add Todo</button>
    </form>
  )
}

AddToDo.propTypes = {
  onCreate: PropTypes.func.isRequired
}


export default AddToDo