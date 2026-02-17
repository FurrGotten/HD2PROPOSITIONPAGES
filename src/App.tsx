import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import {HomePage, SpearPage} from "./routeComponents";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/spear" element={<SpearPage />} />
            </Routes>
        </Router>
    );
}

export default App
