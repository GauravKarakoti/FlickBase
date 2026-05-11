import { useSelector } from "react-redux";
import Loader from "../../utils/loader";
import { Grid } from "@material-ui/core";
import ArticleCard from "../../utils/article_card";

const SearchResults = (props) => {
    const articles = useSelector(state => state.articles);
    const query = new URLSearchParams(props.location.search);
    const keywords = query.get('keywords');
    return (
        <>
            { articles.navsearch && articles.navsearch.docs ?
                <>
                    <p>Your search for <b>"{keywords}"</b> returned <b>{articles.navsearch.totalDocs}</b> results</p>
                    <Grid container spacing={2} className="article_card">
                        {articles.navsearch.docs.map((item) => (
                            <Grid key={item._id} item xs={12} sm={6} lg={3}>
                                <ArticleCard article={item}/>
                            </Grid>
                        ))}
                    </Grid>
                </> : <Loader/>
            }
        </>
    )
}
export default SearchResults;