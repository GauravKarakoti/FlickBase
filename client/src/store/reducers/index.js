import articles from "./articles_reducer";
import notifications from "./notification_reducer";
import site from "./site_reducer";
import users from "./users_reducer";

const { combineReducers } = require("redux");

const appReducers = combineReducers({
    notifications,
    articles,
    users,
    site
});
export default appReducers;