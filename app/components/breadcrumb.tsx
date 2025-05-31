import Link from 'next/link';
import styles from './breadcrumb.module.css';
import { TbArrowBackUp } from 'react-icons/tb';

interface BreadcrumbProps {
    title: string;
    href?: string;
    linkText?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
    title, 
    href = '/feed', 
    linkText = 'Return to feed' 
}) => {
    return (
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
            <TbArrowBackUp aria-hidden="true" />
            <Link className={styles.breadcrumbLink} href={href}>{linkText}</Link>
        </nav>
    );
};

export default Breadcrumb;