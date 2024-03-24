'use client';

import { formatToLocaleDateTimeString } from '@/app/_utils/date';
import React, { useState } from 'react';
import CommentDeleteButton from './CommentDeleteButton';
import useUpdateCommunityCommentMutation from '@/app/_hooks/useUpdateCommunityCommentMutation';
import useUpdateTradeCommentMutation from '@/app/_hooks/useUpdateTradeCommentMutation';

interface CommentUserType {
  nickname: string;
  profileImage: string;
}

interface CommentType {
  commentId: string;
  created_at: string;
  content: string;
  postId: string;
  userId: string;
  commentUser: CommentUserType;
}

const CommentItem = ({ comment, userId, mode }: { comment: CommentType; userId: string; mode: string }) => {
  const { commentId, commentUser, content, created_at, userId: commentUserId } = comment;
  const postedDate = formatToLocaleDateTimeString(created_at);

  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const { updateComment } =
    mode === 'community'
      ? useUpdateCommunityCommentMutation(commentId, editedContent)
      : useUpdateTradeCommentMutation(commentId, editedContent);

  const handleSetEditClick = async () => {
    setEditedContent(content);
    setEditing(true);
  };

  const handleCancelEditClick = () => {
    setEditing(false);
    setEditedContent(content);
  };

  const handleEditedContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleEditedCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editedContent.trim()) {
      return alert('댓글을 입력해주세요.');
    }
    await updateComment();
    setEditing(false);
  };

  return (
    <div className="" key={commentId}>
      <div className="flex gap-5 mt-7 justify-between items-center w-[1000px]">
        <div className="flex items-center gap-5 px-3">
          <img src={commentUser.profileImage} alt="userProfileImg" className="rounded-[50%] w-12 h-12" />
          <p>{commentUser.nickname}</p>
        </div>
        <p className="px-3">{postedDate}</p>
      </div>
      {/* 해당 댓글작성자일때 수정/삭제 버튼 뜨게하기 - userId === commentUserId ?*/}
      {editing ? (
        <>
          <form onSubmit={handleEditedCommentSubmit}>
            <div className="mt-2 bg-primaryColor/30 rounded-3xl p-5 w-[1000px] min-h-[100px]">
              <textarea
                value={editedContent}
                onChange={(e) => {
                  handleEditedContentChange(e);
                }}
                maxLength={200}
                className="resize-none rounded-3xl p-3 w-[960px] min-h-[100px]"
              >
                {content}
              </textarea>
            </div>
            <div className="flex justify-end gap-10 m-5">
              <button onClick={handleCancelEditClick}>취소</button>
              <button type="submit">등록</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="mt-2 bg-primaryColor/30 rounded-3xl p-5 w-[1000px] min-h-[100px]">
            <p>{content}</p>
          </div>
          <div className="flex justify-end gap-10 m-5">
            <button onClick={handleSetEditClick}>수정</button>
            <CommentDeleteButton commentId={commentId} mode={mode} />
          </div>
        </>
      )}
    </div>
  );
};

export default CommentItem;
