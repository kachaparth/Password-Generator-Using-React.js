import { useState,useCallback, useEffect, useRef} from 'react'



function App() {


  const [length, setlength] = useState(6);
  const [numberState , setNumberState] = useState(0);
  const  [characterState,setCharacterState] = useState(0);
  const [password, setPassWord ] = useState("Your Password is here")

  const passref= useRef(null)
   let copypass = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passref.current?.select();;
  },[password])

  const PasswordGenerator = useCallback(()=>{
    

    let pass = "";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberState == 1) str += "0123456789"
    if(characterState==1) str += "!@@@@@@@#$%^&*:;.,"

    for(let i=0;i<length;i++)
    {
      let rand = Math.floor(Math.random()*str.length);

      pass += str.charAt(rand);
    }
    setPassWord(pass)
  },[length,numberState,characterState])


  useEffect(()=>{PasswordGenerator()},
  [length,numberState, characterState,PasswordGenerator])

  return (
   <div className='flex-col h-screen justify-center items-center bg-gray-400 pt-24 '  >
    <div className='flex justify-around items-center  text-5xl '>
      Password Generator
    </div>
    
    <div className=' w-2/5 bg-cyan-500  rounded-md text-center p-8 justify-center  place-items-center mx-auto mt-16 '> 
       
      <div className='flex justify-items-center justify-center'>

        <input type="text"
         placeholder='Your Password is here'
         value={password}
        //  readOnly={true}
         ref={passref}
         className='rounded-l-md h-8 w-64 pl-3 border-none'
       />
       <button 
       onClick={copypass} className='bg-blue-600 rounded-r-md h-8 w-20 text-xl' >
        copy
        
       </button>
      </div>

      <div className='flex items-center justify-center gap-5 mt-4 text-xl'>
        <span className='flex items-center'>
        <input type="range"
        id='bar'
        min={6}
        max={100}
        value={length}
         
        onChange={(e)=>{
          setlength(e.target.value)
        }}
       x
        /> &nbsp;
        <label htmlFor="bar">Length({length})</label>
        </span>
        <span>
           <input type="checkbox" 
            id='num'
            defaultChecked={numberState}
            onChange={()=>{setNumberState((prev)=>!prev)}}
           />
           &nbsp;
           <label htmlFor="num">Number</label>
        </span>
        <span>
        <input type="checkbox" 
            id='char'
            defaultChecked={characterState}
            onChange={()=>{setCharacterState((prev)=>!prev)}}
           />
           &nbsp;
           <label htmlFor="num">Character</label>
        </span>
       
      </div>
      
    </div>
   </div>
  )
}

export default App
