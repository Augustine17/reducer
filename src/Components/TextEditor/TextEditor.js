import React,{useReducer} from 'react'
import './TextEditor.css'

const initialValue = {
    typedData : "",
    totalCharacters : 0,
    totalWords : 0,
    timeReq : 0,
    darkMode : false
  }
  
  function reducer(state, action){
    switch (action.type){
        case "typed":{
  
            const chars = action.payload.kss.split("").length;
            const words = action.payload.kss.split(" ").filter((data)=>{
                if(data !== ""){
                    return true;
                }
                return false;
            }).length;
  
            return{
                ...state,
                typedData: action.payload.kss,
                totalCharacters : chars,
                totalWords : words,
                timeReq : words * 0.008
            }
        }
        case 'upperCase':
            return{
                ...state,
                typedData : state.typedData.toUpperCase()
            }
        case 'lowerCase':
            return{
                ...state,
                typedData : state.typedData.toLowerCase()
            }
        case 'clearScreen':
            return{
                ...state,
                typedData : "",
                totalCharacters : 0,
                totalWords : 0,
                timeReq : 0
            }
        case 'trim':
            return{
                ...state,
                typedData : state.typedData.trim(),
                totalCharacters : state.typedData.trim().length
            }
        case 'theme':
            return{
                ...state,
                darkMode : !state.darkMode
            }
        default:
            return {...state}
    }
  }

const TextEditor = () => {
    const [state, dispatch] = useReducer(reducer, initialValue);

    function typed(e){
        dispatch({type:"typed", payload : {kss : e.target.value}});
    }

    function themeHandler(){
        dispatch({type:"theme"})
    }

  return (
    <div id='container' className={state.dark_mode && 'dark-mode'}>
            <div id='theme-cntrl'>
                <div id='toggle-conainer' onClick={themeHandler}>
                    <div id='toggle-switch' className={state.darkMode ? 'toggle-switch-dark-mode' : "toggle-switch-light-mode"}></div>
                </div>
                <p>Enable {state.darkMode ? "light" : "dark"} mode</p>
            </div>
            <header>
                <h1>TextUtis - Word Counter, Charecter Counter, Remove Extra Space</h1>
            </header>
            <div id='input-container'>
                <p>Enter Your Text Here:</p>
                <textarea value={state.typedData} onChange={typed}/>
                <div id='btn-container'>
                    <button className='case-change-btn' onClick={()=>{ dispatch({type: "upperCase"})}}>Convert Uppercase</button>
                    <button className='case-change-btn' onClick={()=>{ dispatch({type: "lowerCase"})}}>Convert Lowercase</button>
                    <button className='clear-btn' onClick={()=>{ dispatch({type: "clearScreen"})}}>Clear Text</button>
                    <button className='copy-btn' onClick={()=>{ navigator.clipboard.writeText(state.typedData)}}>Copy To Clipboard</button>
                    <button className='remove-space-btn' onClick={()=>{ dispatch({type: "trim"})}}>Remove Extra Space</button>
                </div>
            </div>
            <div>
                <h3>Summery Of Your Text</h3>
                <p>Nummber of words :{state.totalWords} </p>
                <p>Number of charecters : {state.totalCharacters} </p>
                <p>Reading Time: {state.timeReq} </p>
            </div>
            <div id='output-container'>
                <h3>Preview Document</h3>
                <textarea value={state.typedData} readOnly/>
            </div>
    </div>
  )
}

export default TextEditor