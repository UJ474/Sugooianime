import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Footer from './assets/components/footersection'
import Header from './assets/components/headersection'
import TrendingAnime from './assets/HomePage/TrendingAnime/trendinganime.jsx'
import SuggestedAnime from './assets/HomePage/SuggestedAnime/suggestedanime.jsx'

function App() {

  return (
    <>
    <Router>
      <Header />
        <Routes>
          <Route path='/' element={<TrendingAnime />} />
          <Route path='/suggested' element={<SuggestedAnime />} />
        </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App