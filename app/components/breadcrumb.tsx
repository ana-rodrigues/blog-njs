import Link from 'next/link';
import styles from './breadcrumb.module.css';
import { TbArrowBackUp } from 'react-icons/tb';

interface BreadcrumbProps {
    title: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
    return (
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
            <TbArrowBackUp aria-hidden="true" />
            <Link className={styles.breadcrumbLink} href="/feed">Return to feed</Link>
        </nav>
    );
};

export default Breadcrumb;