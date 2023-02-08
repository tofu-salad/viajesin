import { env } from "../env.mjs";

export default function Home() {
  const xd = env.NEXT_PUBLIC_XD;
  return <main>{xd}</main>;
}
