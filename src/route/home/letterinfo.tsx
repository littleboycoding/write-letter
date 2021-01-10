import React, { ChangeEvent, useState } from "react";
import { gql, Reference, useMutation, useQuery } from "@apollo/client";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import * as GET_LETTER_TYPES from "./__generated__/GET_LETTER";
import * as WRITE_COMMENT_TYPES from "./__generated__/WRITE_COMMENT";
import * as GET_PAPER_PLANE_TYPES from "./__generated__/GET_PAPER_PLANE";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import FormatDate from "../../utils/formatDate";

import Loader from "../../utils/loading";

const FETCH_MORE_COMMENTS = gql`
  query FETCH_MORE_COMMENTS($cursor: ID, $id: ID!) {
    getLetter(id: $id) {
      id
      getComments(cursor: $cursor) {
        cursor
        limit
        hasMore
        letterId
        comments {
          id
          letterId
          content
          commenter
          date
        }
      }
    }
  }
`;

const GET_LETTER = gql`
  query GET_LETTER($id: ID!, $cursor: ID) {
    getLetter(id: $id) {
      id
      content
      writer
      date
      method
      read
      getComments(cursor: $cursor) {
        cursor
        limit
        letterId
        hasMore
        comments {
          id
          content
          commenter
          date
        }
      }
    }
  }
`;

const WRITE_COMMENT = gql`
  mutation WRITE_COMMENT(
    $letterId: ID!
    $content: String!
    $commenter: String!
  ) {
    writeComment(
      letterId: $letterId
      content: $content
      commenter: $commenter
    ) {
      id
      letterId
      content
      commenter
      date
    }
  }
`;

const InfoContainer = styled.div`
  width: 80vw;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  font-size: calc(0.5vw + 0.5vh + 5px);
  padding: 5px;

  h2 {
    word-break: break-all;
    text-transform: uppercase;

    svg {
      opacity: 0.5;
    }
  }

  p {
    word-break: break-all;
  }

  u {
    font-size: 0.9em;
  }

  textarea {
    resize: none;
    padding: 10px;
    border-radius: 3px;
    font-size: 0.9em;
    background-color: ${(props) => props.theme.textBox};
    border: 1px solid #aaa;
  }

  @media only screen and (max-width: 800px) {
    font-size: calc(0.6vw + 0.9vh + 5px);
  }
`;

const CommentButton = styled.button`
  margin: 10px 0;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 3px;
  background-color: green;
  font-size: 1em;

  &:hover {
    background-color: darkgreen;
    cursor: pointer;
  }

  &:disabled {
    background-color: grey;
    cursor: normal;
  }
`;

function InfoContainerStyled({
  data,
  loadMore,
}: {
  data:
    | GET_PAPER_PLANE_TYPES.GET_PAPER_PLANE_getPaperPlane
    | GET_LETTER_TYPES.GET_LETTER_getLetter;
  loadMore?: () => void;
}): JSX.Element {
  const [comment, commentSetter] = useState<string>("");
  const [write, { loading }] = useMutation<
    WRITE_COMMENT_TYPES.WRITE_COMMENT,
    WRITE_COMMENT_TYPES.WRITE_COMMENTVariables
  >(WRITE_COMMENT, {
    variables: {
      letterId: data.id,
      content: comment,
      commenter: window.localStorage.getItem("username") || "Anonymous",
    },
    onCompleted() {
      commentSetter("");
    },
    update(cache, { data: newData }) {
      if (newData)
        cache.modify({
          id: cache.identify({ __typename: "Letter", id: data.id }),
          fields: {
            getComments(existingRef = { comments: [], limit: 5 }) {
              const ref = cache.writeFragment({
                data: newData.writeComment,
                fragment: gql`
                  fragment NEW_COMMENT on Comment {
                    id
                    letterId
                    content
                    commenter
                    date
                  }
                `,
              });

              const newRef: Reference[] = [ref, ...existingRef.comments];

              return {
                ...existingRef,
                comments: newRef,
              };
            },
          },
        });
    },
  });

  function onCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    commentSetter(event.target.value);
  }

  const onCommented = (event: React.MouseEvent<HTMLButtonElement>) => write();

  return (
    <InfoContainer>
      <h2>
        <FontAwesomeIcon icon={faEnvelope} /> {data.writer}'S LETTER
      </h2>
      <u>Written {FormatDate(new Date(data.date))}</u>
      <p>{data.content}</p>
      {data.method === "post" && "getComments" in data && (
        <>
          <HashtagListStyled content={data.content} />
          <textarea
            disabled={loading}
            value={comment}
            onChange={onCommentChange}
            rows={4}
            maxLength={250}
            placeholder="Write some comment . . ."
          ></textarea>
          <CommentButton disabled={!comment || loading} onClick={onCommented}>
            Comment
          </CommentButton>
          <LetterCommentContainerStyled comments={data.getComments} />
          {data.getComments.hasMore && loadMore && (
            <MoreButton onClick={loadMore}>More</MoreButton>
          )}
        </>
      )}
    </InfoContainer>
  );
}

const HashtagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  overflow: hidden;
  color: black;

  .hashtag {
    white-space: wrap;
    word-break: break-all;
    margin: 10px 10px 10px 0px;
    background-color: #ccc;
    padding: 5px;
    border-radius: 5px;
    font-size: 0.8em;
  }
`;

function HashtagListStyled({ content }: { content: string }) {
  const hashtags = Array.from(
    new Set(content.match(/(?<=( |^))#(.*?)(?=( |$))/g) || [])
  );

  return (
    <HashtagList>
      {hashtags.map((hashtag) => (
        <div key={hashtag} className="hashtag">
          {hashtag}
        </div>
      ))}
    </HashtagList>
  );
}

const MoreButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 3px;
  background-color: black;
  align-self: center;

  &:hover {
    background-color: #555;
    cursor: pointer;
  }
`;

const LetterComment = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.comment};
  border: 1px solid ${(props) => props.theme.commentBorder};
  border-radius: 3px;
  margin: 10px 0;
  word-break: break-all;
  display: flex;
  flex-direction: column;

  b {
    margin-bottom: 10px;
  }
`;

function LetterCommentContainerStyled({
  comments: { comments },
}: {
  comments: GET_LETTER_TYPES.GET_LETTER_getLetter_getComments;
}) {
  const data: JSX.Element[] = comments.map((comment) => (
    <LetterComment key={comment.id}>
      <b>
        {comment.commenter} commented {FormatDate(new Date(comment.date))}
      </b>
      <span>{comment.content}</span>
    </LetterComment>
  ));

  return data?.length > 0 ? (
    <>{data}</>
  ) : (
    <p style={{ textAlign: "center" }}>No comment (yet)</p>
  );
}

function LetterInfo() {
  const { LETTER_ID } = useParams<{ LETTER_ID: string }>();
  const { data, loading, error, fetchMore } = useQuery<
    GET_LETTER_TYPES.GET_LETTER,
    GET_LETTER_TYPES.GET_LETTERVariables
  >(GET_LETTER, {
    variables: {
      id: LETTER_ID,
      cursor: null,
    },
  });

  function loadMore(): void {
    fetchMore({
      query: FETCH_MORE_COMMENTS,
      variables: {
        id: LETTER_ID,
        cursor: data ? data.getLetter.getComments.cursor : null,
      },
    });
  }

  // if (error) return <span>{error.message}</span>;
  if (error) return <Redirect to="/" />;

  if (!loading) {
    if (data) {
      return <InfoContainerStyled loadMore={loadMore} data={data.getLetter} />;
    } else {
      return <Redirect to="/" />;
    }
  }
  return <Loader />;
}

export default LetterInfo;
export { InfoContainerStyled };
