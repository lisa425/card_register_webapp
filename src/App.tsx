import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@pages/Home'
import TestPage from '@pages/Test'
import CardPage from './pages/Card'
import ScrollToTop from './components/shared/ScrollToTop'
import SignUpPage from './pages/SignUp'
import SignInPage from './pages/SignIn'
import Navbar from './components/shared/Navbar'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/test" Component={TestPage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/signin" Component={SignInPage} />
        <Route path="/signup" Component={SignUpPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
