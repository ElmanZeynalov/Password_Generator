import {useCallback, useEffect, useRef, useState} from 'react'

import './App.css'

function App() {
  const [length , setLength] = useState(6);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [password , setPassword] = useState('');
  
  const generatePassword = useCallback(() =>{
      let pass = "";
      let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

      if (numberAllowed) str += '1234567890'

      if (charAllowed) str += '!@#$%^&*()~'


      for (let i = 1 ; i < length ; i++){
          const char =  Math.floor(Math.random() * str.length);
          pass += str.charAt(char);

      }
      setPassword(pass)
  } , [length , numberAllowed , charAllowed])


    useEffect(() => {
        generatePassword()
    } , [length, numberAllowed, charAllowed])


    const copyPassword = () =>{
      window.navigator.clipboard.writeText(password)
        passwordRef.current.select()
    }

    const passwordRef = useRef()


  return (

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-1 py-4 my-8 bg-gray-800 text-orange-500">
          <h1 className=" text-white text-center my-3 ">Password Generator</h1>
          <div className=" flex shadow rounded-lg overflow-hidden mb-2 ">
              <input
                  type="text"
                  value={password}
                  placeholder="password"
                  className='outline-none w-full py-1 px-3'
                  readOnly
                  ref={passwordRef}
              />

              <button
                  onClick={copyPassword}
                  className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
              >Copy</button>
          </div>
          <div
              className="flex items-center gap-x-1"
          >
              <input
                  type="range"
                  min={6}
                  max={39}
                  value={length}
                  onChange={e => setLength(e.target.value)}
                  className="cursor-pointer"
                  name=""
                  id=""
              />

              <label htmlFor="lenght">Lenght: {length}</label>


              <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  onChange={() => setNumberAllowed(!numberAllowed)}
              />
              <label htmlFor="number">Add Numbers</label>

              <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  onChange={() => setCharAllowed(!charAllowed)}
              />
              <label htmlFor="charInput">Add Character</label>

          </div>


         

      </div>
  )
}

export default App
