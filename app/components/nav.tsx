"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './nav.module.css';

export function Nav() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/blog",
      label: "Blog",
      active: pathname === "/blog",
    },
  ];

  return (
    <nav id="nav" className={`${styles.navwrapper}`}>
      <div className={`${styles.navbar}`}>
        {routes.map((route) => (
          <Link
            className={`monoSm ${styles.navitem} ${route.active ? styles.active : ''}`}
            key={route.href}
            href={route.href}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Nav;