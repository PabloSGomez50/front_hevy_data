import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import Plot from 'react-plotly.js';
import { FaUndo } from "react-icons/fa";
import './App.css'

function App() {
  const [message, setMessage] = useState("");
  const [plot, setPlot] = useState(false);
  
  const getData = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/plots/franbona');
      if (res.status !== 200) {
        // This will activate the closest error.js Error Boundary
        console.log(res.status)
        throw new Error('Failed to fetch data')
      }
      console.log(res.data);
      console.log(Object.keys(res.data));
      setPlot(res.data);
      setMessage('Se actualizo la información de los graficos');

    } catch (err) {
      console.error(err);
      setMessage('Se produjo un error al obtener la información');
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (message) {
      // Set a timeout to remove the message after 5 seconds
      const timeoutId = setTimeout(() => {
        setMessage('');
      }, 3000);

      // Cleanup the timeout when the component is unmounted or if the message changes
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <>
      <aside className='nav-side'>
        <a href="https://lab-fra-font-end.vercel.app/" target="_blank">
          <img 
            src="https://storage.googleapis.com/labwebapi/static/logo_robotica.png" 
            className="logo" 
            alt="Logo del laboratorio"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <FaUndo 
          className="logo"
          onClick={getData}
        />
      </aside>
      <section>
        <h1>Dashboard de Fran</h1>
        {message &&
          <h3 className='dialog-msg'>{message}</h3>
        }
        <div className='plots-container'>
        {plot && plot.map(plotData => 
            <Plot 
              data={plotData.data}
              layout={plotData.layout}
            />
            )
          }
        </div>
      </section>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}
    </>
  )
}

export default App
