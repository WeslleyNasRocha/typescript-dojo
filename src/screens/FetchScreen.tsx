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
  Typography,
} from "@material-ui/core";
import { bindActionCreators } from "@reduxjs/toolkit";
import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../store/reducers";
import { PostActions } from "../store/reducers/post";
import { AppDispatch } from "../store/store";

interface Props
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

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

const FetchScreen: FunctionComponent<Props> = ({
  post,
  fetchAllPosts,
  fetchPostsForUser,
}) => {
  const classes = useStyles();
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);
  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader title="Fetch example"></CardHeader>
        <CardContent>
          <TextField
            disabled={post.loading === "pending"}
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            type="number"
            className={classes.input}
            placeholder="Search by user id"
            error={post.loading === "error"}
            helperText={post.error}
          />
          <Button
            disabled={post.loading === "pending"}
            onClick={() => {
              fetchPostsForUser(Number(userId));
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
  post: state.Post,
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(PostActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FetchScreen);
