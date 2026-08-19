import { Manrope } from "next/font/google";

/**
 * Body copy — self-hosted by next/font, exposed as --font-manrope.
 *
 * Nexa is a commercial typeface and is not redistributed here, so it is
 * declared with plain @font-face rules in globals.css instead. Drop the woff2
 * files into public/fonts/ and it takes over every heading automatically;
 * until then the stack falls through to Manrope.
 */
export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});
