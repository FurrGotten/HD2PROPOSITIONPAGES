import { useState } from 'react'

type Rarity = {
  name: string
  label: string
  probability: number
  color: string
  textColor: string
  count: number
}

const RARITIES: Rarity[] = [
  { name: 'common',   label: 'Common',   probability: 50, color: '#15803d', textColor: '#4ade80', count: 50 },
  { name: 'uncommon', label: 'Uncommon', probability: 25, color: '#1d4ed8', textColor: '#60a5fa', count: 25 },
  { name: 'rare',     label: 'Rare',     probability: 15, color: '#7e22ce', textColor: '#c084fc', count: 15 },
  { name: 'epic',     label: 'Epic',     probability: 5,  color: '#c2410c', textColor: '#fb923c', count: 5  },
  { name: 'scrap',    label: 'Scrap',    probability: 5,  color: '#52525b', textColor: '#a1a1aa', count: 5  },
]

// Logic functions remain the same
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function rollRarity(): Rarity {
  let n = Math.random() * 100
  for (const r of RARITIES) {
    n -= r.probability
    if (n < 0) return r
  }
  return RARITIES[RARITIES.length - 1]
}

function poolRoll(): Rarity[] {
  const pool: Rarity[] = RARITIES.flatMap(r => Array<Rarity>(r.count).fill(r))
  return shuffle(pool)
}

function independentRoll(): Rarity[] {
  return Array.from({ length: 100 }, rollRarity)
}

// Components with Inline Styles
function SlotGrid({ slots }: { slots: Rarity[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: '1px',
        gridTemplateColumns: 'repeat(50, minmax(0, 1fr))'
      }}
    >
      {slots.map((r, i) => (
        <div
          key={i}
          title={r.label}
          style={{
            backgroundColor: r.color,
            aspectRatio: '1 / 1',
            borderRadius: '2px'
          }}
        />
      ))}
    </div>
  )
}

function RarityCounts({ slots }: { slots: Rarity[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {RARITIES.map(r => {
        const rolled = slots.filter(s => s.name === r.name).length
        const pct = Math.round((rolled / slots.length) * 100)
        return (
          <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontFamily: 'monospace' }}>
            <span style={{ width: '80px', color: r.textColor }}>{r.label}</span>
            <div style={{ flex: '1 1 0%', height: '6px', backgroundColor: '#27272a', borderRadius: '9999px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  borderRadius: '9999px',
                  transition: 'all 300ms',
                  width: `${pct}%`,
                  backgroundColor: r.color
                }}
              />
            </div>
            <span style={{ color: '#a1a1aa', width: '56px', textAlign: 'right' }}>
              {rolled} / {r.count}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function RandomiserPanel({
                           title,
                           description,
                           slots,
                           onRoll,
                         }: {
  title: string
  description: string
  slots: Rarity[]
  onRoll: () => void
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{
      backgroundColor: '#18181b',
      border: '1px solid #3f3f46',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          color: '#facc15',
          margin: 0,
          textTransform: 'uppercase'
        }}>{title}</h2>
        <p style={{
          fontSize: '12px',
          color: '#71717a',
          marginTop: '4px',
          lineHeight: '1.625',
          margin: '4px 0 0 0'
        }}>
          {description}
        </p>
      </div>
      <SlotGrid slots={slots} />
      <RarityCounts slots={slots} />
      <button
        onClick={onRoll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '100%',
          padding: '10px 0',
          backgroundColor: isHovered ? '#fde047' : '#facc15',
          color: 'black',
          border: 'none',
          fontWeight: 'bold',
          fontSize: '12px',
          letterSpacing: '0.1em',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 200ms',
          textTransform: 'uppercase'
        }}
      >
        Randomise
      </button>
    </div>
  )
}

export const RandomiserExample = () => {
  const [pool, setPool] = useState<Rarity[]>(poolRoll)
  const [indep, setIndep] = useState<Rarity[]>(independentRoll)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#09090b', color: 'white', padding: '32px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.1em', color: '#facc15', marginBottom: '8px' }}>
        Loot Randomiser
      </h1>

      {/* Legend */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '32px',
        padding: '12px',
        backgroundColor: '#18181b',
        borderRadius: '4px',
        border: '1px solid #3f3f46'
      }}>
        {RARITIES.map(r => (
          <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: r.color }}
            />
            <span style={{ fontSize: '12px', fontFamily: 'monospace', color: r.textColor }}>
              {r.label} {r.probability}%
            </span>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        <RandomiserPanel
          title="Pool Randomiser"
          description={`All 100 slots are pre-filled by weight — exactly ${RARITIES.map(r => `${r.count} ${r.label}`).join(', ')} — then shuffled. The distribution is always guaranteed.`}
          slots={pool}
          onRoll={() => setPool(poolRoll())}
        />
        <RandomiserPanel
          title="Per-Slot Randomiser"
          description="Each of the 100 slots rolls independently against the percentage table. No guaranteed distribution — results can cluster or be skewed on any given roll."
          slots={indep}
          onRoll={() => setIndep(independentRoll())}
        />
      </div>
    </div>
  )
}
