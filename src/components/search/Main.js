import "./search.css";
import LeftBar from "./Filter";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { styled } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Post from "./Post";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));
// const
function GridPost(props) {
  const row_number = 4;
  return (
    <Grid item xs={3}>
      {props.posts_prop.map((post, id) => {
        if (id % row_number == props.row__prop)
          return (
            <Item>
              {" "}
              <Post post={post} />
            </Item>
          );
      })}
    </Grid>
  );
}
export default function Search() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  }, []);
  // const [search, setSearch] = useState("");
  return (
    <div className="App">
      {/* <LeftBar /> */}
      <Grid style={{ width: "100%" }} container spacing={1}>
        <Grid item xs={2}>
          <Item style={{ position: "relative", height: "100vh" }}>
            <LeftBar />
          </Item>
        </Grid>
        {/* <Grid item xs={9}>
          <Item>
            <div className="post">
              <div className="post__header">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <h1>{search}</h1>
              </div>
            </div>
          </Item>
        </Grid> */}
        <Grid container item xs={10} spacing={2}>
          <GridPost row__prop={0} posts_prop={posts} />
          <GridPost row__prop={1} posts_prop={posts} />
          <GridPost row__prop={2} posts_prop={posts} />
          <GridPost row__prop={3} posts_prop={posts} />
        </Grid>
      </Grid>
    </div>
  );
}
