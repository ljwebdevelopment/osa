"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeToNewsletter, type NewsletterState } from "@/lib/newsletter";

const initialState: NewsletterState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary shrink-0">
      {pending ? "Sending…" : "Sign up"}
    </button>
  );
}

export default function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);

  const tone =
    state.status === "invalid" || state.status === "error"
      ? "text-ember"
      : "text-gold";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div>
        <h2 className="display text-3xl leading-none text-paper-light sm:text-4xl">
          Stay in the rotation.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/70">
          New collections, limited drops, and studio updates — sent occasionally.
        </p>
      </div>

      <form action={formAction} className="w-full" noValidate>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-describedby="newsletter-status"
              aria-invalid={state.status === "invalid" || undefined}
              className="h-12 w-full border-2 border-paper/40 bg-transparent px-4 text-paper-light placeholder:text-paper/40 focus:border-gold focus:outline-none"
            />
          </div>
          <SubmitButton />
        </div>

        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className={`mt-3 min-h-5 text-xs ${tone}`}
        >
          {state.status !== "idle" ? state.message : ""}
        </p>
      </form>
    </div>
  );
}
