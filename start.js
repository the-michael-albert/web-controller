const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nppadqsnplpnbtszfhaj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcGFkcXNucGxwbmJ0c3pmaGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMTQ0MTMsImV4cCI6MjAyOTY5MDQxM30.Wwnhfm4Ll8cZ_ckOOZaYxYGNhaM9AZneL7IXF2SQec0';

const supabase = createClient(supabaseUrl, supabaseKey);
const app = express();
const PORT = process.env.PORT || 6969;

// Middleware to parse JSON bodies
app.use(express.json());

// Get context by resourceid
app.get('/get_context/:resourceID', async (req, res) => {
  const resourceID = req.params.resourceID;
  const { data, error } = await supabase.rpc('get_context_by_resourceid', {
    resource_id: resourceID
  });
  if (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } else {
    res.json(data);
  }
});

// Set context by resourceid
app.put('/set_context/:resourceID', async (req, res) => {
  const resourceID = req.params.resourceID;
  const newContext = req.body.new_context;
  const { error } = await supabase.rpc('set_context_by_resourceid', {
    resource_id: resourceID,
    new_context: newContext
  });
  if (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } else {
    res.status(200).json({ message: 'Context updated successfully' });
  }
});

// Repeat similar endpoints for other fields (style, notes, name, workstatus)

// Get style by resourceid
app.get('/get_style/:resourceID', async (req, res) => {
  const resourceID = req.params.resourceID;
  const { data, error } = await supabase.rpc('get_style_by_resourceid', {
    resource_id: resourceID
  });
  if (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } else {
    res.json(data);
  }
});

// Set style by resourceid
app.put('/set_style/:resourceID', async (req, res) => {
  const resourceID = req.params.resourceID;
  const newStyle = req.body.new_style;
  const { error } = await supabase.rpc('set_style_by_resourceid', {
    resource_id: resourceID,
    new_style: newStyle
  });
  if (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } else {
    res.status(200).json({ message: 'Style updated successfully' });
  }
});

// Repeat the above pattern for notes, name, and workstatus fields

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
