'use client';

import React, { useEffect, useState } from 'react';
import { createClient, PostgrestError } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화
const supabaseUrl = 'https://qxpkrjwzhminshasmblo.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cGtyand6aG1pbnNoYXNtYmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NDAzNDYsImV4cCI6MjAyNjUxNjM0Nn0.2yYHoq9ZMdz-YWFY036b_zHLIalxIqvsF28VStFl11w';
const supabase = createClient(supabaseUrl, supabaseKey);

export const TradeData = () => {
  const [tradeItems, setTradeItems] = useState<any[]>([]);
  const [tradeLoading, setTradeLoading] = useState<boolean>(true);
  const [tradeError, setTradeError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('tradePosts').select('*');
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
