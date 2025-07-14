import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Footer from './assets/components/footersection'
import Header from './assets/components/headersection'
import SuggestedAnime from './assets/SuggestedAnime/suggestedanime.jsx'
import HomePagecontent from './assets/HomePage/HomePagecontent.jsx'
import CurrentAnimes from './assets/CurrentAnime/currentanimes.jsx'

function App() {

  return (
    <>
    <Router>
      <Header />
        <Routes>
          <Route path='/' element={<HomePagecontent />} />
          <Route path='/suggested' element={<SuggestedAnime />} />
          <Route path='/current' element={<CurrentAnimes />} />
        </Routes>
      <Footer />
    </Router>
    </>
  )
}


export default App