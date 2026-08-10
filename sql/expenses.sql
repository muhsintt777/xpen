CREATE TABLE expenses (
    id BIGSERIAL PRIMARY KEY,

    amount NUMERIC(12, 2) NOT NULL,
    note VARCHAR(50),

    category_id BIGINT NOT NULL,
    type VARCHAR(4) NOT NULL,
    expense_date BIGINT NOT NULL,

    user_id BIGINT NOT NULL,

    created_at BIGINT NOT NULL
        DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::BIGINT,

    updated_at BIGINT NOT NULL
        DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::BIGINT,

    CONSTRAINT fk_expenses_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_expenses_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT expenses_amount_positive
        CHECK (amount > 0),

    CONSTRAINT expenses_type_check
        CHECK (type IN ('need', 'want', 'save'))
);

CREATE TRIGGER trg_expenses_updated_at
BEFORE UPDATE ON expenses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();