"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './nav.module.css';
import { TbBrandLinkedin, TbBrandGithub, TbMail } from 'react-icons/tb';

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
      active: pathname.startsWith("/blog"),
    },
  ];

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/ana-fernandes-rodrigues/",
      label: "LinkedIn",
      icon: TbBrandLinkedin,
      ariaLabel: "Visit my LinkedIn profile"
    },
    {
      href: "https://github.com/ana-rodrigues",
      label: "GitHub",
      icon: TbBrandGithub,
      ariaLabel: "Visit my GitHub profile"
    },
    {
      href: "mailto:hello@anarodrigues.design",
      label: "Email",
      icon: TbMail,
      ariaLabel: "Send me an email"
    }
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
        <div className={styles.socialLinks}>
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                className={styles.socialLink}
                aria-label={social.ariaLabel}
                target={social.href.startsWith("mailto") ? "_self" : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              >
                <Icon aria-hidden="true" />
                <span className={`monoSm ${styles.tooltip}`}>{social.label}</span>
                <span className={styles.srOnly}>{social.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Nav;