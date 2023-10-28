import {
  Button,
  Divider,
  Grid,
  Header,
  Form,
  Segment,
  Label,
  Message
} from "semantic-ui-react";
import "./styles.css";
import { MenuBar } from "./components/MenuBar";
import { VoterList } from "./components/VoterList";
import { useEffect, useState } from "react";

import { getVoters, getVotersByVillage, validateMember } from "./apis";
import { MemberIdVerification } from "./components/MemberValidation";
import { villages } from "./data/villages";
import { ImStatsDots } from "react-icons/im";
import { Stats } from "./components/Stats";
import { HiRefresh, HiSearch, HiOutlineFingerPrint } from "react-icons/hi";
import { BiSolidShow } from "react-icons/bi";
import { GiVote } from "react-icons/gi";
import { IoFingerPrintSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";

let selcetNativeOptions = (villages || []).map((village) => ({
  key: village,
  value: village,
  text: village
}));

selcetNativeOptions = [
  { key: "All", value: "All", text: "All" },
  ...selcetNativeOptions
];

export default function App() {
  const [votedList, setVotedList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [native, setNative] = useState();
  const [memberId, setMemberId] = useState();
  const [showList, setShowList] = useState();
  const getVotedList = async () => {
    setMemberId("");
    setNative("");
    setFilteredList([]);
    const response = await getVoters();
    setVotedList(response?.voters || []);
  };
  const getVotedListByVillage = async () => {
    if (native.length) {
      const response = await getVotersByVillage(native);
      setFilteredList(response?.voters || []);
    } else if (memberId.length) {
      const response = await validateMember(memberId);
      setFilteredList(response?.voter ? [response?.voter] : []);
    }
  };

  useEffect(() => {
    if (native) {
      if (!native.length) {
        setFilteredList([]);
        getVotedList();
      } else {
        getVotedListByVillage();
      }
    } else {
      setFilteredList([]);
    }
  }, [native]);

  useEffect(() => {
    if (memberId) {
      if (!memberId.length) {
        setFilteredList([]);
        getVotedList();
      } else {
        getVotedListByVillage();
      }
    } else {
      setFilteredList([]);
      getVotedList();
    }
  }, [memberId]);

  useEffect(() => {
    getVotedList();
  }, []);
  return (
    <div>
      {/* <MenuBar /> */}
      <Message color="blue" icon={<GiVote />}>
        <Message.Header>
          Welcome to Madurai Nagarathar Sangam Voting Portal 2023
        </Message.Header>
        <p>
          Held at Madurai Nagarathar Sangam
          <br />
          <strong>
            {" "}
            <FaCalendarAlt /> Dated 29/October/2023 - Sunday
          </strong>
        </p>
      </Message>
      <Grid columns="equal">
        <Grid.Column width={16}>
          <Segment>
            <Header>
              <IoFingerPrintSharp />
              Member Verification
            </Header>
            <MemberIdVerification
              setShowList={setShowList}
              refreshTable={() => getVotedList()}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
      <Divider />

      <Grid columns="equal">
        <Grid.Column width={16}>
          <Segment>
            {showList ? (
              <>
                <Header>
                  Member List
                  <Stats votedCount={votedList.length} />
                  <Button
                    size="small"
                    floated="right"
                    color="yellow"
                    onClick={() => {
                      setVotedList([]);
                      getVotedList();
                    }}
                  >
                    <HiRefresh /> &nbsp; Refresh
                  </Button>
                  <Button
                    floated="right"
                    size={"small"}
                    onClick={() => {
                      setShowList(false);
                      getVotedList();
                    }}
                  >
                    Close list
                  </Button>
                </Header>
                <Form.Input
                  floating="right"
                  placeholder="Member Name"
                  label={
                    <Label>
                      <HiSearch /> &nbsp; Search by Name{" "}
                    </Label>
                  }
                  search
                  selection
                  value={native}
                  onChange={(e, { value }) => {
                    setMemberId("");
                    setNative(value);
                  }}
                />
                <Form.Input
                  floating="right"
                  label={
                    <Label>
                      <HiSearch /> &nbsp; Search id{" "}
                    </Label>
                  }
                  placeholder="Member by id"
                  search
                  type="number"
                  selection
                  value={memberId}
                  onChange={(e, { value }) => {
                    setNative("");
                    setMemberId(value);
                  }}
                />
                <VoterList
                  votedList={
                    memberId.length || native.length ? filteredList : votedList
                  }
                />
              </>
            ) : (
              <>
                <Header>
                  <ImStatsDots /> &nbsp; Statistics
                  <Button
                    floated="right"
                    color="linkedin"
                    onClick={() => setShowList(true)}
                  >
                    <BiSolidShow /> &nbsp; Show Voted list
                  </Button>
                </Header>
                <Stats votedCount={votedList.length} />
              </>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </div>
  );
}
