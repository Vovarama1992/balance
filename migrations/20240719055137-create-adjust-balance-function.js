export default {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION adjust_balance(user_id INT, delta INT) RETURNS BOOLEAN AS $$
      DECLARE
        current_balance INT;
      BEGIN
        -- Select current balance and lock row for update
        SELECT balance INTO current_balance
        FROM "Users"
        WHERE id = user_id
        FOR UPDATE;

        -- Check if balance would go negative
        IF current_balance + delta < 0 THEN
          RETURN FALSE;
        ELSE
          -- Update balance
          UPDATE "Users"
          SET balance = current_balance + delta
          WHERE id = user_id;
          RETURN TRUE;
        END IF;
      END;
      $$ LANGUAGE plpgsql;
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS adjust_balance(INT, INT);
    `);
  },
};