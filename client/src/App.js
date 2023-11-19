import {useEffect, useState} from "react";
const API_URL = "http://127.0.0.1:8080/api";

function App() {
  const [data, setData] = useState("No data :(");
  
  useEffect(() => {
    async function getData() {
        const url = `${API_URL}/hello`;
        const response = await fetch(url);

        //const data = await response.json();
        setData(await response.text());

    }
    getData();
  }, []); 

  return (
    <main>
      <h1>MERN App!</h1>
      <p>Data from server: {data}</p>
    </main>
  );
}

export default App;
