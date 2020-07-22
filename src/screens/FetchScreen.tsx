import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import { bindActionCreators } from "@reduxjs/toolkit";
import React, { FunctionComponent, useState, useEffect } from "react";
import { connect } from "react-redux";
import { AppDispatch } from "../store";
import { RootState } from "../store/reducers";
import { PostActions } from "../store/reducers/posts";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(0, 2, 2, 0),
  },
  postListContainer: {
    margin: theme.spacing(2, 2),
  },
  postContainer: {
    backgroundColor: "#fdfdfd",
    borderWidth: 1,
    borderColor: "#4c4c4c",
  },
}));

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {};

const FetchScreen: FunctionComponent<Props> = ({ post, fetchAllPosts, fetchPostsByUser }) => {
  const classes = useStyles();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    fetchAllPosts()
  }, []);

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader title="Fetch example"></CardHeader>
        <CardContent>
          <TextField
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            type="number"
            className={classes.input}
            placeholder="Search by user id"
            error={!!post.error}
            helperText={post.error}
          />
          <Button
            onClick={() => {
              fetchPostsByUser(Number(userId));
              setUserId("");
            }}
            variant="outlined"
            color="primary"
          >
            Search
          </Button>

          <Divider />
          <List className={classes.postListContainer}>
            {post.data.map((post) => (
              <React.Fragment>
                <ListItem key={post.id}>
                  <Grid className={classes.postContainer} container spacing={2}>
                    <Grid item>
                      <Typography variant="h6">Title:</Typography>
                      <Typography>{post.title}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Body:</Typography>
                      <Typography>{post.body}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">UserID:</Typography>
                      <Typography>{post.userId}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  post: state.post,
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(PostActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FetchScreen);
