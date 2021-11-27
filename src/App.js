import './App.css';
import { useEffect, useState } from 'react';
import SearchNav from './components/SearchNav';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Artisans from './components/Artisans'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {

  let allJobs = [
    {
      id: 1,
      category: 'Moleraj',
      firm: 'Cile RedFirm',
      description: 'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Indjija',
      contact: '0645467723'
    },
    {
      id: 2,
      category: 'Obrada metala',
      firm: 'Vrh 2033',
      description: 'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Beska',
      contact: '0645467723'
    },
    {
      id: 3,
      category: 'Elektro instalater',
      firm: 'Elektrotim M&R',
      description: 'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Indjija',
      contact: '0645467723'
    },
    {
      id: 4,
      category: 'Vodoinstalater',
      firm: 'SZR Kamaco',
      description: 'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Indjija',
      contact: '0645467723'
    }, {
      id: 5,
      category: 'Keramicar',
      firm: 'SZR Kamaco',
      description: 'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Indjija',
      contact: '0645467723'
    }, {
      id: 6,
      category: 'Moleraj',
      firm: 'SZR Kamaco',
      description: 'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Indjija',
      contact: '0645467723'
    },
    {
      id: 7,
      category: 'Obrada metala',
      firm: 'Bravarija d.o.o',
      description: 'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Zemun',
      contact: '0645467723'
    }

  ]
  let allArtisans = [
    {
      id: 0, 
      fullName: 'Danijel Dabic',
      profession: 'Elektronicar',
      firm: 'Backe d.o.o',
      contact: '0632231278',
      rated: 7,
      location: 'Beska'
    },
    {
      id: 1, 
      fullName: 'Danijel Dabic',
      profession: 'Elektronicar',
      firm: 'Backe d.o.o',
      contact: '0632231278',
      rated: 7,
      location: 'Beska'
    },
    {
      id: 2, 
      fullName: 'Danijel Dabic',
      profession: 'Elektronicar',
      firm: 'Backe d.o.o',
      contact: '0632231278',
      rated: 4,
      location: 'Beska'
    }, {
      id: 3, 
      fullName: 'Danijel Dabic',
      profession: 'Elektronicar',
      firm: 'Backe d.o.o',
      contact: '0632231278',
      rated: 9,
      location: 'Beska'
    }, {
      id: 4, 
      fullName: 'Danijel Dabic',
      profession: 'Elektronicar',
      firm: 'Backe d.o.o',
      contact: '0632231278',
      rated: 5,
      location: 'Beska'
    }, {
      id: 5, 
      fullName: 'Danijel Dabic',
      profession: 'Elektronicar',
      firm: 'Backe d.o.o',
      contact: '0632231278',
      rated: 8,
      location: 'Beska'
    }, {
      id: 6, 
      fullName: 'Danijel Dabic',
      profession: 'Elektronicar',
      firm: 'Backe d.o.o',
      contact: '0632231278',
      rated: 4,
      location: 'Beska'
    }
  ]
  /*Pretraga poslova putem search inputa */
  const [searchValue, setSearchValue] = useState('');
  /*kategorije poslova*/
  const [category, setCategory] = useState([]);
  const [artisans, setArtisans] = useState([]);

  const handleChange = (e) => {
    setSearchValue({ searchValue: e.target.value })
  }

  const handleSubmit = (e) => {


  }

  useEffect(() => {
    setCategory([...allJobs])
    setArtisans([...allArtisans])
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Artisans" element={<Artisans  artisans={artisans}/>} />
        <Route index element={<Home jobs={category} />} />
      </Routes>
    </>
  );
}

export default App;
/*


      <SearchNav value={searchValue} onChange={handleChange} onSubmit ={handleSubmit}/>
        <Route exact
            path="/Home"
            render={(props) => (
              <Home {...props} jobs={category} />
            )}
          />
*/