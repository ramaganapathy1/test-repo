import { Label } from "semantic-ui-react";

export const Stats = (props) => (
  <>
    <Label>Total Members: 2096</Label>
    <Label color="purple">Voted Members: {props.votedCount || "na"}</Label>
  </>
);
