import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import SoundtrackAorPage from './pages/SoundtrackAorPage';
import PopwavePage from './pages/PopwavePage';
import JazzFusionPage from './pages/JazzFusionPage';
import ImagePreload from './util/imagePreload';

function App() {
    return (
        <BrowserRouter>
            <ImagePreload />
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/soundtrack_aor" element={<SoundtrackAorPage />} />
                <Route path="/popwave" element={<PopwavePage />} />
                <Route
                    path="/80s_90s_jazz_fusion"
                    element={<JazzFusionPage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
