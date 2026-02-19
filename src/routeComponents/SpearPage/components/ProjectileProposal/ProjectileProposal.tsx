import {Hologram} from '@/components';
import '@/routeComponents/SpearPage/components/CommonStyles.css';
import './ProjectileProposalStyles.css';

import tandemImage from '@/assets/spearRelatedAssets/TandemChargeHD2.png';
import heatImage from '@/assets/spearRelatedAssets/HEAT_expanded_HD2.png';

export function ProjectileProposal({step = 0}: {step?: number}) {
  return <section className="common-spear-base projectile-spear-base">
    {step === 0 && <div className="text-holder">
      <h1>
        While the <span className="critical-info">ATAP</span> trajectory successfully bypasses reinforced frontal plates
        and spaced armour of Titans, Tanks, Behemoth Chargers. Certain high-threat targets—such as
        the <span className="danger-info">Factory Strider</span>, <span className="danger-info">'Vox' Engine</span>,
        and <span className="danger-info">Illuminate Harvesters</span>—utilize sophisticated multi-layered roof
        shielding or just interference like the strider turret. To neutralize these assets, standard explosive yields
        are insufficient. R&D proposes two specialized
        warhead variants designed to exploit the Spear’s unique vertical engagement profile.
      </h1>
    </div>}

    {step === 0 && <div className="projectile-section">
      <Hologram>
        <img src={tandemImage} alt="tandem" />
      </Hologram>
      <div className="text-holder">
        <h1>The Tandem-Charge configuration is designed for targets protected by external sub-systems or layered
          plating.</h1>
        <h1>--- <span className="critical-info">Precursor Charge (Yellow)</span>: Upon initial contact, a
          high-velocity precursor charge detonates to strip away external obstructions, such as turret housing,
          strider turrets,
          harvester 'horns' and energy shields.</h1>
        <h1>--- <span className="critical-info" style={{color: 'orange'}}>Primary Penetrator (Orange)</span>: With the
          outer layer compromised, the secondary main charge—optimized for high direct-impact damage—delivers a
          focused blast into the target’s exposed vital core."</h1>
      </div>
    </div>}
    {step === 1 && <div className="heat-projectile-section">
      <Hologram>
        <img src={heatImage} alt="HEAT" />
      </Hologram>
      <div className="text-holder">
        <h1>The <span className="critical-info">Gravity-Assisted HEAT (High-Explosive Anti-Tank)</span> payload
          utilizes the Spear’s steep terminal descent
          to achieve maximum lethality. By combining traditional copper-lining with heavy-metal composites, the
          warhead generates a super-heated molten jet at extreme velocities.</h1>
        <h1>Unlike standard Tank or Recoilless Rifle shells, this payload requires the gravitational acceleration and
          terminal speed only achievable through a vertical <span className="critical-info">ATAP</span> strike. The
          resulting high-temperature stream can
          punch through multiple external and internal layers simultaneously, melting through reinforced turrets,
          vents and internal chassis
          components with a single impact. All of this combined also allows the shield of the Illuminate shield fall
          from contact milliseconds before the liner jet fires out, allowing to reach main body of harvesters and
          their drop ships.</h1>
      </div>
    </div>
    }  </section>;
}
