import { FormEvent, useCallback, useState } from 'react';

import { api } from './services/api';
import { format_value } from './utils/format_value';
import { IData } from './dto/IData';

import './assets/App.css'

export function App() {
  const [origins, setOrigins] = useState('');
  const [destinations, setDestinations] = useState('');
  const [value, setValue] = useState('');
  const [fetchedData, setFetchedData] = useState({
    origins: '',
    destinations: '',
    value: '',
    distance: '',
    total: '',
  })

  const fetchData = useCallback(async () => {
    // const origins = 'Boston,MA'
    // const destinations = 'Lexington,MA'

    if (value && origins && destinations) {
      const parameters = `origins=${origins}&destinations=${destinations}&departure_time=now&key=${process.env.REACT_APP_API_KEY}`;

      const json: IData = await api.get(`${parameters}`);
      
      if (json.status === 'OK') {
        const distanceText = json.rows[0].elements[0].distance.text;

        const distanceArray = distanceText.split(' km');

        const distanceValue = Number(distanceArray[0].replace(',', '.'));

        const totalValue = Number(value) * distanceValue;

        const data = {
          origins,
          destinations,
          value: format_value(Number(value)),
          distance: distanceText,
          total: format_value(totalValue),
        };

        setFetchedData(data);
      } else {
        window.alert(json.error_message)
      }
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
      Valor por KM (R$): <input type="text" value={value} onChange={e => setValue(e.target.value)} /><br/><br/>
      Origem: { fetchedData.origins }<br/><br/>
      Destino: { fetchedData.destinations }<br/><br/>
      Valor por KM: { fetchedData.value }<br/><br/>
      Distância: { fetchedData.distance }<br/><br/>
      Total: { fetchedData.total }<br/><br/>
      <button type="submit">Calcular</button>
    </form>
  );
}
