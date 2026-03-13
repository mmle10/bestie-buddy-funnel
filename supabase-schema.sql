-- Run this in your Supabase SQL Editor to create the funnel_responses table

CREATE TABLE IF NOT EXISTS funnel_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Step 1
  child_age INTEGER,
  
  -- Step 2
  child_name TEXT,
  child_gender TEXT CHECK (child_gender IN ('male', 'female')),
  
  -- Step 3
  is_parent BOOLEAN,
  
  -- Step 7
  emotion_value INTEGER,
  
  -- Step 9
  interests TEXT[],
  
  -- Step 11
  safety_answer TEXT,
  
  -- Step 12
  emotional_support_answer TEXT,
  
  -- Step 13
  email TEXT,
  phone TEXT,
  
  -- Step 15
  selected_plan TEXT
);

-- Enable RLS (Row Level Security) - optional, adjust as needed
ALTER TABLE funnel_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for funnel (adjust policy for your auth setup)
CREATE POLICY "Allow anonymous inserts" ON funnel_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous selects" ON funnel_responses
  FOR SELECT USING (true);
