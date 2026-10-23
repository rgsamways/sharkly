"use client";

import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

/** Talks to the sign-in routes from the browser. Same origin, so no address is needed. */
export const authClient = createAuthClient({ plugins: [magicLinkClient()] });
