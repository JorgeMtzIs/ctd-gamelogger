import { NavLink } from 'react-router';
import styles from './Header.module.css';

function Header({ title }) {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <nav className={styles.navLinks}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          to={'/'}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          to={'/about'}
        >
          About
        </NavLink>
      </nav>
    </>
  );
}

export default Header;
