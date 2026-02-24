export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        PLAT∞NIX
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        Backend Development Environment Ready!
      </p>
      <div style={{ marginTop: '2rem' }}>
        <a 
          href="/index.html" 
          style={{ 
            background: '#00ffc3', 
            color: '#1a2332', 
            padding: '1rem 2rem', 
            borderRadius: '8px', 
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          View Current Dashboard →
        </a>
      </div>
    </div>
  );
}