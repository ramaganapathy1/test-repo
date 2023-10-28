import React, { useState } from "react";
import { Header, Button, Divider, Input, Label } from "semantic-ui-react";
import { validateMember, markMember } from "../apis";
import { UserDetails } from "./UserDetails";
import Swal from "sweetalert2";
import { HiIdentification } from "react-icons/hi";
import { ImListNumbered } from "react-icons/im";
import { MdPersonSearch } from "react-icons/md";
import { GiBackwardTime } from "react-icons/gi";

export const MemberIdVerification = (props) => {
  const [memberId, setMemberId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [loading, setLoading] = useState("");
  const [userData, setUserData] = useState();
  const [error, setError] = useState(false);

  const enableRegister = () =>
    loading || memberId.length || serialNumber.length;

  const verifyMember = async () => {
    setLoading(true);
    props.setShowList(false);
    const isSerialNumber = serialNumber.length !== 0;
    const id = isSerialNumber ? serialNumber : memberId;
    await validateMember(id, isSerialNumber)
      .then((res) => {
        if (!res.voter) {
          setError(true);
        }
        setUserData(res.voter);
      })
      .catch((err) => {
        console.log("Something Went Wrong");
        setError(true);
      })
      .finally(() => setLoading(false));
  };
  const resetState = () => {
    setError(false);
    setMemberId("");
    setSerialNumber("");
    setUserData();
    props.setShowList(false);
  };

  const markMemberVerified = async () => {
    setLoading(true);
    await markMember(userData)
      .then((res) => {
        if (res.voter.modifiedCount === 1) {
          Swal.fire({
            title: "Voter verified and added to voted list",
            confirmButtonText: "OK",
            icon: "success"
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              // throw new Error("error 123");
              props.refreshTable();
              resetState();
            }
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title:
            "Something went wrong: \n" +
            err +
            "\n kinldy contact Rama Ganapathy (+919444370166)",
          confirmButtonText: "OK"
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // throw new Error("error 123");
            resetState();
          }
        });
        // setError(true);
        // resetState();
      })
      .finally(() => setLoading(false));
  };
  if (error) {
    return (
      <>
        <Header>
          Member Not Found, kinldy re check and enter the memberid/serial number
        </Header>
        <Button negative fluid onClick={() => resetState()}>
          <GiBackwardTime /> &nbsp; Rety
        </Button>
      </>
    );
  }

  if (userData?.voted) {
    Swal.fire({
      title: `Voter ${userData.name} already voted, at time ${userData.votedAt}, kindly check with election incharge.`,
      confirmButtonText: "OK",
      allowOutsideClick: false,
      icon: "warning"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // throw new Error("error 123");
        props.refreshTable();
        resetState();
      }
    });
  }

  if (userData && !userData?.voted) {
    return (
      <UserDetails
        name={userData.name}
        memberId={userData.memberId}
        voted={userData.voted}
        goBack={() => resetState()}
        loading={loading}
        userDetails={userData || {}}
        verifyMember={() => markMemberVerified()}
      />
    );
  }

  return (
    <>
      <Header size="small">Enter member id to verify</Header>

      <Input
        focus
        type="number"
        fluid
        placeholder="Enter Member Id"
        label={
          <Label>
            <HiIdentification />
          </Label>
        }
        loading={loading}
        value={memberId}
        onChange={(e) => {
          setSerialNumber("");
          setMemberId(e.target.value);
        }}
      />
      <Divider horizontal>
        <Header as="h4">OR</Header>
      </Divider>
      <Header size="small">Enter serial number to verify</Header>
      <Input
        focus
        type="number"
        placeholder="Enter Serial Number"
        fluid
        label={
          <Label>
            <ImListNumbered />
          </Label>
        }
        loading={loading}
        value={serialNumber}
        onChange={(e) => {
          setMemberId("");
          setSerialNumber(e.target.value);
        }}
      />
      <br />
      <Button
        disabled={!enableRegister()}
        onClick={() => verifyMember()}
        loading={loading}
        color="blue"
      >
        <MdPersonSearch /> &nbsp; Verify and Add Voter
      </Button>
    </>
  );
};
