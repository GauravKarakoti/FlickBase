import { Link, withRouter } from "react-router-dom";
import SideDrawer from "./sideNavigation";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { showToast } from "../../utils/tools";
import { appLayout, clearNotifications } from "../../store/actions";
import { signOut } from "../../store/actions/users_actions";

const Header = (props) => {
    const [layout, setLayout] = useState('');
    const notifications = useSelector(state => state.notifications);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const signOutUser = () => {
        dispatch(signOut());
        props.history.push('/');
        alert('Sign Out');
    }
    useEffect(() => {
        let pathArray = props.location.pathname.split('/');
        if(pathArray[1] === 'dashboard') {
            setLayout('dash_layout');
            dispatch(appLayout('dash_layout'));
        } else {
            setLayout('');
            dispatch(appLayout(''));
        }
    },[props.location.pathname, dispatch]);
    useEffect(() => {
        if(notifications && notifications.error) {
            const msg = notifications.msg ? notifications.msg : 'Error';
            showToast('ERROR', msg);
            dispatch(clearNotifications());
        }
        if(notifications && notifications.success) {
            const msg = notifications.msg ? notifications.msg : 'Good Job!!';
            showToast('SUCCESS', msg);
            dispatch(clearNotifications());
        }
    },[notifications, dispatch]);
    return (
        <>
            <nav className={`navbar fixed-top ${layout}`}>
                <Link 
                    style={{fontFamily: "Fredoka One"}}
                    to="/"
                    className="navbar-brand d-flex align-items-center"
                >
                    FlickBase
                </Link>
                <SideDrawer users={users} signOutUser={signOutUser}/>
            </nav>
        </>
    )
}
export default withRouter(Header);