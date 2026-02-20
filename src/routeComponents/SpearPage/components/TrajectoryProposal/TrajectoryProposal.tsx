import {Hologram} from '@/components';
import OriginalTrajectory from '@/assets/trajectoryAssets/OriginalSpearTrajectory.png';
import NewSpearTrajectory from '@/assets/trajectoryAssets/NewSpearTrajectory.png';
import trajectoriesNew from '@/assets/trajectoryAssets/tragectoriesNewSpear.png';
import HelpYourFriendWIthASpear from '@/assets/trajectoryAssets/HelpYourFriendWIthASpear.png';

import '@/routeComponents/SpearPage/components/CommonStyles.css';
import './TrajectoryProposalStyles.css';

interface TrajectoryProps {
  step?: number;
}

export function TrajectoryProposal({step = 0}: TrajectoryProps) {

  const steps = [OriginalTrajectory, NewSpearTrajectory, trajectoriesNew, HelpYourFriendWIthASpear];

  return <section className="common-spear-base trajectory-spear-base">
    {step === 0 && <div className="text-holder">
      <h1>The current FAF Spear flight path is not only a departure from its Old Earth heritage but is fundamentally
        tactically flawed. By prioritizing a shallow direct-engagement arc, the missile consistently targets the most
        reinforced frontal plating or 'spaced armor' components (such as the Factory Strider’s chassis or Vox
        plates).</h1>
      <h1 className="critical-info">
        Operational Hazards include:
      </h1>
      <h1 className="danger-info">
        <h1>---Environmental Interference: The low-altitude trajectory frequently results in premature detonation
          against terrain, flora, or fellow Helldivers.---</h1>

        <h1>---Diminished Lethality: High-damage yields are wasted against heavy armor plates rather than vital
          internal components.---</h1>
      </h1>
      <h1>Even in rare instances of top-down impact, the lack of a true 'Top-Attack' logic means the Spear fails to
        exploit the thinner roof armor of Automaton and Terminid heavies (As if they have one, but on that later). We
        are left with a weapon that is more likely
        to hit a bush than an enemy roof.</h1>
    </div>}
    <div className="image-holder">
      <Hologram className="image">
        <img src={steps[step]} alt="Trajectory" className="image" />
      </Hologram>
    </div>
    {step === 1 &&
      <div className="text-holder">
        <h1>Scientists and Engineering proposes the <span
          className="critical-info">Advanced Top-Attack Protocol (ATAP)</span> demonstrated above. This trajectory
          modification utilizes a high-altitude ascent to clear environmental obstructions, followed by a steep,
          gravity-assisted vertical descent. By prioritizing terminal velocity and a near-90-degree impact angle, the
          Spear effectively bypasses reinforced frontal plating to strike the vulnerable top-armor of heavy-class
          threats with surgical precision.</h1>
      </div>
    }
    {step === 2 &&
      <div className="text-holder">
        <h1>The <span className="critical-info">ATAP</span> system utilizes dynamic pathfinding to adjust flight
          altitude based on target proximity. This
          includes experimental 'vertical-stall' trajectories for close-range threats, ensuring that even nearby targets
          are neutralized from above. While this increases Time-to-Hit (TTH), the trade-off is undeniable: superior
          clearing of obstacles, optimized impact angles, and true fire-and-forget reliability at any distance.</h1>
      </div>
    }
    {step === 3 &&
      <div className="text-holder">
        <h1>The <span className="critical-info">ATAP</span> trajectory enables total indirect fire over urban and
          mountainous terrain. By integrating the
          <span className="critical-info"> squad’s marking system</span> into the weapon's targeting array, the Spear
          can now lock onto threats without direct
          line-of-sight. This allows for precision support of stealth divers or separated squadmates, effectively
          bypassing enemy jamming through the use of <span className="critical-info">Super Earth’s superior tactical data-link.</span>
        </h1>
      </div>
    }
  </section>;
}
