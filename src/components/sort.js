import React, { useEffect, useState } from 'react';

// export
 const SortFlights = ({flights, onChange}) => {
  const [sorting, setSorting] = useState(null);

  const handleChange = (value) => {
    onChange(value)
  }

  useEffect(() => {
    
    if (sorting === 'asc') handleChange(flights.sort((a, b) => {
      return (+b.flight.price.total.amount) - (+a.flight.price.total.amount)
    }));
    if (sorting === 'dsc') handleChange(flights.sort((a, b) => {
      return (+a.flight.price.total.amount) - (+b.flight.price.total.amount)
    }));
    if (sorting === 'duration') handleChange(flights.sort((a, b) => {
      return (a.flight.legs[1].duration) - (b.flight.legs[1].duration)
    }));
    
    // setFlightsDisplay(flights.slice(0, 10))
    
  }, [sorting, flights])

  return <>
  <h4>Sort</h4>
        <form onChange={(e) => {setSorting(e.target.value)}}>
          <input type="radio" id="asc" name="gender" value="asc" />
          <label for="male">по возрастанию цены</label>
          <br />
          <input type="radio" id="dsc" name="gender" value="dsc" />
          <label for="female">по убыванию цены</label>
          <br />
          <input type="radio" id="duration" name="gender" value="duration" />
          <label for="other">по времени в пути</label>
        </form>
  </>
}
