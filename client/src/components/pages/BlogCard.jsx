import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ddd",
    color: "#000",
    borderTop: "3px solid black",
  },
  blogTitle: {
    fontWeight: "bold",
  },
}));
const BlogCard = ({ blog }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" className={classes.blogTitle}>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1">By: {blog.postedBy}</Typography>
        <Typography variant="subtitle2">
          Posted: {moment(blog.date).fromNow()}
        </Typography>
        <Divider style={{ margin: "1rem auto" }} />
        <Typography variant="body1">{blog.body}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => console.log("am clicked")}>Like</Button>
        <Button onClick={() => console.log("am clicked")}>Share</Button>
        <Button onClick={() => console.log("am clicked")}>Report</Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
