-- ==============================================================================
-- SUPABASE SECURITY ADVISOR FIX: Enable Row Level Security (RLS) on all 20 tables
-- ==============================================================================

-- 1. Enable RLS on all existing public tables dynamically
DO $$ 
DECLARE 
    tbl RECORD;
BEGIN 
    FOR tbl IN (
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    ) 
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', tbl.tablename);
        
        -- Drop any old service role policies if present
        EXECUTE format('DROP POLICY IF EXISTS "Allow service role full access" ON public.%I;', tbl.tablename);
        
        -- Allow service_role / backend / postgres full access
        EXECUTE format(
            'CREATE POLICY "Allow service role full access" ON public.%I FOR ALL TO service_role USING (true) WITH CHECK (true);', 
            tbl.tablename
        );
    END LOOP;
END $$;

-- 2. Explicitly ensure RLS on all 20 Tanush Fitness tables
ALTER TABLE IF EXISTS public."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."GymOwner" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."JobSeeker" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."EquipmentCategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."ProductImage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."EquipmentEnquiry" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."EquipmentEnquiryItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."BusinessService" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."ServiceEnquiry" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Job" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."JobApplication" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."ContactEnquiry" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Notification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Testimonial" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Setting" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."RefreshToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."AuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Media" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."_prisma_migrations" ENABLE ROW LEVEL SECURITY;

-- 3. Public Read Policies for Catalog, Services, and Categories (Optional if reading directly from client)
DROP POLICY IF EXISTS "Public can read categories" ON public."EquipmentCategory";
CREATE POLICY "Public can read categories" ON public."EquipmentCategory" FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can read products" ON public."Product";
CREATE POLICY "Public can read products" ON public."Product" FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can read product images" ON public."ProductImage";
CREATE POLICY "Public can read product images" ON public."ProductImage" FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can read services" ON public."BusinessService";
CREATE POLICY "Public can read services" ON public."BusinessService" FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can read testimonials" ON public."Testimonial";
CREATE POLICY "Public can read testimonials" ON public."Testimonial" FOR SELECT TO anon, authenticated USING (true);
