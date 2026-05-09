import articles from "./articles_reducer";
import notification from "./notification_reducer";
import site from "./site_reducer";
import users from "./users_reducer";

const { combineReducers } = require("redux");

const appReducers = combineReducers({
    notification,
    articles,
    users,
    site
});
export default appReducers;