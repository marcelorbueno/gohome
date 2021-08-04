import { FormEvent, useCallback, useEffect, useState } from 'react';

import './assets/App.css'

export function App() {
  const [value, setValue] = useState('');
  const [fetchedData, setFetchedData] = useState({
    value: '',
    distance: 0,
    total: 0,
  })

  const fetchData = useCallback(() => {
    if (value) {
      const distanceValue = Math.floor(Math.random() * 10 + 1);

      const totalValue = Number(value) * distanceValue;
      
      const data = {
        value,
        distance: distanceValue,
        total: totalValue,
      };
  
      setFetchedData(data);
    }
  }, [value])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();

    fetchData();
  }

  return (
    <form onSubmit={handleSubmit} className="App">
      Valor: <input type="text" value={value} onChange={e => setValue(e.target.value)} /><br/><br/>
      Valor: { fetchedData.value }<br/><br/>
      Distância: { fetchedData.distance }<br/><br/>
      Total: { fetchedData.total }<br/><br/>
      <button type="submit">Calcular</button>
    </form>
  );
}
