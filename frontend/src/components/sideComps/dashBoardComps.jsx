import { Link, useLocation } from 'react-router-dom';
import Badge from '@mui/material/Badge';


// Side Bar component
export function SideNavigation(props) {

    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
    }

    const getLastPart = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    }


    return (
        <section id="sidebar">
            <Link to="/" className="brand">
                <i className='bx bxs-smile'></i>
                <span className="text">CompanyA</span>
            </Link>

            <ul className="side-menu top">
                {props.data && props.data.map((item, index) => {

                    return (
                        <li key={index} className={getLastPart(location.pathname) === item.to ? "active" : ""}>
                            <Link to={item.to}>
                                {item.icon}
                                <span className="text">{item.name}</span>
                                {
                                    item.notification && (
                                        <span className="sideBarLinkBadge"><Badge badgeContent={item.notification} color="primary"></Badge></span>
                                    )
                                }
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <ul className="side-menu">
                <li>
                    <Link
                        to="/"
                        onClick={handleLogout}
                        className="logout">
                        <i className='bx bxs-log-out-circle' ></i>
                        <span className="text">Logout</span>
                    </Link>
                </li>
            </ul>
        </section>
    )
}



// Top Bar component
export function TopBar(props) {
    return (
        <nav>
            <i className='bx bx-menu' ></i>
            <form action="#">
                {/* <div className="form-input">
                    <input type="search" placeholder="Search..." />
                    <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                </div> */}
            </form>
            
            <Link to="#" className="notification">
                <i className='bx bxs-bell' ></i>
                <span className="num">8</span>
            </Link>
            <Link to="#" className="profile">
                <img src={props.avatar} />
            </Link>
        </nav>
    )
}
