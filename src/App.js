import './App.css';
import {useEffect, useState} from 'react';
import SearchNav from './components/SearchNav';
import Navbar from './components/Navbar';
import Home from './components/Home'


function App() {

  let allJobs = [
    {
      id: 1,
      category: 'Moleraj',
      firm: 'Cile RedFirm',
      description:'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Indjija',
      contact: '0645467723'
    },
    {
      id: 2,
      category: 'Bravar',
      firm: 'Vrh 2020',
      description:'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Indjija',
      contact: '0645467723'
    },
    {
      id: 3,
      category: 'Elektro instalater',
      firm: 'Elektrotim M&R',
      description:'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Indjija',
      contact: '0645467723'
    },
    {
      id: 4,
      category: 'Vodoinstalater',
      firm: 'SZR Kamaco',
      description:'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Indjija',
      contact: '0645467723'
    },{
      id:5,
      category: 'Keramicar',
      firm: 'SZR Kamaco',
      description:'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Indjija',
      contact: '0645467723'
    },{
      id: 6,
      category: 'Moleraj',
      firm: 'SZR Kamaco',
      description:'We are stable firm with over 20 years of experience in interior maintenance, repairs and decirations. Also wi do outter works...',
      location: 'Indjija',
      contact: '0645467723'
    }

  ]
  /*Pretraga poslova putem search inputa */
 const [searchValue, setSearchValue] = useState('');
 /*kategorije poslova*/
  const [category, setCategory] = useState([]);
  const [categoryChanged,setCategoryChanged] = useState(false);

    const handleChange =(e)=>{
      setSearchValue({searchValue : e.target.value})
    }
    const handleSubmit=(e)=>{

      let filtered = allJobs.filter( job =>job.category === searchValue.searchValue);

    
      setCategory([...filtered])
    }
  useEffect(()=>{
    setCategory(prevState => [...prevState, ...allJobs])
  },[])

  return (
    <div className="App">
      <Navbar/>
      <SearchNav value={searchValue} onChange={handleChange} onSubmit ={handleSubmit}/>
      <Home jobs = {category} />
    </div>
  );
}

export default App;
