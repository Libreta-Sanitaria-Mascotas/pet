-- Migration: Change image_url to media_id in pets table
-- Date: 2025-11-24

-- Step 1: Add new media_id column
ALTER TABLE pets 
ADD COLUMN media_id UUID NULL;

-- Step 2: (Optional) Migrate existing data if needed
-- If you have existing pets with image_url that contains media IDs,
-- you can migrate them here. Otherwise, skip this step.
-- Example:
-- UPDATE pets SET media_id = image_url::uuid WHERE image_url IS NOT NULL AND image_url ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

-- Step 3: Drop old image_url column
ALTER TABLE pets 
DROP COLUMN image_url;

-- Step 4: Add index on media_id for better query performance
CREATE INDEX idx_pets_media_id ON pets(media_id);
