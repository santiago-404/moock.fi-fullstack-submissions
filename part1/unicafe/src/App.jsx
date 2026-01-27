import { useState } from "react";
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0)

  let all = good + bad + neutral;

  const setValue = (setState) => 
    () => setState(prev => prev + 1);
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={setValue(setGood)}/>
      <Button text='neutral' onClick={setValue(setNeutral)}/>
      <Button text='bad' onClick={setValue(setBad)}/>

      <Statistics data={{good, neutral, bad, all}}/>
    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Counts = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({data:{good, bad, neutral, all}}) => {
  let average = (good - bad ) / all;
  let positivePercent = (good / all * 100);
  if(!all){
    return (<p>No feedback given</p>)
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Counts text={'good'} value={good}/>
        <Counts text={'neutral'} value={neutral}/>
        <Counts text={'bad'} value={bad}/>

        <Counts text={'all'} value={all}/>
        <Counts text={'average'} value={average.toFixed(1)}/>
        <Counts text={'positive'} value={positivePercent.toFixed(1) + ' %'}/>
        </tbody>
      </table>
    </div>
  )
}


export default App;