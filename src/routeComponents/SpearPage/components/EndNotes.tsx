import './CommonStyles.css';


export function EndNotes() {
  return <section className="common-spear-base">
    <div className="text-holder" style={{marginTop: '-10rem'}}>
      <h1 className="critical-info" style={{fontSize: 'clamp(1.5rem, 1.5vw + 1.5rem, 3rem)'}}><b>
        NOTES:
      </b></h1>
    </div>
    <div className="text-holder">
      <h1><b>---</b><span className="critical-info">Ballistic Viability: </span> The proposed trajectories are fully
        supported by existing Super Earth hardware.
        Similar high-arc flight profiles are currently utilized by the Wasp’s alternate fire mode, while the Solo Silo
        demonstrates that complex, multi-stage target tracking is already combat-proven and ready for integration
      </h1>
      <h1><b>---</b><span className="critical-info">Strategic Procurement: </span> TR&D recommends the authorization of a
        dedicated <span className="critical-info"> 'Fire Support' Warbond</span>. This would introduce specialized armor sets
        featuring a <span className="critical-info"> 'Targeting Uplink' </span>
        passive—trading general utility for optimized lock-on performance. This follows the successful precedent of
        specialized armor for sidearms, ensuring the Spear becomes the backbone of a dedicated anti-armor squad.
      </h1>
    </div>
  </section>;
}
