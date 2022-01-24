import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const [state, setState] = useState({
    data: '',
    query: 'Пермь',
  });

  function getData() {
    
    // Email https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/email
    // Адреса https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address
    // Банки https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank
    // Валюты https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/currency
    // Кем выдан паспорт https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fms_unit
    // Марки автомобилей https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/car_brand
    // Мировые суды https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/region_court
    // Налоговые инспекции https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fns_unit
    // ОКВЭД https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/okved2
    // ОКПД https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/okpd2
    // ОКТМО https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/oktmo
    // Организации https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party
    // Почтовые отделения https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/postal_unit
    // Станции метро https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/metro
    // Страны https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/country
    // Таможни https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fts_unit
    // Товары и услуги https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/mktu
    // ФИАС https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/oktmo
    // ФИО https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio
    
    const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
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
        <pre>
          { JSON.stringify(state, null, 2) }
        </pre>
      </>
    </div>
  );
}
