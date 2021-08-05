import { FormEvent, useEffect, useState } from 'react';
import './assets/App.css'
// import { api } from './services/api';

export function App() {
  const [origins, setOrigins] = useState('');
  const [destinations, setDestinations] = useState('');
  const [value, setValue] = useState('');
  const [total, setTotal] = useState(0);
  const [labelTotal, setLabelTotal] = useState('');

  // const origins = 'Boston,MA'
  // const destinations = 'Lexington,MA'

  useEffect(() => {

  }, [labelTotal, total]);
  
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let parameters: string;

    if (origins && destinations && value) {
      parameters = `origins=${origins}&destinations=${destinations}&departure_time=now&key=${process.env.REACT_APP_API_KEY}` 
      
      setTotal(total + Number(value))
      
      setLabelTotal(new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      }).format(total))
      
      console.log(parameters);
      console.log(total)
      console.log(labelTotal)

      // api.get(`${parameters}`)
      //   .then(response => console.log(response.data))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="App">
      Origins: <input type="text" value={origins} onChange={e => setOrigins(e.target.value)} /><br/><br/>
      Destinations: <input type="text" value={destinations} onChange={e => setDestinations(e.target.value)} /><br/><br/>
      Valor: <input type="text" value={value} onChange={e => setValue(e.target.value)} /><br/><br/>
      Total: { total === 0 ? (<span>-</span>) : labelTotal }<br/><br/>
      <button type="submit">Calcular</button>
    </form>
  );
}
