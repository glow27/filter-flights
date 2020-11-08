import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Card } from './card';
import { FlightsContext } from './context';

function App() {
  const data = useContext(FlightsContext);
  const [flights, setFlights] = useState(data);
  const [flightsDisplay, setFlightsDisplay] = useState(flights.slice(0, 10));
  const [sorting, setSorting] = useState(null);
  const [ch1, setCh1] = useState(false);
  const [ch2, setCh2] = useState(false);
  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');
  const [startRes, setStartRes] = useState(false);
  const [endRes, setEndRes] = useState(false);

  const [airlines, setAirlines] = useState([
    { name: 'others', status: false },
    { name: 'KLM', status: false },
    { name: 'Air France', status: false },
    { name: 'Аэрофлот - российские авиалинии', status: false },
    { name: 'TURK HAVA YOLLARI A.O.', status: false },
  ]);

  const handleClick = () => {
    setAirlines([
      { name: 'others', status: false },
      { name: 'KLM', status: false },
      { name: 'Air France', status: false },
      { name: 'Аэрофлот - российские авиалинии', status: false },
      { name: 'TURK HAVA YOLLARI A.O.', status: false },
    ]);
    setSorting(false);
    setCh1(false);
    setCh2(false);
    setStartRes(false);
    setEndRes(false);
  };

  useEffect(() => {
    const temp = [];
    if (
      !airlines[1].status &&
      !airlines[2].status &&
      !airlines[3].status &&
      !airlines[0].status &&
      !airlines[4].status
    ) {
      return setFlights(data);
    }
    for (let i = 1; i < airlines.length; i++) {
      if (airlines[i].status) {
        for (let j = 0; j < data.length; j++) {
          if (airlines[i].name === data[j].flight.carrier.caption)
            temp.push(data[j]);
        }
      }
    }
    if (airlines[0].status) {
      for (let j = 0; j < data.length; j++) {
        if (
          data[j].flight.carrier.caption !== 'KLM' &&
          data[j].flight.carrier.caption !== 'Air France' &&
          data[j].flight.carrier.caption !==
            'Аэрофлот - российские авиалинии' &&
          data[j].flight.carrier.caption !== 'TURK HAVA YOLLARI A.O.'
        )
          temp.push(data[j]);
      }
    }
    setFlights(temp);
  }, [airlines, data]);

  useEffect(() => {
    if (sorting === 'asc')
      setFlights(
        flights.sort((a, b) => {
          return +b.flight.price.total.amount - +a.flight.price.total.amount;
        })
      );
    if (sorting === 'dsc')
      setFlights(
        flights.sort((a, b) => {
          return +a.flight.price.total.amount - +b.flight.price.total.amount;
        })
      );
    if (sorting === 'duration1')
      setFlights(
        flights.sort((a, b) => {
          return a.flight.legs[0].duration - b.flight.legs[0].duration;
        })
      );
    if (sorting === 'duration2')
      setFlights(
        flights.sort((a, b) => {
          return a.flight.legs[1].duration - b.flight.legs[1].duration;
        })
      );

    setFlightsDisplay(flights.slice(0, 10));
  }, [sorting, flights]);

  useEffect(() => {
    if ((ch1 && ch2) || (!ch1 && !ch2)) {
      setFlights(data);
    }
    if (ch1 && !ch2)
      return setFlights(
        flights.filter((el) => el.flight.legs[0].segments.length === 1)
      );
    if (ch2 && !ch1)
      return setFlights(
        flights.filter((el) => el.flight.legs[0].segments.length > 1)
      );
  }, [ch1, ch2, data]);

  useEffect(() => {
    setFlightsDisplay(flights.slice(0, 10));
  }, [flights]);

  return (
    <main>
      <aside>
        <h4>Сортировать</h4>
        <form
          onChange={(e) => {
            setSorting(e.target.value);
          }}
        >
          <input type="radio" id="asc" name="gender" value="asc" />
          <label for="asc">по возрастанию цены</label>
          <br />
          <input type="radio" id="dsc" name="gender" value="dsc" />
          <label for="dsc">по убыванию цены</label>
          <br />
          <input type="radio" id="duration1" name="gender" value="duration1" />
          <label for="duration1">по времени в пути вперед</label>
          <br />
          <input type="radio" id="duration2" name="gender" value="duration2" />
          <label for="duration2">по времени в пути назад</label>
        </form>
        <h4>Фильтровать</h4>
        <form>
          <input
            type="checkbox"
            id="net"
            checked={ch1}
            name="net"
            value="net"
            onChange={() => {
              setCh1((state) => !state);
            }}
          />
          <label for="net">без пересадок</label>
          <br />
          <input
            type="checkbox"
            id="da"
            checked={ch2}
            name="da"
            value="da"
            onChange={() => {
              setCh2((state) => !state);
            }}
          />
          <label for="da"> 1 пересадка</label>
          <br />
        </form>
        <h4>Авиалинии</h4>
        <form>
          <input
            type="checkbox"
            id="first"
            name="first"
            value="Air France"
            checked={airlines[2].status}
            onChange={() => {
              setAirlines([
                ...airlines.map((el) => {
                  if (el.name === 'Air France') el.status = !el.status;
                  return el;
                }),
              ]);
            }}
          />
          <label for="first">Air France</label>
          <br />
          <input
            type="checkbox"
            id="second"
            name="second"
            value="KLM"
            checked={airlines[1].status}
            onChange={() => {
              setAirlines([
                ...airlines.map((el) => {
                  if (el.name === 'KLM') el.status = !el.status;
                  return el;
                }),
              ]);
            }}
          />
          <label for="second">KLM</label>
          <br />
          <input
            type="checkbox"
            id="third"
            name="third"
            value="Аэрофлот - российские авиалинии"
            checked={airlines[3].status}
            onChange={() => {
              setAirlines([
                ...airlines.map((el) => {
                  if (el.name === 'Аэрофлот - российские авиалинии')
                    el.status = !el.status;
                  return el;
                }),
              ]);
            }}
          />
          <label for="third">Аэрофлот - российские авиалинии</label>
          <br />
          <input
            type="checkbox"
            id="fourth"
            name="fourth"
            value="TURK HAVA YOLLARI A.O."
            checked={airlines[4].status}
            onChange={() => {
              setAirlines([
                ...airlines.map((el) => {
                  if (el.name === 'TURK HAVA YOLLARI A.O.')
                    el.status = !el.status;
                  return el;
                }),
              ]);
            }}
          />
          <label for="fourth">TURK HAVA YOLLARI A.O.</label>
          <br />
          <input
            type="checkbox"
            id="fifth"
            name="fifth"
            value="others"
            checked={airlines[0].status}
            onChange={() => {
              setAirlines([
                ...airlines.map((el) => {
                  if (el.name === 'others') el.status = !el.status;
                  return el;
                }),
              ]);
            }}
          />
          <label for="fifth">другие</label>
        </form>
        <h4>Price</h4>
        <form>
          <label for="start">от</label>
          <br />
          <input
            type="text"
            id="start"
            name="start"
            value={startPrice}
            disabled={startRes}
            onChange={(e) => {
              setStartPrice(e.target.value);
            }}
            onBlur={(e) => {
              setFlights(
                flights.filter(
                  (el) => +el.flight.price.total.amount > +startPrice
                )
              );
              setStartRes(true);
            }}
          />
          <br />
          <label for="end">до</label>
          <br />
          <input
            type="text"
            id="end"
            name="end"
            disabled={endRes}
            value={endPrice}
            onChange={(e) => {
              setEndPrice(e.target.value);
            }}
            onBlur={(e) => {
              setFlights(
                flights.filter(
                  (el) => +el.flight.price.total.amount < +endPrice
                )
              );
              setEndRes(true);
            }}
          />
        </form>

        <button onClick={handleClick}>сбросить</button>
      </aside>
      <section>
        {flightsDisplay.map((el, i) => (
          <Card key={i} info={el.flight} />
        ))}
        {flights.length === 0 && <p>по данному запросу билетов не найдено</p>}
        {flightsDisplay.length === flights.length ? null : (
          <button
            onClick={() => {
              setFlightsDisplay((state) =>
                state.concat(
                  flights.slice(
                    flightsDisplay.length,
                    flightsDisplay.length + 10
                  )
                )
              );
            }}
          >
            Показать еще
          </button>
        )}
      </section>
    </main>
  );
}

export default App;
