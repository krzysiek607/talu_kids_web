-- ============================================
-- TaLu Kids - Tabela Newsletter
-- Uruchom w Supabase Dashboard > SQL Editor
-- ============================================

-- Tabela subskrybentów
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

-- Indeks na email (szybkie wyszukiwanie i unikanie duplikatów)
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers (email);

-- Indeks na status (filtrowanie aktywnych)
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers (status);

-- RLS (Row Level Security)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Polityka: anon może tylko INSERT (zapisać się)
CREATE POLICY "Allow anonymous newsletter signup"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Polityka: anon NIE MOŻE czytać danych innych subskrybentów
-- (brak SELECT policy dla anon = brak dostępu do odczytu)

-- Polityka: authenticated (admin) może wszystko
CREATE POLICY "Admin full access to newsletter"
  ON newsletter_subscribers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Komentarz na tabeli
COMMENT ON TABLE newsletter_subscribers IS 'Subskrybenci newslettera TaLu Kids (strona www + aplikacja)';
