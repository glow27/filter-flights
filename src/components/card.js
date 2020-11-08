import React from 'react';

export const Card = ({info}) => {
  const company = info.carrier.caption;
  const price = info.price.total.amount;
  const currency = info.price.total.currency;
  const departureFwdCaption = info.legs[0].segments[0].departureAirport.caption;
  const departureFwdUid = info.legs[0].segments[0].departureAirport.uid;
  const departureFwdCity = info.legs[0].segments[0].departureCity.caption;
  const fwd = info.legs[0].segments.length
  const arrivalFwdCaption = fwd === 1 ? info.legs[0].segments[0].arrivalAirport.caption : info.legs[0].segments[1].arrivalAirport.caption;
  const arrivalFwdUid = fwd === 1 ? info.legs[0].segments[0].arrivalAirport.uid : info.legs[0].segments[1].arrivalAirport.uid;
  const arrivalFwdCity = fwd === 1 ? info.legs[0].segments[0].arrivalCity.caption : (info.legs[0].segments[1].arrivalCity ? info.legs[0].segments[1].arrivalCity.caption : info.legs[0].segments[1].arrivalAirport.caption);
  const dateFwdDeparture = new Date(info.legs[0].segments[0].departureDate);
  const dateFwdArrival = fwd === 1 ? new Date(info.legs[0].segments[0].arrivalDate) : new Date(info.legs[0].segments[1].arrivalDate);
  const durationFwdHours = Math.floor(info.legs[0].duration/60);
  const durationFwdMinutes = info.legs[0].duration%60;

  const departureBckCaption = info.legs[1].segments[0].departureAirport.caption;
  const departureBckUid = info.legs[1].segments[0].departureAirport.uid;
  const departureBckCity = (info.legs[1].segments[0].departureCity ? info.legs[1].segments[0].departureCity.caption : info.legs[1].segments[0].departureAirport.caption);
  const bck = info.legs[1].segments.length
  const arrivalBckCaption = bck === 1 ? info.legs[1].segments[0].arrivalAirport.caption : info.legs[1].segments[1].arrivalAirport.caption;
  const arrivalBckUid = bck === 1 ? info.legs[1].segments[0].arrivalAirport.uid : info.legs[1].segments[1].arrivalAirport.uid;
  const arrivalBckCity = bck === 1 ? info.legs[1].segments[0].arrivalCity.caption : info.legs[1].segments[1].arrivalCity.caption;
  const dateBckDeparture = new Date(info.legs[1].segments[0].departureDate);
  const dateBckArrival = bck === 1 ? new Date(info.legs[1].segments[0].arrivalDate) : new Date(info.legs[1].segments[1].arrivalDate);
  const durationBckHours = Math.floor(info.legs[1].duration/60);
  const durationBckMinutes = info.legs[1].duration%60;;

  return <>
  <header><h2>{company}</h2><h3>{price} {currency}</h3></header>
  <div className='details'><p>{departureFwdCity} {departureFwdCaption} {departureFwdUid}</p><p>{`=>`}</p><p> {arrivalFwdCity} {arrivalFwdCaption} {arrivalFwdUid}</p></div>
  <div className='details'><p>{dateFwdDeparture.toLocaleString('ru-RU', { timeStyle: 'short', dateStyle: 'medium' })} </p><p>{`время в пути: ${durationFwdHours}:${durationFwdMinutes}`} </p><p>{dateFwdArrival.toLocaleString('ru-RU', { timeStyle: 'short', dateStyle: 'medium' })}</p></div>
  <div className='change'>{fwd === 1 ? <p>прямой</p> : <p>1 пересадка</p>}</div>
  <hr></hr>
  <div className='details'><p>{departureBckCity} {departureBckCaption} {departureBckUid} </p><p>{`=>`}</p><p> {arrivalBckCity} {arrivalBckCaption} {arrivalBckUid}</p></div>
  <div className='details'><p>{dateBckDeparture.toLocaleString('ru-RU', { timeStyle: 'short', dateStyle: 'medium' })} </p><p>{`время в пути: ${durationBckHours}:${durationBckMinutes}`} </p><p>{dateBckArrival.toLocaleString('ru-RU', { timeStyle: 'short', dateStyle: 'medium' })}</p></div>
  <div className='change'>{bck === 1 ? <p>прямой</p> : <p>1 пересадка</p>}</div>
  <div className='choice'><p>ВЫБРАТЬ</p></div>
  </>
}
