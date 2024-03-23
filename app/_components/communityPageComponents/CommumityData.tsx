'use client';

import React, { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import supabase from '@/app/_utils/supabase/api';

export const CommunityData = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('communityPosts').select('*');
      if (error) {
        setError(error);
      } else {
        setItems(data || []);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  return { items, loading, error };
};
