import './CustomStyle.css';

const DashboardContent = () => {
    return(
        <div className="UP">
            <div className="gradient"></div>
            <div className="profile-down">
                <img src={avatar} alt="" />
                <div className="profile-title">Michael Brown</div>
                <div className="description">Financial Manager</div>
            </div>
            <div className="profile-button"><a href="mailto: michael.brown@example.com" className="mail">Contact Me</a></div>
        </div>    
    )
};

export default DashboardContent;