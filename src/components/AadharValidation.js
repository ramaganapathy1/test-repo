import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { validateAadharNumber } from "../apis";

const errorObj = {
  flag: true
};

export const AadharVerification = ({
  setAadharValidationCompleteStatus,
  setAadharNumber,
  aadharNumber,
  moveTab
}) => {
  const [aadharValidation, setAadharValidation] = useState({ flag: false });
  var aadharExp = /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
  const verifyAadhar = async (value) => {
    if (value.length > 11) {
      if (!aadharExp.test(value)) {
        setAadharValidation({
          ...errorObj,
          content: "Please enter a valid Aadhar Number",
          pointing: "below"
        });
      } else {
        const verification = await validateAadharNumber(value);
        if (verification.voter) {
          setAadharValidation({
            ...errorObj,
            content1: `${verification.voter.name} has already voted.`
          });
          setAadharValidationCompleteStatus(false);
        } else {
          setAadharValidation({ flag: false });
          setAadharValidationCompleteStatus(true);
          moveTab();
        }
      }
    } else {
      setAadharValidation({
        ...errorObj,
        content: "Please enter a valid Aadhar Number",
        pointing: "below"
      });
    }
  };
  return (
    <Form>
      <Form.Field>
        <label>Enter Aadhar Number to verify voter</label>
        <Form.Input
          error={aadharValidation.content}
          onChange={(e) => {
            setAadharValidation({ flag: false });
            setAadharNumber(e.target.value);
          }}
        />
        <Button
          onClick={() => verifyAadhar(aadharNumber)}
          disabled={!aadharNumber}
        >
          Verify and Proceed
        </Button>
      </Form.Field>
      {aadharValidation.content1 && (
        <Message negative>
          <Message.Header>{aadharValidation.content1}</Message.Header>
          <p>Kindly contact the polling committee.</p>
        </Message>
      )}
    </Form>
  );
};
