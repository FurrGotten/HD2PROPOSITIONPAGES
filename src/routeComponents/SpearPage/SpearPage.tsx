import './SpearStyle.css';
import {useSearchParams} from 'react-router-dom';
import {Intro, TrajectoryProposal, ProjectileProposal, EndNotes} from './components';
import {HelldiverReveal} from '@/components';
import {SlideWrapper} from '@/components/SlideWrapper';

export function SpearPage() {
  const [searchParams] = useSearchParams();

  const manual: boolean = !!searchParams.get('manual');

  const components = [
    <HelldiverReveal key="Intro"><Intro/></HelldiverReveal>,
    <HelldiverReveal key="TG0"><TrajectoryProposal key="TG0Component" step={0}/></HelldiverReveal>,
    <HelldiverReveal key="TG1"><TrajectoryProposal key="TG1Component" step={1}/></HelldiverReveal>,
    <HelldiverReveal key="TG2"><TrajectoryProposal key="TG2Component" step={2}/></HelldiverReveal>,
    <HelldiverReveal key="TG3"><TrajectoryProposal key="TG3Component" step={3}/></HelldiverReveal>,
    <HelldiverReveal key="PG0"><ProjectileProposal key="PG0Component"/></HelldiverReveal>,
    <HelldiverReveal key="PG1"><ProjectileProposal key="PG1Component" step={1}/></HelldiverReveal>,
    <HelldiverReveal key="PG2"><ProjectileProposal key="PG2Component" step={2}/></HelldiverReveal>,
    <HelldiverReveal key="END"><EndNotes/></HelldiverReveal>,
  ];

  return <section className="spear-page-base">
    <div className="static-bg" />
    <div className="content">
      {manual ? components : <SlideWrapper slides={components}/>}
    </div>
  </section>;
}
