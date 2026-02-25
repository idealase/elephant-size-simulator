interface Props {
  scaleFactor: number;
}

const FACTS = [
  { maxScale: 1.5, text: 'African elephants are already the largest land animals alive. At 6,000 kg, they spend 16-18 hours per day eating.' },
  { maxScale: 2.5, text: 'Your elephant is now the size of Paraceratherium (~15,000 kg), the largest land mammal ever. It was pushing the absolute structural limit.' },
  { maxScale: 4, text: 'Your elephant outweighs the largest sauropod dinosaurs. But sauropods had pneumatized bones and air sacs — your elephant does not.' },
  { maxScale: 6, text: 'At this scale, your elephant needs more than 24 hours per day to eat. Starvation is mathematically inevitable regardless of food availability.' },
  { maxScale: Infinity, text: 'This is firmly in fantasy territory. No terrestrial animal with mammalian physiology could survive at this size. The square-cube law is absolute.' },
];

export function FunFactsPanel({ scaleFactor }: Props) {
  const fact = FACTS.find(f => scaleFactor <= f.maxScale) ?? FACTS[FACTS.length - 1];

  return (
    <div className="card">
      <h2>Did You Know?</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        {fact.text}
      </p>
    </div>
  );
}
