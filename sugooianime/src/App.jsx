import './App.css'
import Footer from './assets/components/footersection'
import Header from './assets/components/headersection'
import TrendingAnime from './assets/HomePage/TrendingAnime/trendinganime.jsx'
import SuggestedAnime from './assets/HomePage/SuggestedAnime/suggestedanime.jsx'

function App() {

  return (
    <>
      <Header />
      <TrendingAnime />
      {/* <SuggestedAnime /> */}
      
      <Footer />
    </>
  )
}

export default App
