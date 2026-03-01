import './SpearStyle.css';
import {useSearchParams} from 'react-router-dom';
import {Intro, TrajectoryProposal, ProjectileProposal, EndNotes} from './components';
import {HelldiverReveal} from '@/components';
import {SlideWrapper} from '@/components/SlideWrapper';

export function SpearPage() {
  const [searchParams] = useSearchParams();

  const mode: string | 'scroll' | 'manual' | 'simple' | null = searchParams.get('mode');

  const allComponents = [
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

  const pageModes = {
    'scroll': allComponents,
    'manual': <SlideWrapper slides={allComponents}/>,
    'simple': [
      <TrajectoryProposal key="TG2Component" simple step={1}/>,
      <TrajectoryProposal key="TG2Component" simple step={3}/>,
      <ProjectileProposal key="PG2Component" simple step={2}/>,
    ]
  }

  return <section className={'spear-page-base' + (mode === 'simple' ? ' simple-spear-page-base' : '')}>
    <div className="static-bg" />
    <div className="content">
      {!!mode && pageModes[mode as keyof typeof pageModes] ? pageModes[mode as keyof typeof pageModes] : pageModes['manual']}
    </div>
  </section>;
}
