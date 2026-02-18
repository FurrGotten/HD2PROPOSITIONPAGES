import './CommonStyles.css';
import './IntroStyles.css';
import SpearIcon from '../../../assets/FAF_SpearIcon.png';
import {Hologram} from '../../../components';

export function Intro() {
  return <section className="common-spear-base intro-spear-base">
    <div className="image-holder">
      <Hologram>
        <img src={SpearIcon} alt="FAF-SPEAR" />
      </Hologram>
    </div>
    <div className="text-holder">
      <h1>Let’s talk about the FAF Spear. While inspired by the legendary fire-and-forget systems of old Earth,
        the current orbital-issued Spear is struggling to find its place.</h1>
      <h1>
        In its current state, Helldivers are burdened with all the Javelin's drawbacks—limited ammunition and
        grueling reload times—without the guaranteed lethality to justify them. Despite being marketed as a
        'user-friendly' solution, the Spear currently demands more patience and positioning than the trusty
        Recoilless Rifle, often with less consistent results on the frontlines.</h1>
      <h1 className="critical-info">Lest discuss how we can improve the spear for our soldiers!</h1>
    </div>
  </section>;
}
