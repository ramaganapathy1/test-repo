import React from "react";
import { Button, Card, Header, Label, List, Modal } from "semantic-ui-react";
import { MdRememberMe } from "react-icons/md";
import {
  HiIdentification,
  HiHome,
  HiInformationCircle,
  HiUserAdd
} from "react-icons/hi";

export const UserDetails = (props) => (
  <Modal
    closeOnDimmerClick={false}
    size={"small"}
    open={true}
    onClose={() => props.goBack()}
  >
    <Modal.Header>
      <HiInformationCircle />
      Member Details
    </Modal.Header>

    <Modal.Content>
      <Card.Content>
        <Header>
          <MdRememberMe />
          {props.name}
        </Header>
        {props?.userDetails?.fatherName}
      </Card.Content>
      <List divided selection>
        <List.Item>
          <Label color="blue" horizontal>
            <HiIdentification /> Member Id
          </Label>
          {props.memberId}
        </List.Item>
        <List.Item>
          <Label color="blue" horizontal>
            Serial Number
          </Label>
          {props?.userDetails?.serialNumber}
        </List.Item>
        <List.Item>
          <Label color="blue" horizontal>
            <HiHome /> Address
          </Label>
          {props?.userDetails?.address}
        </List.Item>
      </List>
    </Modal.Content>
    <Modal.Actions>
      <Button
        disabled={props.loading}
        basic
        color="red"
        onClick={() => {
          props.goBack();
        }}
      >
        Cancel
      </Button>
      <Button
        basic
        color="green"
        onClick={() => props.verifyMember()}
        loading={props.loading}
        disabled={props.loading}
      >
        <HiUserAdd />
        Verify and Add
      </Button>
    </Modal.Actions>
  </Modal>
  // <Card.Group>
  //   <Card>
  //     <Card.Content>
  //       <Card.Header>{props.name}</Card.Header>
  //       <Card.Meta>{props.memberId}</Card.Meta>
  //       <Card.Description>
  //         <Header>{props?.userDetails?.fatherName}</Header>
  //         {props?.userDetails?.address}
  //       </Card.Description>
  //     </Card.Content>
  //     <Card.Content extra>
  //       {!props.voted && (
  //         <div className="ui two buttons">

  //         </div>
  //       )}
  //     </Card.Content>
  //   </Card>
  // </Card.Group>
);
