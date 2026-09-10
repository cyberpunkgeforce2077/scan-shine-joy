/*
# Revoke EXECUTE on rls_auto_enable from anon and authenticated

The `rls_auto_enable` SECURITY DEFINER function is a Supabase internal helper
that should not be callable by client-facing roles. Revoke EXECUTE from both
`anon` and `authenticated` to close the advisor warnings.
*/
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon, authenticated;
