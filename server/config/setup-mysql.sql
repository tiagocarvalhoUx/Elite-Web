-- Configurar usuário para aplicação
-- Execute: mysql -u root -p < setup-mysql.sql

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS portfolio_db 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- Criar usuário da aplicação (autenticação nativa)
CREATE USER IF NOT EXISTS 'elite_user'@'localhost' 
  IDENTIFIED WITH mysql_native_password BY 'elite_pass_2024';

-- Dar permissões
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'elite_user'@'localhost';

FLUSH PRIVILEGES;

-- Criar tabelas
USE portfolio_db;

-- Tabela de usuários (admin)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de projetos do portfólio
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  project_link VARCHAR(500),
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_is_active ON projects(is_active);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

SELECT '✅ Configuração completa! Banco e usuário criados.' AS message;
