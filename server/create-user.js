// Script para criar usuário admin
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;
const username = 'admin';
const password = 'admin123';

// Criar hash da senha
const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

console.log('=================================================');
console.log('✅ Usuário criado com sucesso!');
console.log('=================================================');
console.log('Username:', username);
console.log('Password:', password);
console.log('Hash:', passwordHash);
console.log('=================================================');
console.log('');
console.log('Adicione este usuário manualmente ao banco:');
console.log(`INSERT INTO users (username, password_hash) VALUES ('${username}', '${passwordHash}');`);
console.log('');
console.log('Ou para modo MOCK, edite o arquivo server/routes/auth.js');
console.log('e substitua a lógica de login para usar este hash.');
console.log('=================================================');

// Para modo MOCK - cria usuário em memória
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password_hash: passwordHash
  }
];

console.log('\n📋 Usuário para modo MOCK:');
console.log(JSON.stringify(mockUsers[0], null, 2));
