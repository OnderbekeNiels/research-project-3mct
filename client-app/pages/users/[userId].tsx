import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Badge from "../../components/badge";
import ContentBox from "../../components/contentBox";
import ErrorMessageBox from "../../components/errorMessageBox";
import LoadingMessageBox from "../../components/loadingMessageBox";
import NumberBox from "../../components/numberBox";
import Container from "../../components/objects/container";
import { Head2 } from "../../components/objects/head";
import Row from "../../components/objects/row";
import PostRow from "../../components/postRow";
import BadgeType from "../../models/badge";
import PostType from "../../models/post";
import { Anonymous } from "../../models/user";
import createMarkup from "../../utils/core";
import { formateDateToLongNotation, formatToDate } from "../../utils/date";
import { requestState } from "../../utils/store";

export default function UserDetail() {
  const router = useRouter();
  const { userId } = router.query;
  const [isOpenAboutMe, setIsOpenAboutMe] = useState<boolean>(false);
  const [request, setRequest] = useRecoilState(requestState);
  const [start, setStart] = useState(new Date().getTime());

  const GETUSERBYID = gql`
    query UserById($userId: Float!) {
      UserById(userId: $userId) {
        id
        aboutMe
        age
        creationDate
        displayName
        downVotes
        location
        reputation
        upVotes
        badges {
          id
          name
        }
        views
        posts {
          id
          answerCount
          title
          acceptedAnswerId
          lastEditDate
          comments {
            id
            text
            creationDate
            user {
              id
              displayName
            }
          }
        }
      }
    }
  `;
  const [getUserById, { loading, error, data }] = useLazyQuery(GETUSERBYID, {fetchPolicy: "no-cache"});

  useEffect(() => {
    console.log({data})
    if (data != undefined) {
      setRequest((d) => {
        return {
          ...d,
          requestName: "UserById",
          requestNestingLevel: 4,
          responseSize:
            new TextEncoder().encode(JSON.stringify(data)).length / 1024,
          responseTime: new Date().getTime() - start,
        };
      });
    }
  }, [data]);

  useEffect(() => {
    if (userId)
      getUserById({
        variables: { userId: userId ? +userId : undefined },
      });
  }, [userId]);

  return (
    <>
      <Row>
        <Container>
          {error && <ErrorMessageBox />}
          {loading && <LoadingMessageBox />}
          <div className="grid grid-cols-3 gap-6 pt-10">
            {data && (
              <>
                <ContentBox className="col-span-2 relative">
                  <div className="aspect-square w-28 rounded-full grid place-items-center bg-orange-50 border-4 border-orange-500 absolute -top-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-1/2 text-orange-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-[calc(7rem-2.5rem)]">
                    <Head2>
                      {data.UserById.displayName
                        ? data.UserById.displayName
                        : Anonymous.name}
                    </Head2>
                    {data.UserById.aboutMe && (
                      <div
                        className={`bg-gray-700 text-white p-2 pr-8 rounded-md w-full max-w-[24rem] overflow-y-hidden relative ${
                          !isOpenAboutMe && "max-h-20"
                        }`}
                      >
                        <button
                          className="absolute right-2 group opacity-25 hover:opacity-100"
                          onClick={() => {
                            setIsOpenAboutMe(!isOpenAboutMe);
                          }}
                        >
                          {!isOpenAboutMe ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 group-hover:text-orange-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 group-hover:text-orange-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            data.UserById.aboutMe
                          )}
                        ></div>
                      </div>
                    )}
                    <ul className="flex space-x-4 flex-wrap text-sm mt-4 max-w-[24rem]">
                      <li className="flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-orange-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p>
                          {formateDateToLongNotation(
                            formatToDate(data.UserById.creationDate)
                          )}
                        </p>
                      </li>
                      {data.UserById.age && (
                        <li className="flex items-center space-x-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-orange-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p>{data.UserById.age} years old</p>
                        </li>
                      )}
                      {data.UserById.location && (
                        <li className="flex items-center space-x-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-orange-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p>{data.UserById.location}</p>
                        </li>
                      )}
                      {data.UserById.websiteUrl && (
                        <li className="flex items-center space-x-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-orange-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p>{data.UserById.websiteUrl}</p>
                        </li>
                      )}
                    </ul>
                  </div>
                </ContentBox>
                <ContentBox className="self-start">
                  <Head2>Stats</Head2>
                  <div className="">
                    <div className="grid grid-cols-2 gap-2">
                      <NumberBox
                        value={data.UserById.upVotes}
                        description="Up votes"
                        bgColor="bg-sky-500"
                        textColor="text-white"
                        size="md"
                        fullSquare
                      ></NumberBox>
                      <NumberBox
                        value={data.UserById.downVotes}
                        description="Down votes"
                        bgColor="bg-rose-500"
                        textColor="text-white"
                        size="md"
                        fullSquare
                      ></NumberBox>
                      <NumberBox
                        value={data.UserById.views}
                        description="Views"
                        bgColor="bg-purple-700"
                        textColor="text-white"
                        size="md"
                        fullSquare
                      ></NumberBox>
                      <NumberBox
                        value={data.UserById.reputation}
                        description="Reputation"
                        bgColor="bg-orange-600"
                        textColor="text-white"
                        size="md"
                        fullSquare
                      ></NumberBox>
                    </div>
                  </div>
                </ContentBox>
                <ContentBox className="self-start">
                  <Head2>Badges</Head2>
                  <div className="w-full flex flex-wrap gap-2 content-start">
                    {data.UserById.badges &&
                      data.UserById.badges.map((b: BadgeType) => {
                        return <Badge name={b.name} key={b.id}></Badge>;
                      })}
                  </div>
                </ContentBox>
                <ContentBox className="col-span-2">
                  <Head2>Latest Posts</Head2>
                  <div className="grid gap-2">
                    {data.UserById.posts &&
                      data.UserById.posts?.map((p: PostType) => {
                        return (
                          <PostRow
                            key={p.id}
                            id={p.id}
                            title={p.title}
                            acceptedAnswerId={p.acceptedAnswerId}
                            answerCount={p.answerCount}
                            lastEditDate={p.lastEditDate}
                            comments={p.comments}
                          ></PostRow>
                        );
                      })}
                  </div>
                </ContentBox>
              </>
            )}
          </div>
        </Container>
      </Row>
    </>
  );
}
