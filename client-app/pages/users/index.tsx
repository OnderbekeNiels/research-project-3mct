import React, { useEffect, useState } from "react";
import ContentBox from "../../components/contentBox";
import Container from "../../components/objects/container";
import { Head1 } from "../../components/objects/head";
import Row from "../../components/objects/row";
import User from "../../components/user";
import UserType from "../../models/user";
import { query } from "../../utils/fetch";

export default function Users() {
  const [users, setUsers] = useState<UserType[] | undefined | null>(undefined);

  const getUsers = async () => {
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
      setUsers(data);
    } catch (error) {
      setUsers(null);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Row>
        <Container>
          <Head1>Users ({users && users.length})</Head1>
          <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-6 mt-6">
            {users === null && <ContentBox>Something went wrong</ContentBox>}
            {users === undefined && <ContentBox>Loading users</ContentBox>}
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
