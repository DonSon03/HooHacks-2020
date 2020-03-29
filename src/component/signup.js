import React,{useState} from 'react';

export default function App() {
  const [onWait,setOnWait] = useState(false)

  function handlePhoneNumSubmit(event){
    event.preventDefault();
    //send info to backend
    console.log("phonNum Entered")
    setOnWait(true)
  }

  function handleCodeSubmit(event){
    event.preventDefault();

    //send info to backend
    console.log("Code Entered")
  }

  return (
    <div>
      <h2>Signup</h2>
      {onWait ? 
        <form onSubmit={handleCodeSubmit} id="codeform">
          <label htmlFor="code">Code</label>
          <input name="code" type="number"/>
          <button>send!</button>
        </form>
      :
        <form onSubmit={handlePhoneNumSubmit} id="phoneform">
          <label>Phone number</label>
          <input name="phonenumber" type="number"/>
          <label>First Name</label>
          <input name="firstname" type="text"/>
          <label>Last Name</label>
          <input name="lastname" type="text"/>
          <button>send!</button>
        </form>}
    </div>
  );
}
