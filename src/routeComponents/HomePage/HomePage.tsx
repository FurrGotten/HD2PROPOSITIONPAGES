import {Link} from 'react-router-dom';
import SpearIcon from '@/assets/spearRelatedAssets/FAF_SpearIcon.png';

import './HomeStyle.css';
import {Hologram, TerminalEffects} from '@/components';

export function HomePage() {
  return <section className="home-page-base terminal-checker">
    <TerminalEffects />
    <div className="static-bg" />
    <div className="content">
      <div className="menu-row">
        <Link className="menu-link" to="spear">
          <Hologram>
            <img src={SpearIcon} alt="FAF-SPEAR" />
          </Hologram>
        </Link>
        <Link className="menu-link" to="close_sky_project">
          <Hologram>
            <div className="menu-noise-ico gray-noise" />
          </Hologram>
        </Link>
      </div>
      <div className="menu-row">
        <Link className="menu-link" to="warbound_maker">
          <Hologram>
            <div className="wb-maker-link">
              WR
              MAKER
            </div>
          </Hologram>
        </Link>
        <Link className="menu-link" to="custom_slides">
          <Hologram>
            <div className="wb-maker-link">
              SLIDE
              MAKER
            </div>
          </Hologram>
        </Link>
      </div>
    </div>
  </section>;
}
