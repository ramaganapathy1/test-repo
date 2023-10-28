import { set } from "mongoose";
import React, { useState } from "react";
import { Header, Icon, Image, Segment, Step } from "semantic-ui-react";
import { AddVoter } from "./AddVoter";
import { AadharVerification } from "./AadharValidation";

const StepExampleAttached = ({ refreshData }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [aadharVerification, setAadharVerification] = useState();
  const [aadharNumber, setAadharNumber] = useState();
  const getTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <AadharVerification
            setAadharValidationCompleteStatus={setAadharVerification}
            setAadharNumber={setAadharNumber}
            aadharNumber={aadharNumber}
            moveTab={() => setSelectedTab(1)}
          />
        );
      case 1:
        return (
          <AddVoter
            aadharNumber={aadharNumber}
            clearStateValues={() => clearState()}
          />
        );
      default:
        return null;
    }
  };
  const clearState = () => {
    setAadharNumber();
    setAadharVerification();
    setSelectedTab(0);
    refreshData();
  };
  return (
    <div>
      <Header>Verify and Add Voter details</Header>
      <Step.Group attached="top" fluid>
        <Step
          onClick={() => setSelectedTab(0)}
          active={selectedTab === 0}
          disabled={aadharVerification}
        >
          {/* <Icon name="truck" /> */}
          <Step.Content>
            <Step.Title>Aadhar Verification</Step.Title>
            <Step.Description>
              Get voter aadhar number and verify
            </Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={selectedTab === 1}
          onClick={() => setSelectedTab(1)}
          disabled={!aadharVerification}
        >
          {/* <Icon name="payment" /> */}
          <Step.Content>
            <Step.Title>Add Voter Details</Step.Title>
            <Step.Description>Enter voter information</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>

      <Segment attached>{getTabContent()}</Segment>
    </div>
  );
};

export default StepExampleAttached;
