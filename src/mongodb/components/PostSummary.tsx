import { Fragment } from "react";
import Card from "@leafygreen-ui/card";
import { css } from "@leafygreen-ui/emotion";
import { H3 } from "@leafygreen-ui/typography";
import Badge, { Variant } from "@leafygreen-ui/badge";
import { Link } from "react-router-dom";
import { Post } from "../models";

const cardStyle = css`
  margin: 1em;
`
const badgeColors = ["lightgray", "darkgray", "red", "blue", "green", "yellow"];
const getBadgeColor = (tag: string) => {
  const tagId = tag.split("").map(char => char.charCodeAt(0)).reduce((s, a) => s + a, 0) % 6;
  return badgeColors[tagId] as Variant;
}

export default function PostSummary(props: Post) {
  return (
    <Card className={cardStyle}>
      <H3>{props.title}</H3>
      by {props.author} on {(new Date(props.date)).toLocaleDateString()}<br />
      <Link to={`/post/${props._id}`}>Read More...</Link><br />
      {props && props.tags && props.tags.map((tag: string) => (<Fragment>
        <Badge variant={getBadgeColor(tag)}>{tag}</Badge>
      </Fragment>))}
    </Card>
  )
}