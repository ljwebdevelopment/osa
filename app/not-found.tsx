import Link from "next/link";
import Glyph from "@/components/system/Glyph";

export default function NotFound() {
  return (
    <section className="border-b-2 border-ink bg-paper">
      <div className="wrap flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
        <Glyph name="compass" className="h-12 w-12 text-ember" />
        <p className="eyebrow mt-6 text-ember">404</p>
        <h1 className="display ink-offset mt-3 text-[clamp(2.2rem,6vw,4rem)] leading-none">
          Off the map.
        </h1>
        <p className="editorial mt-4 max-w-md text-lg text-ink-soft">
          That page isn&apos;t here. The collections are, though.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-primary">
            Shop collections
          </Link>
          <Link href="/" className="btn btn-secondary">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
