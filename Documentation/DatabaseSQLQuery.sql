CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  email_verify_otp VARCHAR(255) DEFAULT NULL,
  email_verify_otp_expires DATETIME DEFAULT NULL,
  reset_otp VARCHAR(255) DEFAULT NULL,
  reset_otp_expires DATETIME DEFAULT NULL,
  password_changed_at DATETIME DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_username_length CHECK (CHAR_LENGTH(username) BETWEEN 3 AND 20),
  CONSTRAINT chk_password_length CHECK (CHAR_LENGTH(password) >= 8)
);

-- Indexes for fast lookup
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_username ON users (username);
CREATE INDEX idx_email_verify_otp ON users (email_verify_otp);
CREATE INDEX idx_reset_otp ON users (reset_otp);

-- Notes: Email/account verification uses OTP (stored in email_verify_otp) not a verification link. Login is direct using email+password. Password reset uses reset_otp. --
