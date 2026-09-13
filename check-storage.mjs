import { createClient } from "@supabase/supabase-js";

const url = "https://hadrzhzdsmrcxeldvcpf.supabase.co";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZHJ6aHpkc21yY3hlbGR2Y3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzcwMjYsImV4cCI6MjEwMTY1MzAyNn0.rynOc47tD4xuLY7gE8SHyQlS2IyFkQjg6gMMMumUqJw";
const supabase = createClient(url, anonKey);

async function check() {
  const { data, error } = await supabase.storage.listBuckets();
  console.log("Buckets:", error || data);
}
check();
