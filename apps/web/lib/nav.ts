/** A page is "current" on its own address and on any page below it (Sharks, on a profile). */
export function isCurrentPath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
