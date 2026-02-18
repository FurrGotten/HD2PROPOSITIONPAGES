import './SpearStyle.css';
import {useSearchParams} from 'react-router-dom';
import {Intro, TrajectoryProposal} from './components';
import {HelldiverReveal} from '../../components';

export function SpearPage() {
  const [searchParams] = useSearchParams();

  const manual: boolean = !!searchParams.get('manual');

  const components = [
    <HelldiverReveal><Intro /></HelldiverReveal>,
    <HelldiverReveal><TrajectoryProposal manual={manual} step={0}/></HelldiverReveal>,
    <HelldiverReveal><TrajectoryProposal manual={manual} step={1}/></HelldiverReveal>,
    <HelldiverReveal><TrajectoryProposal manual={manual} step={2}/></HelldiverReveal>,
  ];

  return <section className="spear-page-base">
    <div className="static-bg" />
    <div className="content">
      {manual ? components[0] : components}
    </div>
  </section>;
}
