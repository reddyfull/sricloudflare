import Link from "next/link";

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page for our Cloudflare Pages sample application.</p>
      
      <div style={{ marginTop: '20px' }}>
        <Link href="/" style={{ color: '#0070f3', textDecoration: 'none', marginRight: '20px' }}>
          Home
        </Link>
        <Link href="/contact-us" style={{ color: '#0070f3', textDecoration: 'none' }}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}
