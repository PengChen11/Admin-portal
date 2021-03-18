import {useState} from 'react';

export default function useForm(submitCallback, inputCallback=null){
  const [values, setValues] = useState({});

  function handleSubmit (e) {
    e.preventDefault();
    e.target.reset();
    submitCallback && submitCallback(values);
    setValues({});
  }

  function handleChange (e){
    e.persist();

    // if (e.target.name === 'maxNum' || e.target.name === 'difficulty') {
    //   setValues({...values,[e.target.name]: Number(e.target.value)});
    //   return;
    // }

    // if (e.target.name === 'showCompleted') {

    //   setValues({...values,[e.target.name]: e.target.value==='yes'? true:false});
    //   return;
    // }
    
    setValues({...values,[e.target.name]: e.target.value});
  }

  function handleMarkDown ( data ){
    setValues({...values, description: data});
  }

  return [handleSubmit, handleChange, handleMarkDown];
}