import Image from "next/image"
import Link from "next/link"
import { site } from "@/lib/site"

/** The horizontal logo. The light and dark artwork swap with the theme in CSS. */
export function Logo() {
  return (
    <Link className="logo" href="/" aria-label={`${site.brand} home`}>
      <Image className="on-light" src="/brand/logo-horizontal-light.svg" alt="" width={150} height={21} unoptimized priority />
      <Image className="on-dark" src="/brand/logo-horizontal-dark.svg" alt="" width={150} height={21} unoptimized priority />
    </Link>
  )
}
