"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useSyncExternalStore } from "react";
import Logo from "@/components/layout/Logo";
import { MIN_AGE, SLOGAN, STORAGE_KEYS } from "@/lib/constants";
import { createPersistedStore } from "@/lib/persisted-store";
import { useMotionPreference } from "./ReducedMotionProvider";

const ageStore = createPersistedStore<boolean>({
  key: STORAGE_KEYS.age,
  initial: false,
  parse: (raw) => raw === "true" || raw === '"true"',
});

/**
 * Entry age confirmation.
 *
 * Deliberately has no backdrop-click or Escape dismissal: the visitor has to
 * answer. Both choices stay keyboard-reachable, and the answer is remembered
 * in localStorage so it's asked once.
 *
 * Known limitation: because the check runs after hydration, the page is
 * briefly visible underneath before the gate paints. Moving the flag to a
 * cookie read in middleware would remove that.
 */
export default function AgeGate() {
  const { reduced } = useMotionPreference();

  const confirmed = useSyncExternalStore(
    ageStore.subscribe,
    ageStore.getSnapshot,
    ageStore.getServerSnapshot,
  );
  const loaded = useSyncExternalStore(
    ageStore.subscribeLoaded,
    ageStore.getLoadedSnapshot,
    ageStore.getLoadedServerSnapshot,
  );

  // Stays shut until storage has actually been read, so a returning visitor
  // never sees the gate flash before their answer loads.
  const open = loaded && !confirmed;

  const confirm = () => ageStore.set(true);

  const decline = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[95] bg-ink/90 backdrop-blur-md" />
        <Dialog.Content
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className="fixed left-1/2 top-1/2 z-[96] w-[min(30rem,92vw)] -translate-x-1/2 -translate-y-1/2 border-2 border-ink bg-paper-light p-7 text-center shadow-[10px_10px_0_var(--color-ember)] sm:p-9"
          style={{
            transition: reduced ? "none" : "opacity 240ms var(--ease-paper)",
          }}
        >
          <Logo className="mx-auto h-12 w-auto" />

          <Dialog.Title className="display mt-6 text-3xl leading-none">
            Are you {MIN_AGE} or older?
          </Dialog.Title>

          <Dialog.Description className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            OSA makes smoking accessories for adults. You need to be {MIN_AGE} or
            older to browse and buy.
          </Dialog.Description>

          <div className="mt-7 flex flex-col gap-3">
            <button type="button" onClick={confirm} className="btn btn-primary w-full">
              Yes, I&apos;m {MIN_AGE} or older
            </button>
            <button type="button" onClick={decline} className="btn btn-quiet w-full">
              No, take me away
            </button>
          </div>

          <p className="editorial mt-7 text-xs italic text-ink-soft">{SLOGAN}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
