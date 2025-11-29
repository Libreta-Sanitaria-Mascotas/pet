-- Migration: Add size and weight to pets
-- Date: 2025-01-12

-- Tamaño categórico (small/medium/large)
ALTER TABLE pets
ADD COLUMN size VARCHAR(20);

-- Peso en kilogramos con hasta 2 decimales
ALTER TABLE pets
ADD COLUMN weight NUMERIC(6,2);

-- Índice ligero para consultas por tamaño
CREATE INDEX IF NOT EXISTS idx_pets_size ON pets(size);
