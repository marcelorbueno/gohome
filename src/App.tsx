import React, { FormEvent, useState } from 'react';
import { LoadScript, DistanceMatrixService } from '@react-google-maps/api';
import { format_value } from './utils/format_value';

import { IResponse } from './dto/IResponse';

import loading from './assets/img/loading.svg'

import './assets/styles/App.css'

export function App() {
  const [state, setState] = useState({
    travelMode: 'DRIVING',
    origin: [''],
    destination: ['SP'],
  })

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [origins, setOrigins] = useState('');
  const [destinations, setDestinations] = useState('');
  const [value, setValue] = useState('');
  const [fetchedData, setFetchedData] = useState({
    origins: '-',
    destinations: '-',
    value: '-',
    distance: '-',
    duration: '-',
    total: '-',
  })

  const key = process.env.REACT_APP_API_KEY || 'default'

  const distanceCallback = (response: IResponse) => {
    if (isSubmitted && response !== null) {
      if (response.rows[0].elements[0].status === 'OK') {
        console.log(response);
        
        const distanceText = response.rows[0].elements[0].distance.text;
  
        const distanceArray = distanceText.split(' km');
  
        const distanceValue = Number(distanceArray[0].replace(',', '.'));
  
        const totalValue = Number(value) * distanceValue;
        
        const data = {
          origins: response.originAddresses[0],
          destinations: response.destinationAddresses[0],
          value: format_value(Number(value)),
          distance: distanceText,
          duration: response.rows[0].elements[0].duration.text,
          total: format_value(totalValue),
        };

        setFetchedData(data);
      }
    }

    setIsSubmitted(false)
  };

  function handleSubmit (event: FormEvent) {
    event.preventDefault();

    if (origins && destinations && value) {
      setState(() => ({
        travelMode: "DRIVING",
        origin: [origins],
        destination: [destinations],
      }));
  
      setIsSubmitted(true)
    } else {
      console.log('Preencha os campos Origem, Destino e Valor por KM')
    }
  }

  return (
    <>
      <LoadScript
        googleMapsApiKey={key}
      >
        <DistanceMatrixService
          options={{
            destinations: state.destination,
            origins: state.origin,
            travelMode: state.travelMode,
          }}
          callback={distanceCallback}
        />
      </LoadScript>
      
      <h1>Go Home</h1>

      <form onSubmit={handleSubmit} className="App">
        <p><b>Origem:</b> <input type="text" value={origins} onChange={e => setOrigins(e.target.value)} /></p>
        <p><b>Destino:</b> <input type="text" value={destinations} onChange={e => setDestinations(e.target.value)} /></p>
        <p><b>Valor por KM (R$):</b> <input type="text" value={value} onChange={e => setValue(e.target.value)} /></p>
        <p><b>Origem:</b> { fetchedData.origins }</p>
        <p><b>Destino:</b> { fetchedData.destinations }</p>
        <p><b>Valor por KM:</b> { fetchedData.value }</p>
        <p><b>Distância:</b> { fetchedData.distance }</p>
        <p><b>Tempo estimado:</b> { fetchedData.duration }</p>
        <p><b>Total:</b> { fetchedData.total }</p>
        <div className="box-buttons">
          <button type="submit">Calcular</button>
          <img className={ isSubmitted ? 'loading' : 'loading d-none' } src={loading} alt="Caregando..." />
        </div>
      </form>
    </>
  )
}