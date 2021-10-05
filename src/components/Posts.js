import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import Post from "./Post";
import Filters from "./Filters/Filters";
import { styled } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../assets/css/filters.css";
import Filter from "@material-ui/icons/Filter";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [postsFilter, setPostsFilter] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setPostsFilter(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  }, []);
  const Filtering = (filters, label, value) => {
    if(value === "") setPostsFilter(posts)
    
    Object.keys(filters).map((filter,id) =>{
      let Nfilters=[]
      postsFilter.map((post,idP)=>{
        console.log(post.hashtags[filter])
        // console.log(filters[filter].toLowerCase())
        if(post.hashtags[filter].indexOf(filters[filter].toLowerCase()))
          Nfilters.push(post);
      })
      // Nfilters.filter((post,id) => post.hashtags[filter].includes(filters[filter]))
      setPostsFilter(Nfilters)
      console.log(Nfilters)
    });
  };
  return (
    <div className="App">
      <Grid style={{ width: "100%" }} container spacing={0}>
        <Grid item xs={2}>
          <Item style={{ position: "relative", height: "100vh" }}>
            <Filters prop__filtering={Filtering} />
          </Item>
        </Grid>
        <Grid item xs={10}>
          <div className="masonry">
            {postsFilter.length > 0 ? (
              postsFilter.map((post) => <Post post={post} key={post.id} />)
            ) : (
              <div className="no__postError">No posts</div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
