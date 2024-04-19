import { Link, useLocation } from 'react-router-dom';


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
                    console.log(location.pathname);

                    return (
                        <li key={index} className={getLastPart(location.pathname) === item.to ? "active" : ""}>
                            <Link to={item.to}>
                                {item.icon}
                                <span className="text">{item.name}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <ul className="side-menu">
                <li>
                    <Link to="#">
                        <i className='bx bxs-cog' ></i>
                        <span className="text">Settings</span>
                    </Link>
                </li>
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
            <input type="checkbox" id="switch-mode" hidden />
            <label htmlFor="switch-mode" className="switch-mode"></label>
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
