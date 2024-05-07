import { useEffect } from 'react'
import './App.css'
import LineChart from './Graph'
import LineChart2 from './Graph2'
import LineChart3 from './Graph3'
import LineChart4 from './Graph4'
import LineChart5 from './Graph5'
import LineChart6 from './Graph6'
import { useState } from 'react'
function App() {
  const [s1, setS1] = useState(0)
  const [s2, setS2] = useState(0)
  const [stage1, setStage1] = useState("0")
  const [stage2, setStage2] = useState("0")
  useEffect(() => {
    // make a interval
    const interval = setInterval(() => {
      fetch('https://api.thingspeak.com/channels/2490599/fields/2.json?api_key=${apiKey}&results=300%27;')
        .then((res) => res.json())
        .then((data) => {
          // console.log("boliiii",(data.feeds[299].field2==='0'))
          if (data.feeds[299].field2 === '1') {
            setS1(1)
          }
          else {
            setS1(0)
          }
        })

      fetch('https://api.thingspeak.com/channels/2490599/fields/4.json?api_key=${apiKey}&results=300%27;')
        .then((res) => res.json())
        .then((data) => {
          if (data.feeds[299].field4 === '1') {
            setS2(1)
          }
          else {
            setS2(0)
          }
        })
      // 0 off
        // 1 soak
        // 2 wash
        // 3 wash end
        // 4 rinse
        // 5 rinse end
        // 6 spin
      fetch('https://api.thingspeak.com/channels/2490599/fields/1.json?api_key=${apiKey}&results=300%27;')
        .then((res) => res.json())
        .then((data) => {
          if (data.feeds[299].field1 === '0') {
            setStage1("OFF")
          }
          else if (data.feeds[299].field1 === '1') {
            setStage1("SOAK")
          }
          else if (data.feeds[299].field1 === '2') {
            setStage1("WASH")
          }
          else if (data.feeds[299].field1 === '3') {
            setStage1("WASH END")
          }
          else if (data.feeds[299].field1 === '4') {
            setStage1("RINSE")
          }
          else if (data.feeds[299].field1 === '5') {
            setStage1("RINSE END")
          }
          else if (data.feeds[299].field1 === '6') {
            setStage1("SPIN")
          }
        })
      
        fetch('https://api.thingspeak.com/channels/2490599/fields/3.json?api_key=${apiKey}&results=300%27;')
        .then((res) => res.json())
        .then((data) => {
          if (data.feeds[299].field3 === '0') {
            setStage2("OFF")
          }
          else if (data.feeds[299].field3 === '1') {
            setStage2("SOAK")
          }
          else if (data.feeds[299].field3 === '2') {
            setStage2("WASH")
          }
          else if (data.feeds[299].field3 === '3') {
            setStage2("WASH END")
          }
          else if (data.feeds[299].field3 === '4') {
            setStage2("RINSE")
          }
          else if (data.feeds[299].field3 === '5') {
            setStage2("RINSE END")
          }
          else if (data.feeds[299].field3 === '6') {
            setStage2("SPIN")
          }
        
         
        })
          

    }, 5000)
  }, [])
  return (
    <>
      <div>

        <div style={{ top: '0', position: 'absolute', left: '10vw', marginBottom: '10vh' }}>

          {
            s1 === 0 ? <h3>WM1 :  <span style={{ color: 'red' }}>OFF</span></h3> : <h3>WM1 :   <span style={{ color: 'green' }}>ON</span>
              {
                s1 === 1 ? <h3>STAGE : {stage1}</h3>:null
              }
            </h3>
          }
          {
            s2 === 0 ? <h3>WM2 : <span style={{ color: 'red' }}>OFF</span></h3> : <h3>WM2 :   <span style={{ color: 'green' }}>ON</span>
               {
                s2 === 1 ? <h3>STAGE : {stage2}</h3>:null
              }
            </h3>
          }
        </div>

      </div>
      <div className="machine-1" style={{ width: '100%' }}>
        
        <p style={{ textAlign: 'center', fontSize: '30px', top: '9vh', position: 'absolute' , left: '38vw'}}>
          Washing Machine 1</p>
        <LineChart />
        <LineChart3 />
        {/* < */}
        <p style={{ textAlign: 'center', fontSize: '30px', top: '189vh', position: 'absolute' , left: '38vw'}}>
          Washing Machine 2</p>

        <LineChart4 />
        <LineChart6 />
      </div>
    </>
  )
}

export default App
