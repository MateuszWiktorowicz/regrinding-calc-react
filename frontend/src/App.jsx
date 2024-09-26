import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegrindingForm from './components/RegrindingForm/RegrindingForm'
import { fetchToolPrices, fetchCoatingPrices, fetchToolTypes, fetchCoatingTypes } from './components/RegrindingForm/fetchPrices';
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [toolPrices, setToolPrices] = useState([]);
  const [coatingPrices, setCoatingPrices] = useState([]);
  const [toolTypes, setToolTypes] = useState([]);
  const [coatingTypes, setCoatingTypes] = useState([]);

  useEffect(() => {
      const loadData = async () => {
          const tools = await fetchToolPrices();
          const coatings = await fetchCoatingPrices();
          const toolTypes = await fetchToolTypes();
          const coatingTypes = await fetchCoatingTypes();
          setToolPrices(tools);
          setCoatingPrices(coatings);
          setToolTypes(toolTypes);
          setCoatingTypes(coatingTypes);
      };
      loadData();
  }, []);

  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<RegrindingForm toolPrices={toolPrices} coatingPrices={coatingPrices} toolTypes={toolTypes} coatingTypes={coatingTypes}/>} />
      </Routes>
      <Footer />
      </BrowserRouter>
    
    
    
    </>
  )
}

export default App
