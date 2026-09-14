import Link from "next/link";
import Glyph from "@/components/system/Glyph";

export default function EmptyCartState({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col items-center px-4 py-14 text-center">
      <Glyph name="star" className="h-10 w-10 text-ember" />
      <h3 className="display mt-5 text-2xl">Nothing in the rotation yet.</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
        Nine collections, each with its own artwork. Pick the one that looks
        like your week.
      </p>
      <Link href="/shop" onClick={onNavigate} className="btn btn-primary mt-6">
        Browse collections
      </Link>
    </div>
  );
}
