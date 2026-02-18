import './SpearStyle.css';
import {useSearchParams} from 'react-router-dom';
import {Intro} from './components/Intro.tsx';
import {HelldiverReveal} from '../../components';

export function SpearPage() {
  const [searchParams] = useSearchParams();

  const manualId: boolean = !!searchParams.get('manual');

  const components = [
    <HelldiverReveal><Intro /></HelldiverReveal>
  ];

  return <section className="spear-page-base">
    <div className="static-bg" />
    <div className="content">
      {manualId ? components[0] : components}
    </div>
  </section>;
}
