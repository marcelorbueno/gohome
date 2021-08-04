import { FormEvent, useCallback, useState } from 'react';

import './assets/App.css'

export function App() {
  const [origins, setOrigins] = useState('');
  const [destinations, setDestinations] = useState('');
  const [value, setValue] = useState('');
  const [fetchedData, setFetchedData] = useState({
    origins: '',
    destinations: '',
    value: '',
    distance: 0,
    total: 0,
  })

  const fetchData = useCallback(() => {
    if (value) {
      const distanceValue = Math.floor(Math.random() * 10 + 1);

      const totalValue = Number(value) * distanceValue;
      
      const data = {
        origins,
        destinations,
        value,
        distance: distanceValue,
        total: totalValue,
      };
  
      setFetchedData(data);
    }
  }, [value, origins, destinations]);

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();

    fetchData();
  }

  return (
    <form onSubmit={handleSubmit} className="App">
      Origem: <input type="text" value={origins} onChange={e => setOrigins(e.target.value)} /><br/><br/>
      Destino: <input type="text" value={destinations} onChange={e => setDestinations(e.target.value)} /><br/><br/>
      Valor: <input type="text" value={value} onChange={e => setValue(e.target.value)} /><br/><br/>
      Origem: { fetchedData.origins }<br/><br/>
      Destino: { fetchedData.destinations }<br/><br/>
      Valor: { fetchedData.value }<br/><br/>
      Distância: { fetchedData.distance }<br/><br/>
      Total: { fetchedData.total }<br/><br/>
      <button type="submit">Calcular</button>
    </form>
  );
}
