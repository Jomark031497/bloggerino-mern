import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const Blogs = ({ blog }) => {
  return (
    <>
      <Card>
        <CardContent>
          <Typography>{blog.postedBy}</Typography>
          <Typography>{blog.title}</Typography>
          <Typography>{blog.body}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Blogs;
