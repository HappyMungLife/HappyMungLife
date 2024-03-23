'use client';

import { formatToLocaleDateTimeString } from '@/app/_utils/date';
import React, { useState } from 'react';
import CommentDeleteButton from './CommentDeleteButton';
import { updateComment } from '@/app/_api/comment-api';

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

const CommentItem = ({ comment, userId }: { comment: CommentType; userId: string }) => {
  const { commentId, commentUser, content, created_at, userId: commentUserId } = comment;
  const postedDate = formatToLocaleDateTimeString(created_at);

  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSetEditClick = async () => {
    setEditing(true);
  };

  const handleCancelEditClick = () => {
    setEditing(false);
  };

  const handleEditedContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSubmitEditClick = async () => {
    try {
      await updateComment(commentId, editedContent);
      setEditing(false);
      // 수정 후 새 코멘트 뜨게하기 - 새로고침 말고 이 컴포넌트만 렌더링?
      window.location.reload();
    } catch (error) {
      throw error;
    }
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
      {editing ? (
        <>
          <div className="mt-2 bg-primaryColor/30 rounded-3xl p-5 w-[1000px] min-h-[100px]">
            <form>
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
            </form>
          </div>
          <div className="flex justify-end gap-10 m-5">
            <button onClick={handleCancelEditClick}>취소</button>
            <button onClick={handleSubmitEditClick}>등록</button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-2 bg-primaryColor/30 rounded-3xl p-5 w-[1000px] min-h-[100px]">
            <p>{content}</p>
          </div>
          <div className="flex justify-end gap-10 m-5">
            <button onClick={handleSetEditClick}>수정</button>
            <CommentDeleteButton commentId={commentId} />
          </div>
          {/* 해당 댓글작성자일때 수정/삭제 버튼 뜨게하기 - userId === commentUserId ?*/}
        </>
      )}
    </div>
  );
};

export default CommentItem;
