import {Link} from 'react-router-dom';

import './HomeStyle.css';

export function HomePage() {
  return <section className="home-page-base">
      <div className="static-bg" />
    <div className="content">
      <nav>
        <Link to="/">Home</Link> | <Link to="/spear">Spear</Link>
      </nav>
    </div>
  </section>;
}
