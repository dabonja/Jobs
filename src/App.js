import './App.css';
import { useEffect, useState, useRef, useReducer } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Artisans from './components/Artisans'
import {
  Routes,
  Route,
  useNavigate,
  BrowserRouter as Router
} from "react-router-dom";
import ArtisanForm from './components/ArtisanForm';
import ArtisanDetails from './components/ArtisanDetails'
import Profile from './components/Profile'
import RateArtisanForm from './components/RateArtisanForm'
import axios from 'axios';



/*
const reducer  =(state,action)=>{
  if(action.type === 'load'){
    return {...state, categories: [1,2,3]}
  }
}
*/

function App() {

  //  const  [categoryState, dispatch] = useReducer(reducer, initialCategoryState)


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
  const [dataSubmited, setDataSubmited] = useState(false);
  const [inputErrors, setInputErrors] = useState({ fullname: false, location: false, contact: false, company: false, profession: false });
  const [inputValues, setInputValues] = useState({ fullname: '', location: '', contact: null, company: '', profession: '' })
  const [showElement, setShowElement] = useState('none')
  const [pickedArtisan, setPickedArtisan] = useState({});
  const [userRatedError, setUserRatedError] = useState('');
 

  const [artisanRating, setArtisanRating] = useState({});
  const [artisanId, setArtisanId] = useState(0);
  const formRef = useRef(null);
  const refContainer = useRef(null);
  let navigate = useNavigate();

  /*Metoda koja vraca sve poslove na oglasu, trenutno nisam okacio komponentu za renderovanje */
  const countAllJobs = () => {
    let counts = {};
    for (const num of category) {
      counts[num.category] = counts[num.category] ? counts[num.category] + 1 : 1;

    }

    setNumberOfJobs(counts)

  }
  /*Setovanje vrednosti pretrage majstora */
  const handleChange = (e) => {
    setSearchValue({ searchValue: e.target.value })
  }
  /*Pretraga majstora */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedArtisan(searchValue)
  }
  /*Upisivanje majstora pre validacije */
  const handleArtisanChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value
    })
  }
  /*Pomoc pri validaciji. Ako sva polja budu true, validacija moze da ide dalje */
  const allTrue = (obj) => {
    return Object.keys(obj).every((i) => {
      return obj[i];
    })
  }
  /*Prikaz uspesnog dodavanja i uklanjanje nakon navedenog vremenskog perioda */
  const success = () => {

    setTimeout(() => {
      refContainer.current.reset();
      setShowElement('none');

    }, 3000)
  }

  /*Validacija unesenih podataka o majstoru */
  const validateArtisanData = (data) => {

    const { fullname, contact, company, location, profession } = data;
    let newState = Object.assign({}, inputErrors)

    /*Provera praznih polja */

    for (const prop in data) {
      if (data[prop] === '' || data[prop] === null) {
        refContainer.current.elements[prop].style = "border: 1px solid red";
      } else {
        refContainer.current.elements[prop].style = "border: 2px solid green";
      }
    }

    /*Parsiram u string, proveravam duzinu stringa */
    let fullnameParsed = String(fullname);
    if (typeof fullnameParsed === 'string' && fullnameParsed.length > 5) {
      newState.fullname = true;
    }

    /* Parsiram u string, proveravam duzinu stringa company*/
    let companyParsed = String(company);
    if (typeof companyParsed === 'string' && companyParsed.length > 3) {
      newState.company = true;
    }

    /*Parsiram u string, proveravam duzinu location */
    let locationParsed = String(location);
    if (typeof locationParsed === 'string' && locationParsed.length > 2) {
      newState.location = true;
    }
    /*Parsiram u broj, proveravam tip */
    let contactParsed = parseInt(contact);
    if (!isNaN(contactParsed)) {
      newState.contact = true;
    }
    let parsedProfession = String(profession);

    if (typeof parsedProfession === 'string' && parsedProfession.length > 3) {
      newState.profession = true;
    }

    if (!allTrue(newState)) {
      return false;
    }
    setShowElement('block');
    success();
    return true;

  }
  /*Dodavanje majstora u bazu podataka */
  const handleArtisanSubmit = (e) => {
    e.preventDefault();
    let valid = validateArtisanData(inputValues);
    console.log(valid);
    if (valid) {
      fetch('http://localhost:3001/addartisans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': inputValues.length },
        body: JSON.stringify(inputValues)
      }).then((data) => {
        setDataSubmited(true);
      }).catch(() => {
        setDataSubmited(false);
      })

    } else {
      return;
    }

  }
  /*Dobavljanje svih majstora iz baze podataka */
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
  /*Dobavljanje svih poslova, kategorija. Jos trebam poraditi na ovome */
  const getData = async () => {
    try {
      const url = 'http://localhost:3001/jobs';
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('No data from server.')
      }
      const data = await res.json();
      setCategory([...data])

    } catch (error) {
      console.log(error.message);
      setFetchError('Data currently unavailable.');

    }
  }


  /*Preuzimanje kliknutog majstora i navigacija na ArtisanDetails stranicu */
  const getSelectedArtisanId = async (e, path) => {
    e.preventDefault();
    let id = e.target.parentNode.parentNode.id;
    console.log(id);
    try {
      const url = `http://localhost:3001/getartisanbyid/${id}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('No data from server.')
      }
      const data = await res.json();

      setPickedArtisan(data[0])
      navigate(path)
    } catch (error) {
      setFetchError(error.message);
    }
  }
  const [art, setArt]= useState({})
  const getArtisanById = (id)=>{
  
    let targetArtisan = artisans.find(artisan => artisan.id == id)
   setArt(targetArtisan)
  }

  useEffect(() => {
    getData();
    getArtisans();
    countAllJobs();

  }, [])

  useEffect(() => {
    getData();
    getArtisans();
    setDataSubmited(false)

  }, [dataSubmited])

  useEffect(() => {
    if (searchedArtisan.searchValue === '') {
      setArtisans([...allArtisans])
    }
  }, [searchedArtisan])


  /*
    Submit artisan rating with validation
  */
  const handleArtisanRatingSubmit = (event) => {

    event.preventDefault();
    let valid = validateRatings(artisanRating);
    if (valid) {
      axios
        .post('http://localhost:3001/setArtisanRating', artisanRating)
        .then((data) => {
          setUserRatedError('Rating successfull!')
          setArtisanRating({})

        })
        .catch(err => {
          console.log(err.message);
          setUserRatedError('Rating failed!');
          setArtisanRating({})
        });
    } else {
      return;
    }

  }

  const validateRatings = (obj) => {
    const { artisan_id, rating, comment } = obj;

    if (Object.keys(obj).length === 0) {
      setUserRatedError('You have to insert some data.')
      return false;
    }
    else if (rating === '') {
      setUserRatedError('')
      return false;
    }
    else if (parseInt(rating) < 0 || parseInt(rating) > 10) {
      setUserRatedError('Artisan rating can be between 0 - 10.')
      return false;
    }
    else {
      return true;
    }
  }

  const handleArtisanRatingChange = (e) => {
    const { name, value } = e.target;

    setArtisanRating({
      ...artisanRating,
      artisan_id: artisanId,
      [name]: value
    })

  }


  if (fetchError) {
    return <div>
      <Navbar />
      <Routes>
        <Route path="/Artisans" element={<Artisans artisans={artisans} specificArtisan={searchedArtisan} found={noArtisansFound} onChange={handleChange} onSubmit={handleSubmit} value={searchValue} selectArtisan={(e) => {
          getSelectedArtisanId(e, '/ArtisanDetails')
        }} />} />
        <Route path="/ArtisanForm" element={<ArtisanForm onChange={handleArtisanChange} onSubmit={handleArtisanSubmit} disp={showElement} ref={refContainer} />} />
        <Route index path="/" element={<Home jobs={category} />} />
        <Route path="/ArtisanDetails" element={<ArtisanDetails />} />
        <Route path="/RateArtisan" element={<RateArtisanForm ref={formRef}targetArtisan ={art} onChange={handleArtisanRatingChange} onSubmit={handleArtisanRatingSubmit} />} />
      </Routes>
      <div><h1>{fetchError}</h1></div>

    </div>
  } else {
    return (
      <>
        <Navbar />
        <Profile />
        <Routes>
          <Route path="/Artisans" element={
            <Artisans ratedArtisan={(e) => { 
              setArtisanId(e.target.parentNode.parentNode.id) 
              
              getArtisanById(e.target.parentNode.parentNode.id);
            }} artisans={artisans}  specificArtisan={searchedArtisan} found={noArtisansFound} onChange={handleChange} onSubmit={handleSubmit} value={searchValue} selectArtisan={(e) => {
              
              getSelectedArtisanId(e, '/ArtisanDetails')
             
            }}
            />
          } />
          <Route path="/ArtisanForm" element={<ArtisanForm onChange={handleArtisanChange} onSubmit={handleArtisanSubmit} disp={showElement} ref={refContainer} />} />
          <Route index path="/" element={<Home categoriesList={category} />} />
          <Route path="/ArtisanDetails" element={<ArtisanDetails selectedArtisan={pickedArtisan} />} />
          <Route path="/RateArtisan" element={<RateArtisanForm myRef={formRef}  targetArtisan ={art} submitted={userRatedError} onChange={handleArtisanRatingChange} onSubmit={handleArtisanRatingSubmit} />} />
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
