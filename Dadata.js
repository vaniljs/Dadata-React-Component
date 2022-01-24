import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const [state, setState] = useState({
    data: '',
    query: 'Пермь',
  });

  function getData() {
    const url =
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token 0fdae12e4c0b5994a025569fe393d38f442dbd6f',
      },
      body: JSON.stringify({ query: state.query }),
    };

    if (state.query.length > 0) {
      fetch(url, options)
        .then((response) => response.json())
        .then((result) => {
          setState((prevState) => {
            return {
              ...prevState,
              data: result,
            };
          });
        })
        .catch((error) => console.log('error', error));
    }
  }

  useEffect(() => {
    getData();
  }, [state.query]);

  return (
    <div>
      <>
        <input
          type="text"
          placeholder={state.query}
          onChange={(e) => {
            setState((prevState) => {
              return {
                ...prevState,
                query: e.target.value,
              };
            });
          }}
        />
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </>
    </div>
  );
}
