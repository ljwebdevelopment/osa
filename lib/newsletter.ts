"use server";

/**
 * Newsletter boundary.
 *
 * No email provider is connected yet. This action validates the address and
 * reports back truthfully that the signup is not being stored anywhere — it
 * never claims a subscription succeeded.
 *
 * To connect a provider, replace the body of `subscribeToNewsletter` with a
 * call to it (Klaviyo, Mailchimp, Buttondown, ConvertKit all expose a single
 * "add subscriber" endpoint) and return `{ status: "success" }` on a 2xx.
 * Keep the validation above it and the shape of the return value the same;
 * `NewsletterForm` renders straight off these states.
 */

export type NewsletterState =
  | { status: "idle" }
  | { status: "invalid"; message: string }
  | { status: "error"; message: string }
  | { status: "unconfigured"; message: string }
  | { status: "success"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function subscribeToNewsletter(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { status: "invalid", message: "Enter an email address." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "invalid", message: "That doesn't look like a valid email address." };
  }

  return {
    status: "unconfigured",
    message:
      "Thanks for the interest — the mailing list isn't connected yet, so nothing was saved. Check back shortly.",
  };
}
