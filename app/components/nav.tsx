import Link from 'next/link';
import styles from './nav.module.css';

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
}

export function Nav() {
  return (
        <nav
          id="nav">
          <div className={`${styles.navbar}`}>
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  className={`monoMd ${styles.navitem}`}
                  key={path}
                  href={path}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
  )
}

export default Nav