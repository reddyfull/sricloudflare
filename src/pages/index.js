import Link from "next/link";

export default function Home() {
  return (
    <div>
      This  is  Cloudflare Sample pages.{" "}
      <Link href="/about">
        About
      </Link>
    </div>
  );
}
