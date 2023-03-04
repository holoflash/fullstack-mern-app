import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import Popwave from './pages/Popwave';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import SoundtrackAor from './pages/SoundtrackAor'
import JazzFusion from './pages/JazzFusion'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/soundtrack_aor" element={<SoundtrackAor />} />
            <Route path="/popwave" element={<Popwave />} />
            <Route path="/80s_90s_jazz_fusion" element={<JazzFusion />} />
            <Route path="/articles/:articleId" element={<ArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;