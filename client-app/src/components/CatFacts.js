import React, { useState, useEffect } from "react";

export default function CatFacts() {
  const [data, setData] = useState(0);
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  
  useEffect(() => {
  console.log('data change');
    return (() => {
  
      console.log('unmount');
    });
  }, []);

  
  return <div>count : {data}<button onClick={setData(data +1)} >count +1</button></div>;
}
