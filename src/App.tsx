import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import {
  HomePage,
  SpearPage,
  CloseSkyProjectPage,
  WarBoundCreatorPage,
  CustomSlidesPage,
  RandomiserExample
} from '@/routeComponents';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spear" element={<SpearPage />} />
          <Route path="/custom_slides" element={<CustomSlidesPage />} />
          <Route path="/close_sky_project" element={<CloseSkyProjectPage />} />
          <Route path="/warbound_maker" element={<WarBoundCreatorPage />} />
          <Route path="/randomiser_example" element={<RandomiserExample />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
