import Link from "next/link";

export default function Home() {
  return (
    <div>
      Hello Guys This is CloudFlare Pages.{" "}
      <Link href="/about">
        About
      </Link>
    </div>
  );
}
