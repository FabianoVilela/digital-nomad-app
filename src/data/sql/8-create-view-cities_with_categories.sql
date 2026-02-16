CREATE OR REPLACE VIEW cities_with_categories AS
SELECT
  c.*,
  cc.id AS category_id,
  cc.name AS category_name,
  cc.description AS category_description,
  cc.code AS category_code
FROM cities c
JOIN city_categories ccl ON ccl.city_id = c.id
JOIN categories cc ON cc.id = ccl.category_id;