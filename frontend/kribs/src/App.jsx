import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import Listing from './pages/Listing';
import PropertyDetails from './pages/PropertyDetails'
import { useState, useEffect, createContext } from 'react';

export const AppContext = createContext();

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/properties'); // Adjust path if needed
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        console.log(fetchedData,"fetched data")
        setData(fetchedData);
        console.log("first data log"+ data)
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchdata();
  }, []);

  console.log('Data length:', data.length);
  data.map(item=>console.log(item.category,"category"))

  return (
    <AppContext.Provider value={data}>
      {
        console.log(data,"app context data")
      }
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<Listing properties={data} />} />
          <Route path="/listing/:category" element={<Listing properties={data} />} />
          <Route
            path="/kulproperties/propertydetails/:slug"
            element={<PropertyDetails />}
          />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
