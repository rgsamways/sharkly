export const MIN_PASSWORD = 12;

interface AuthFailure {
  code?: string;
  message?: string;
  status?: number;
}

/**
 * Plain-language wording for sign-in problems. It never says whether an email has an account:
 * a wrong email and a wrong password get the same message.
 */
export function friendlyError(error: AuthFailure | null | undefined): string {
  if (error?.status === 429)
    return "That's a lot of tries. Please wait a few minutes and try again.";
  switch (error?.code) {
    case "INVALID_EMAIL_OR_PASSWORD":
      return "That email and password don't match.";
    case "EMAIL_NOT_VERIFIED":
      return "Please confirm your email first. Use the button below and we'll send the link again.";
    case "PASSWORD_TOO_SHORT":
      return `Please use a password of at least ${MIN_PASSWORD} characters.`;
    case "INVALID_TOKEN":
      return "This link isn't valid any more. Please ask for a new one.";
    default:
      return "Something went wrong. Please try again.";
  }
}
