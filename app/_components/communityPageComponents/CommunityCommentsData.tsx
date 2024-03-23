import React, { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import supabase from '@/app/_utils/supabase/api';

const CommunityCommentsData = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(true);
  const [commentsError, setCommentsError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('communityComments').select('*');
      if (commentsError) {
        setCommentsError(error);
      } else {
        setComments(data || []);
      }
      setCommentsLoading(false);
    };

    fetchItems();
  }, []);

  return { comments, commentsLoading, commentsError };
};

export default CommunityCommentsData;
