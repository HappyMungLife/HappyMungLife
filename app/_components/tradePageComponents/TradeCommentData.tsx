import React, { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import supabase from '@/app/_utils/supabase/api';

const TradeCommentData = () => {
  const [tradecomments, setTradeComments] = useState<any[]>([]);
  const [tradeCommentsLoading, setTradeCommentsLoading] = useState<boolean>(true);
  const [tradeCommentsError, setTradeCommentsError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('tradeComments').select('*');
      if (error) {
        setTradeCommentsError(error);
      } else {
        setTradeComments(data || []);
      }
      setTradeCommentsLoading(false);
    };

    fetchItems();
  }, []);

  return { tradecomments, tradeCommentsLoading, tradeCommentsError };
};

export default TradeCommentData;
