import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage, SpearPage} from '@/routeComponents';
import {TerminalEffects} from '@/components';

function App() {
  return (
    <>
      <TerminalEffects />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spear" element={<SpearPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
