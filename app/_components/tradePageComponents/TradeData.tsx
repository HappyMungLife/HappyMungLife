'use client';

import React, { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import supabase from '@/app/_utils/supabase/api';

export const TradeData = () => {
  const [tradeItems, setTradeItems] = useState<any[]>([]);
  const [tradeLoading, setTradeLoading] = useState<boolean>(true);
  const [tradeError, setTradeError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('tradePosts').select('*, postUser:users(nickname,profileImage)');
      if (error) {
        setTradeError(error);
      } else {
        setTradeItems(data || []);
      }
      setTradeLoading(false);
    };

    fetchItems();
  }, []);
  return { tradeItems, tradeLoading, tradeError };
};
