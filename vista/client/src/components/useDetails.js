/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function useDetails() {
  const [user,setUser] = useState({}); 

  const setData = (data) => {
    localStorage.setItem('myData', JSON.stringify(data))
  };

  const getData = () => {
    let data = localStorage.getItem('myData');
    data = JSON.parse(data);
    console.log(data);
    setUser(data)
  };

  return [setData, getData, user]
};

export default useDetails;