import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff",
    color: "#000",
    borderTop: "5px solid black",
    borderBottom: "5px solid black",
  },
  blogTitle: {
    fontWeight: "bold",
  },
}));
const BlogCard = ({ blog }) => {
  const classes = useStyles();
  const [body, setBody] = useState("");

  useEffect(() => {
    const blogBody = blog.body;

    let modBody =
      blogBody.length > 150 ? blog.body.substr(0, 150).concat("...") : blogBody;

    setBody(modBody);
    // eslint-disable-next-line
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Link underline="none" component={RouterLink} to={`/blogs/${blog._id}`}>
          <Typography variant="h6" className={classes.blogTitle}>
            {blog.title}
          </Typography>
        </Link>
        <Typography variant="subtitle1">by: {blog.postedBy}</Typography>
        <Typography variant="subtitle2">
          Posted: {moment(blog.createdAt).fromNow()}
        </Typography>
        <Divider style={{ margin: "1rem auto" }} />
        <Typography variant="body1">{body}</Typography>
      </CardContent>
      <CardActions>
        <Button disabled onClick={() => console.log("am clicked")}>
          Like
        </Button>
        <Button disabled onClick={() => console.log("am clicked")}>
          Share
        </Button>
        <Button disabled onClick={() => console.log("am clicked")}>
          Report
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
