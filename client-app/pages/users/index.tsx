import React, { Profiler, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ContentBox from "../../components/contentBox";
import ErrorMessageBox from "../../components/errorMessageBox";
import LoadingMessageBox from "../../components/loadingMessageBox";
import Container from "../../components/objects/container";
import { Head1 } from "../../components/objects/head";
import Row from "../../components/objects/row";
import User from "../../components/user";
import UserType from "../../models/user";
import { query } from "../../utils/fetch";
import { requestState } from "../../utils/store";

export default function Users() {
  const [users, setUsers] = useState<UserType[] | undefined | null>(undefined);

  const [request, setRequest] = useRecoilState(requestState);

  const [start, setStart] = useState(new Date().getTime());

  useEffect(() => {
    if (users) {
      console.log(
        `Start: ${start} - Now: ${new Date().getTime()} = ${
          new Date().getTime() - start
        } ms`
      );
    }
  }, [users]);

  const getUsers = async () => {
    const start = new Date().getTime();
    let dataSize: number = 0;
    try {
      const data: UserType[] = await query(
        `UsersAll`,
        `query UsersAll {
                UsersAll {
                    id
                    displayName
                    upVotes
                    downVotes
                    reputation
                }}`
      );
      dataSize = new TextEncoder().encode(JSON.stringify(data)).length / 1024;
      setUsers(data);
    } catch (error) {
      setUsers(null);
    }

    setRequest(() => {
      return {
        responseTime: new Date().getTime() - start,
        requestNestingLevel: 1,
        requestName: "UsersAll",
        responseSize: dataSize,
        description: "Using normal fetch api",
      };
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Row>
        <Container>
          <Head1>Users ({users ? users.length : 0})</Head1>
          {users === null && <ErrorMessageBox />}
          {users === undefined && <LoadingMessageBox />}
          <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-6 mt-6">
            {users && users.length < 0 && (
              <ContentBox>No users found to display</ContentBox>
            )}
            {users &&
              users.length > 0 &&
              users.map((u: UserType) => (
                <User
                  key={u.id.toString()}
                  id={u.id}
                  displayName={u.displayName}
                  upVotes={u.upVotes}
                  downVotes={u.downVotes}
                  reputation={u.reputation}
                ></User>
              ))}
          </div>
        </Container>
      </Row>
    </>
  );
}
