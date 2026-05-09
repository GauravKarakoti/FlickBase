import { Avatar, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core"
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person';
import MovieIcon from '@material-ui/icons/Movie';

const ScoreCard = ({ current }) => {
    return (
        <List className="scorecard">
            {/* score */}
            <ListItem>
                <ListItemAvatar>
                    <Avatar><StarIcon/></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Our Score" secondary={current.score} className="rating"/>
            </ListItem>
            <Divider variant="inset" component="li"/>
            {/* actor */}
            <ListItem>
                <ListItemAvatar>
                    <Avatar><PersonIcon/></Avatar>
                </ListItemAvatar>
                <div>
                    {current.actor.map((item, index) => {
                        <Chip
                            key={`${index+item}`}
                            item={item}
                            label={item}
                            clickable
                            color="primary"
                            className="chip"
                        />
                    })}
                </div>
            </ListItem>
            <Divider variant="inset" component="li"/>
            {/* director */}
            <ListItem>
                <ListItemAvatar>
                    <Avatar><MovieIcon/></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Director" secondary={current.director}/>
            </ListItem>
        </List>
    )
}
export default ScoreCard;