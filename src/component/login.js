import React,{useState} from 'react';

export default function App() {
  const [onWait,setOnWait] = useState(false)
  const [isDist,setIsDist] = useState(false)

  function handlePhoneNumSubmit(event){
    event.preventDefault();
    //send info to backend
    console.log(event)
    console.log(new FormData(event.target))
    console.log("phonNum Entered")
    setOnWait(true)
  }

  function handleCodeSubmit(event){
    event.preventDefault();

    //send info to backend
    console.log(new FormData(event.target))
    console.log("Code Entered")


  }

  return (
    <div>
      <h2>Login</h2>
      {onWait ? 
        
        <form onSubmit={handleCodeSubmit}>
          <label>Code</label>
          <input name="codenumber" type="number"/>
          <button>send!</button>
        </form>
      :
        <form onSubmit={handlePhoneNumSubmit}>
          <label>Phone number</label>
          <input name="phonenumber" type="number"/>
          <button>send!</button>
        </form>
      }
    </div>
  );
}
