import Link from 'next/link';
import styles from './breadcrumb.module.css';

interface BreadcrumbProps {
    title: string; // Title of the current page
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
    return (
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
            <ul className={styles.breadcrumbList}>
                <li><Link href="/blog">Blog</Link></li>
                <li aria-current="page" className={`${styles.currentPage} paragraphMd`}>
                <span className={styles.separator}> / </span>
                {title}
                </li>
            </ul>
        </nav>
    );
};

export default Breadcrumb;