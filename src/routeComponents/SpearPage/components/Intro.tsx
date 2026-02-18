import './CommonStyles.css'
import './IntroStyles.css'
import SpearIcon from '../../../assets/FAF_SpearIcon.png'

export function Intro() {
    return <section className="common-spear-base intro-spear-base">
        <div className="image-holder">
            <img src={SpearIcon} alt="FAF-SPEAR"/>
        </div>
    </section>
}
