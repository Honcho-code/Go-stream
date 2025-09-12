import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import AboutPage from './Pages/AboutPage'
import MovieDetail from './Pages/MovieDetail'
import Navbar from './Components/Navbar'
import { useState } from 'react'
import Footer from './Components/Footer'
import Profile from './Pages/Profile'
function App() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState("")
    const [searchMovies, setSearchMovies] = useState([])
    const [loading, setLoading] = useState(false)



    const API_KEY = "0855565ab8a6d5f5b408c3f9927cc57c"
  const BASE_URL = "https://api.themoviedb.org/3"

    const handleSearchMovie = async(e)=>{
    e.preventDefault()
    console.log("Button click")
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/search/movie?query=${search}&api_key=${API_KEY}`)
    const data = await res.json()
    setSearchMovies(data.results)
    setSearch("")
    setSearchResult(search)
    } catch (error) {
      console.error("Error fetching movie", error)
    }setLoading(false)
  }
  
  return (
    <BrowserRouter>
    <Navbar search={search} setSearch={setSearch} searchResult={searchResult} setSearchResult={setSearchResult} handleSearchMovie={handleSearchMovie}/>
      <Routes>
        <Route path='/' element={<HomePage search={search} setSearch={setSearch} searchResult={searchResult} setSearchResult={setSearchResult} handleSearchMovie={handleSearchMovie} searchMovies={searchMovies} setSearchMovies={setSearchMovies} loading={loading} setLoading={setLoading}/> }/>
        <Route path='/movie/:id' element={<MovieDetail/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
