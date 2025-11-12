import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Footer from './assets/components/footersection'
import Header from './assets/components/headersection'
import SuggestedAnime from './assets/SuggestedAnime/suggestedanime.jsx'
import HomePagecontent from './assets/HomePage/HomePagecontent.jsx'
import CurrentAnimes from './assets/CurrentAnime/currentanimes.jsx'
import GenrePage from './assets/GenrePage/genrepage.jsx';
import SpecificGenre from './assets/SpecificGenre/specificgenre.jsx';
import AnimePage from './assets/AnimePage/animepage.jsx'
import SearchResults from './assets/SearchResult/searchresult.jsx';
import Signup from './components/Auth/Signup.jsx';
import Login from './components/Auth/Login.jsx';


function App() {

  return (
    <>
    <Router>
      <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<HomePagecontent />} />
          <Route path='/suggested' element={<SuggestedAnime />} />
          <Route path='/current' element={<CurrentAnimes />} />
          <Route path='/filter' element={<GenrePage />} />
          <Route path='/genre/:genreName' element={<SpecificGenre />} />
          <Route path='/anime/:animeId' element={<AnimePage />} />
          <Route path="/search/:query" element={<SearchResults />} />
          {/* <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} /> */}
        </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App