import React from "react";
import { Header, Label, Table } from "semantic-ui-react";
import { HiUser, HiIdentification } from "react-icons/hi";
import { BiSolidTimeFive } from "react-icons/bi";
import { AiFillCloseSquare, AiOutlineCheckSquare } from "react-icons/ai";

export const VoterList = ({ votedList = [] }) =>
  !votedList.length ? (
    <Header>No Data For the filter, change the filter to see </Header>
  ) : (
    <>
      <Label>Filtered Members : {votedList.length}</Label>
      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            {[
              "Vote Status",
              "Name",
              "Father Name",
              "Member Id",
              "Serial Number",
              "Voted Time"
            ].map((item) => {
              return <Table.HeaderCell>{item}</Table.HeaderCell>;
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {votedList.map((item) => (
            <Table.Row key={item?.memberId} negative={!item?.votedAt}>
              <Table.Cell>
                <Header color={item?.votedAt ? "green" : "red"}>
                  {item?.votedAt ? (
                    <>
                      <AiOutlineCheckSquare /> Voted{" "}
                    </>
                  ) : (
                    <>
                      <AiFillCloseSquare />
                      Not Voted{" "}
                    </>
                  )}
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Header>
                  <HiUser /> {item?.name}
                </Header>
              </Table.Cell>
              <Table.Cell>{item.fatherName}</Table.Cell>
              <Table.Cell>
                <Label color="green">
                  <HiIdentification />
                  Member Id: {item?.memberId}
                </Label>
              </Table.Cell>
              <Table.Cell>Serial Number: {item?.serialNumber}</Table.Cell>
              <Table.Cell>
                <BiSolidTimeFive />{" "}
                {item?.votedAt ? (
                  <>&nbsp; Voted Date and Time: {item?.votedAt}</>
                ) : (
                  "Not Voted"
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
