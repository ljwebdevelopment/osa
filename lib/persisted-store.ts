/**
 * A tiny external store backed by localStorage, shaped for
 * `useSyncExternalStore`.
 *
 * Reading persisted state this way rather than in an effect means the server
 * render and the hydrating client render agree (both see the initial value),
 * and the stored value arrives on subscribe without a cascading re-render.
 */
export interface PersistedStore<T> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  set: (next: T | ((current: T) => T)) => void;
  /** True once the stored value has been read from localStorage. */
  isLoaded: () => boolean;
  subscribeLoaded: (listener: () => void) => () => void;
  getLoadedSnapshot: () => boolean;
  getLoadedServerSnapshot: () => boolean;
}

export function createPersistedStore<T>({
  key,
  initial,
  parse,
}: {
  key: string;
  initial: T;
  /** Validates whatever was in storage; return undefined to fall back. */
  parse: (raw: string) => T | undefined;
}): PersistedStore<T> {
  let value = initial;
  let loaded = false;
  const listeners = new Set<() => void>();

  const emit = () => {
    for (const listener of listeners) listener();
  };

  const load = () => {
    if (loaded) return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        const parsed = parse(raw);
        if (parsed !== undefined) value = parsed;
      }
    } catch {
      // Storage unavailable (private mode, blocked cookies). Carry on with
      // the in-memory value for this session.
    }
    emit();
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      // React calls subscribe after commit, so reading storage here is safe
      // and keeps the hydrating render identical to the server's.
      load();
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: () => value,
    getServerSnapshot: () => initial,
    set(next) {
      const resolved =
        typeof next === "function" ? (next as (c: T) => T)(value) : next;
      if (Object.is(resolved, value)) return;
      value = resolved;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Same as above — the change still applies for this session.
      }
      emit();
    },
    isLoaded: () => loaded,
    subscribeLoaded(listener) {
      listeners.add(listener);
      load();
      return () => {
        listeners.delete(listener);
      };
    },
    getLoadedSnapshot: () => loaded,
    getLoadedServerSnapshot: () => false,
  };
}
