import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ContentBox from "../../components/contentBox";
import ErrorMessageBox from "../../components/errorMessageBox";
import LoadingMessageBox from "../../components/loadingMessageBox";
import Container from "../../components/objects/container";
import { Head1 } from "../../components/objects/head";
import Row from "../../components/objects/row";
import User from "../../components/user";
import UserType from "../../models/user";
import { requestState } from "../../utils/store";

export default function Users() {
  const [request, setRequest] = useRecoilState(requestState);
  const [start, setStart] = useState(new Date().getTime());

  
  const GETALLPOSTS = gql`
  query UsersAll {
    UsersAll {
      id
      displayName
      upVotes
      downVotes
      reputation
    }
  }
  `;
  const { loading, error, data } = useQuery(GETALLPOSTS, {fetchPolicy:"no-cache"});
  
  useEffect(() => {
    if (data) {
      setRequest((d) => {return {
        ...d,
        requestName: "UsersAll",
        requestNestingLevel: 1,
        responseSize:
          new TextEncoder().encode(JSON.stringify(data)).length / 1024,
        responseTime: new Date().getTime() - start,
      };})
    }
  }, [data]);
  
  
  return (
    <>
      <Row>
        <Container>
          <Head1>Users ({data ? data.UsersAll.length : 0})</Head1>
          {error && <ErrorMessageBox />}
          {loading && <LoadingMessageBox />}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
            {data && data.UsersAll.length < 0 && (
              <ContentBox>No users found to display</ContentBox>
            )}
            {data &&
              data.UsersAll.length > 0 &&
              data.UsersAll.map((u: UserType) => (
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