import React from "react";
import { Menu, Segment } from "semantic-ui-react";

export const MenuBar = () => {
  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item>Voting Portal - Madurai Nagarathar Sangam</Menu.Item>
        <Menu.Item name="home" active>
          Verify Voter
        </Menu.Item>
      </Menu>
    </Segment>
  );
};
