import React, { useState } from "react";
import { Form, Loader, Dimmer, Dropdown } from "semantic-ui-react";
import Swal from "sweetalert2";

import { addVoter } from "../apis";
import { villages } from "./data";

const selcetNativeOptions = villages.map((village) => ({
  key: village,
  value: village,
  text: village
}));

export const AddVoter = ({ aadharNumber, clearStateValues }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disableAdd, setDisabledAdd] = useState(false);
  const [error, setError] = useState();
  const [roleNumber, setRoleNumber] = useState();
  const [name, setName] = useState();
  const [native, setNative] = useState();
  const [boothNumber, setBoothNumber] = useState();
  const [memberId, setMemberId] = useState();
  const [nameError, setNameError] = useState();
  const [roleNumberError, setroleNumberError] = useState();
  const [nativeError, setnativeError] = useState();
  const [boothNumberError, setboothNumberError] = useState();
  const [memberIdError, setmemberIdError] = useState();

  const callAddVoter = async () => {
    setIsLoading(!isLoading);
    setDisabledAdd(true);
    const dataToUpdate = {
      _id: aadharNumber,
      aadharNumber,
      name,
      native,
      boothNumber,
      roleNumber,
      memberId,
      time: new Date().toISOString()
    };
    await addVoter(dataToUpdate)
      .then((res) =>
        Swal.fire({
          icon: "success",
          title: "Voter details added.",
          allowOutsideClick: false
        }).then(() => {
          clearStateData();
        })
      )
      .catch((e) => setError(true));
  };

  const clearStateData = () => {
    setBoothNumber();
    setMemberId();
    setRoleNumber();
    setName();
    setDisabledAdd(false);
    clearStateValues();
  };

  const enableAdd = () =>
    !(
      name &&
      memberId &&
      aadharNumber &&
      roleNumber &&
      native &&
      boothNumber
    ) || disableAdd;

  if (error) {
    return "Error Call +919444370166";
  }

  const inputValidation = (value, inputName) => {
    switch (inputName) {
      case "name":
        const str = "hello world!";
        const result = /^hello/.test(str);
        console.log(result);
        if (result) {
          setNameError(false);
          setName(value);
        } else {
          setNameError({
            content: "Please enter a valid Aadhar Number",
            pointing: "below"
          });
        }
        break;

      default:
        break;
    }
  };

  return (
    <Form>
      <Form.Input
        fluid
        label="Aadhar Number"
        placeholder="Aadhar Number"
        value={aadharNumber}
        onChange={(e) => verifyAadhar(e.target.value)}
        loading={isLoading}
        disabled={true}
      />
      <Form.Input
        fluid
        label="Member Name"
        placeholder="Name"
        error={nameError}
        onChange={(e) => inputValidation(e.target.value, "name")}
        disabled={isLoading}
        loading={isLoading}
      />
      <Form.Dropdown
        fluid
        label="Native Place"
        placeholder="Native Place"
        search
        selection
        options={selcetNativeOptions}
        onChange={(e, { value }) => setNative(value)}
        disabled={isLoading}
        loading={isLoading}
      />
      <Form.Input
        fluid
        label="Member Id"
        placeholder="Member Id"
        onChange={(e) => setMemberId(e.target.value)}
        disabled={isLoading}
        loading={isLoading}
      />
      <Form.Input
        fluid
        label="Role Number"
        placeholder="Role Number"
        onChange={(e) => setRoleNumber(e.target.value)}
        disabled={isLoading}
        loading={isLoading}
      />
      <Form.Input
        fluid
        label="Booth Number"
        placeholder="Booth Number"
        onChange={(e) => setBoothNumber(e.target.value)}
        disabled={isLoading}
        loading={isLoading}
      />
      <Form.Button
        size="big"
        disabled={enableAdd()}
        onClick={() => callAddVoter()}
      >
        Add
      </Form.Button>
      <Form.Button size="big" floated="right" onClick={() => clearStateData()}>
        Cancel
      </Form.Button>
    </Form>
  );
};
