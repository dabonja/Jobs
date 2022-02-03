import './App.css';
import { useEffect, useState, useRef, useReducer, useContext, createContext } from 'react';
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
import ErrorFallback from './error_boundaries/ErrorFallback';
import PrivateRoute from './components/reg_comp_protected_route';
import RegisterCompany from './components/RegisterCompany';


/*
  state management
*/
const reducer = (state, action) => {
  switch (action.type) {
    case 'get-data':
      return {
        categories: action.data
      }
    case 'set-artisans':

      return {
        arts: action.data
      }
    case 'set-artisan-id':

      return {
        ad: { id: action.artisanId }
      }

    default: return state
  }
}


function App() {

  /*Pretraga poslova putem search inputa */
  const [searchValue, setSearchValue] = useState('');
  /*kategorije poslova*/
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
  const [art, setArt] = useState({})
  const [artisanRating, setArtisanRating] = useState({});
  const [artisanId, setArtisanId] = useState(0);
  const [companyInputs, setCompanyInputs] = useState({ category_id: '', company_description: '', company_name: '', contact_phone: '', location: '' })
  const [companySubmition, setCompanySubmition] = useState(false);
  const [showAlert, setShowAlert] = useState('none');
  const formRef = useRef(null);
  const refContainer = useRef(null);
  let navigate = useNavigate();


  const [{ categories, arts, ad }, dispatch] = useReducer(reducer, { categories: [], arts: ['empty array'], ad: 0 })

  useEffect(() => {

    let timer = setTimeout(() => {
      setShowAlert('none')
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [showAlert])

  /*Metoda koja vraca sve poslove na oglasu, trenutno nisam okacio komponentu za renderovanje */
  const countAllJobs = () => {
    let counts = {};
    for (const num of categories) {
      counts[num.category_name] = counts[num.category_name] ? counts[num.category_name] + 1 : 1;
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
      refContainer.current.elements[0].classList.add('b1');

    }, 3000)

    //ne zaboravi cleartimeout
  }
  /*validacija registracije kompanije */
  const validateCompanyRegistration = (data) => {
    const { category_id, company_description, company_name, contact_phone, location } = data;
    if (data && Object.keys(data).length === 0) {
      return false;
    }
    /*check if empty input, check input length */

    if (company_description === '' || company_description.length < 0) {
      return false;
    }

    if (company_name === '' || company_name.length < 2) {
      return false;
    }
    if (location === '' || location.length < 2) {
      return false;
    }

    if (contact_phone === '' || contact_phone.length < 10) {
      return false;
    }

    if (category_id === '' || category_id === 'Choose the right work for you...') {
      return false;
    }

    return true;
  }
  /*Validacija unesenih podataka o majstoru */
  const validateArtisanData = (data) => {
    //  console.log(inputValues);
    const { fullname, contact, company, location, profession } = data;
    /*Provera praznih polja */

    for (const prop in data) {
      if (data[prop] === '' || data[prop] === null) {

        console.log(refContainer.current.elements[0]);
      } else {

      }
    }

    /*Parsiram u string, proveravam duzinu stringa */
    let fullnameParsed = String(fullname);
    if (typeof fullnameParsed !== 'string' && fullnameParsed.length < 5) {
      // newState.fullname = true;
      return false;
    }

    /* Parsiram u string, proveravam duzinu stringa company*/
    let companyParsed = String(company);
    if (typeof companyParsed !== 'string' && companyParsed.length < 3) {
      // newState.company = true;
      return false;
    }

    /*Parsiram u string, proveravam duzinu location */
    let locationParsed = String(location);
    if (typeof locationParsed !== 'string' && locationParsed.length < 3) {
      // newState.location = true;
      return false;
    }
    /*Parsiram u broj, proveravam tip */
    let contactString = String(contact);

    if (contactString.length < 10) {
      return false;
    }
    let contactParsed = parseInt(contact);
    if (isNaN(contactParsed)) {
      // newState.contact = true;
      return false;
    }
    let parsedProfession = String(profession);

    if (typeof parsedProfession !== 'string' && parsedProfession.length < 3 && parsedProfession === "") {
      // newState.profession = true;
      return false;
    }
    /*
      if (!allTrue(newState)) {
    return false;
  }
    */

    setShowElement('block');

    success();
    return true;

  }
  /*Dodavanje majstora u bazu podataka */
  const handleArtisanSubmit = (e) => {
    e.preventDefault();
    let valid = validateArtisanData(inputValues);

    if (valid) {
      fetch('http://localhost:3001/addartisans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': inputValues.length },
        body: JSON.stringify(inputValues)
      }).then((data) => {
        setDataSubmited(true);
        //napravi neki prikaz podataka koji su poslati na server,
        //npr div sa podacima ispod forme, sa show hide prop
      }).catch(() => {
        setDataSubmited(false);
      })
      setInputValues({ fullname: '', location: '', contact: null, company: '', profession: '' });
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
      //dispatch({type: 'set-artisans', ...data}); problem ovde
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

      dispatch({ type: 'get-data', data });
    } catch (error) {
      console.log(error.message);
      setFetchError('Data currently unavailable.');

    }
  }

  /*Preuzimanje kliknutog majstora i navigacija na ArtisanDetails stranicu */
  const getSelectedArtisanId = async (e, path) => {
    e.preventDefault();
    let id = e.target.parentNode.parentNode.id;

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

  const getArtisanById = (id) => {

    let targetArtisan = artisans.find(artisan => artisan.id == id)
    setArt(targetArtisan)
  }
  useEffect(() => {
    let err = setTimeout(() => {
      setUserRatedError('');
    }, 3000)

    return () => {
      clearTimeout(err)
    }
  }, [userRatedError])

  useEffect(() => {

    getData();
    getArtisans();
    countAllJobs();
    //const {selectionValues, setSelectionValues} = useContext(SelectionContext);

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
  const handleCompanyRegister = (e) => {
    e.preventDefault();
    setShowAlert('block');

    let cf = document.getElementById('cf');

    let valid = validateCompanyRegistration(companyInputs);

    if (valid) {

      fetch('http://localhost:3001/registercompany', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': companyInputs.length },
        body: JSON.stringify(companyInputs)
      }).then((data) => {
        setCompanySubmition(true)

        //proveri status i na osnovu njega obavesti korisnika da li je prosla forma
        //setDataSubmited(true);
        //napravi neki prikaz podataka koji su poslati na server,
        //npr div sa podacima ispod forme, sa show hide prop

      }).catch((error) => {
        console.log(error);

        //setDataSubmited(false);
      })
      setCompanyInputs({ company_name: '', location: '', contact_phone: '', category_id: '', company_description: '' })
      cf.reset();
    }
    else {
      setCompanySubmition(false)
    }
    /*
      
    */

  }
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;

    setCompanyInputs({
      ...companyInputs,
      [name]: value
    })

  }
  const [optionState, setOptionState] = useState('');

  const handleOptionState = (e) => {
    setOptionState(prevState => prevState = e.target.value)

  }
  if (fetchError) {
    return <div>
      <Navbar />
      <Routes>
        <Route path="/Artisans" element={
          <Artisans artisans={artisans} specificArtisan={searchedArtisan} found={noArtisansFound} onChange={handleChange} onSubmit={handleSubmit} value={searchValue} selectArtisan={(e) => { getSelectedArtisanId(e, '/ArtisanDetails') }} />
        } />
        <Route path="/ArtisanForm" element={<ArtisanForm onChange={handleArtisanChange} onSubmit={handleArtisanSubmit} disp={showElement} ref={refContainer} />} />
        <Route index path="/" element={<Home categoriesList={categories} optState={optionState} handleChange={handleOptionState} />} />
        <Route path="/ArtisanDetails" element={<ArtisanDetails />} />
        <Route path="/RateArtisan" element={<RateArtisanForm ref={formRef} targetArtisan={art} onChange={handleArtisanRatingChange} onSubmit={handleArtisanRatingSubmit} />} />
      </Routes>
      <div><h1>{fetchError}</h1></div>
    </div>
  } else {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/Artisans" element={
            <Artisans
              ratedArtisan={(e) => { let target = e.target.parentNode.parentNode.id; setArtisanId(target); getArtisanById(e.target.parentNode.parentNode.id); }}
              artisans={artisans} specificArtisan={searchedArtisan} found={noArtisansFound} onChange={handleChange} onSubmit={handleSubmit} value={searchValue} selectArtisan={(e) => { getSelectedArtisanId(e, '/ArtisanDetails') }} />
          } />
          <Route path="/ArtisanForm" element={<ArtisanForm onChange={handleArtisanChange} onSubmit={handleArtisanSubmit} disp={showElement} ref={refContainer} />} />
          <Route index path="/" element={<Home categoriesList={categories} optState={optionState} handleChange={handleOptionState} />} />
          <Route path="/ArtisanDetails" element={<ArtisanDetails selectedArtisan={pickedArtisan} />} />
          <Route path="/RateArtisan" element={<RateArtisanForm myRef={formRef} targetArtisan={art} submitted={userRatedError} onChange={handleArtisanRatingChange} onSubmit={handleArtisanRatingSubmit} />} />
          <Route path="/registercompany" element={<RegisterCompany onChange={handleCompanyChange} onSubmit={handleCompanyRegister} cat={categories} submited={companySubmition} show={showAlert} />} />
          <Route path="/privateroute" element={<PrivateRoute />} />
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
