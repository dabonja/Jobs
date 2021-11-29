import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Home2 from './components/Home2'
import Artisans from './components/Artisans'
import {
  Routes,
  Route
} from "react-router-dom";
import ArtisanForm from './components/ArtisanForm'
import Footer from './components/Footer';


function App() {

  /*Pretraga poslova putem search inputa */
  const [searchValue, setSearchValue] = useState('');
  /*kategorije poslova*/
  const [category, setCategory] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [allArtisans, setAllArtisans] = useState([])
  const [searchedArtisan, setSearchedArtisan] = useState('');
  const [numberOfJobs, setNumberOfJobs] = useState({})
  const [fetchError, setFetchError] = useState(null);
  const [noArtisansFound, setNoArtisansFound] = useState(false);

  const countAllJobs = () => {
    let counts = {};
    for (const num of category) {
      counts[num.category] = counts[num.category] ? counts[num.category] + 1 : 1;

    }

    setNumberOfJobs(counts)

  }
  const handleChange = (e) => {
    setSearchValue({ searchValue: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let filteredArtisans = artisans.filter(art => {
      return art.fullName === searchValue.searchValue;
    })

    if (filteredArtisans.length === 0) {
      setNoArtisansFound(true);
    }
    setArtisans([...filteredArtisans])
    setSearchedArtisan(searchValue)
  }


  const initialValues = {
    fullName: '',
    location: '',
    contact: '',
    firm: '',
    profession: ''
  }
  //company
  const [values, setValues] = useState(initialValues);

  const handleArtisanChange = (e) => {

    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    })

    //setFavoriteRecipes([...favoriteRecipes, favs]);

  }
  const handleArtisanSubmit = (e) => {
    e.preventDefault();

    setArtisans([...artisans, values])

    fetch('http://localhost:3001/artisans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }).then(() => {
      console.log('added new artisan');
    })

  }

  const getArtisans = async () => {
    try {
      const url = 'http://localhost:3001/artisans';
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('No data from server.')
      }
      const data = await res.json();

      setArtisans([...data])
      setAllArtisans([...data])

    } catch (error) {
      console.log(error.message);
    }
  }



  const getData = async () => {

    try {
      const url = 'http://localhost:3001/api';
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('No data from server.')
      }
      const data = await res.json();
      setCategory([...data.allJobs])

    } catch (error) {

      setFetchError(error.message);

    }
  }

  useEffect(() => {
    getData();
    getArtisans();
    countAllJobs();

  }, [])

  useEffect(() => {
    if (searchedArtisan.searchValue === '') {
      setArtisans([...allArtisans])
    }
  }, [searchedArtisan])


  if (fetchError) {
    return <div>
      <Navbar />
      <Routes>
        <Route path="/Artisans" element={<Artisans artisans={artisans} found={noArtisansFound} onChange={handleChange} onSubmit={handleSubmit} value={searchValue} />} />
        <Route path="/ArtisanForm" element={<ArtisanForm onChange={handleArtisanChange} onSubmit={handleArtisanSubmit} />} />
        <Route index path="/" element={<Home jobs={category} />} />
      </Routes>
      <h1>{fetchError}</h1></div>
  } else {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/Artisans" element={
            <Artisans artisans={artisans} found={noArtisansFound} onChange={handleChange} onSubmit={handleSubmit} value={searchValue} />
          } />
          <Route path="/ArtisanForm" element={<ArtisanForm onChange={handleArtisanChange} onSubmit={handleArtisanSubmit} />} />
          <Route index path="/" element={<Home jobs={category} />} />

        </Routes>
        {/* 
        <footer>Da</footer>
                <Footer allJobs={numberOfJobs} />
      */}
      </>
    )
  }
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