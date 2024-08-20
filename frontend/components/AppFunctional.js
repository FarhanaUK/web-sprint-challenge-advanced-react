import React, {useState} from 'react'
import axios from 'axios'


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const URL = `http://localhost:9000/api/result`

export default function AppFunctional(props) {
  const [steps, setSteps] = useState(initialSteps)
  const [email, setEmail] = useState(initialEmail)
  const [index, setIndex] = useState(initialIndex)
  const [message, setMessages] = useState(initialMessage)
  
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
const x = index % 3 + 1
const y = Math.floor(index / 3 ) + 1
console.log(x)
return {x , y} 
    
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const {x, y} = getXY()
    return `Coordinates (${x}, ${y})`

  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setSteps(initialSteps)
    setEmail(initialEmail)
    setIndex(initialIndex)
    setMessages(initialMessage)
    
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

const {x, y} = getXY()

let newX = x
let newY = y

if(direction === 'left' && y > 1){
 newY -=1
 
 }
 else if(direction === 'right' && y < 3){
newY +=1
 }
 else if(direction === 'up' && x > 1 ){
  newX -= 1
 }
 else if(direction === 'down' && x < 3){
  newX += 1
 }

 const newIndex = (newX -1 )* 3 + (newY-1)
 return newIndex 
  }

  function move(evt) {
    const direction = evt.target.id;
    const newIndex = getNextIndex(direction);

    if (newIndex !== index) {
      setIndex(newIndex);
      setSteps(prevSteps => prevSteps + 1);
    }
  }

    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  

  function onChange(evt) {
   
    setEmail(evt.target.value)

  }

  function onSubmit(evt) {
       // Use a POST request to send a payload to the server.
    evt.preventDefault()
    const {x , y} = getXY()
    axios.post(URL, {x: `${x}, ${y}`, steps, email})
    .then(res => {
      console.log('Response', res.data)
    
    })
    .catch(err => {
      console.log('Error', err)
   
      
    })


  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit" ></input>
      </form>
    </div>
  )
}
