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
  const [departureFee, setDepartureFee] = useState('15');
  const [value, setValue] = useState('2');
  const [maintenanceFee, setMaintenanceFee] = useState('5');
  const [fetchedData, setFetchedData] = useState({
    origins: '-',
    destinations: '-',
    departureFee: 'R$ 15,00',
    value: 'R$ 2,00',
    maintenanceFee: 'R$ 5,00',
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
  
        const totalValue = Number(departureFee) + (Number(value) * distanceValue) + Number(maintenanceFee);
        
        const data = {
          origins: response.originAddresses[0],
          destinations: response.destinationAddresses[0],
          departureFee: format_value(Number(departureFee)),
          value: format_value(Number(value)),
          maintenanceFee: format_value(Number(maintenanceFee)),
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

    if (origins && destinations && departureFee && value && maintenanceFee) {
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
        <p><b>Taxa de Partida (R$):</b> <input type="text" value={departureFee} onChange={e => setDepartureFee(e.target.value)} /></p>
        <p><b>Valor por KM (R$):</b> <input type="text" value={value} onChange={e => setValue(e.target.value)} /></p>
        <p><b>Taxa de Manutenção (R$):</b> <input type="text" value={maintenanceFee} onChange={e => setMaintenanceFee(e.target.value)} /></p>
        <div className="box-buttons">
          <button type="submit">Calcular</button>
          <img className={ isSubmitted ? 'loading' : 'loading d-none' } src={loading} alt="Caregando..." />
        </div>
        <p className="separator"></p>
        <p><b>Origem:</b> { fetchedData.origins }</p>
        <p><b>Destino:</b> { fetchedData.destinations }</p>
        <p><b>Taxa de Partida:</b> { fetchedData.departureFee }</p>
        <p><b>Valor por KM:</b> { fetchedData.value }</p>
        <p><b>Taxa de Manutenção:</b> { fetchedData.maintenanceFee }</p>
        <p><b>Distância:</b> { fetchedData.distance }</p>
        <p><b>Tempo estimado:</b> { fetchedData.duration }</p>
        <p><b>Total:</b> { fetchedData.total }</p>
      </form>
    </>
  )
}