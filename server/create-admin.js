// Script para criar usuário admin via API
const http = require('http');

const data = JSON.stringify({
  username: 'admin',
  password: 'admin123'
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🚀 Criando usuário admin...');

const req = http.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    const result = JSON.parse(responseData);
    if (result.success) {
      console.log('✅ Usuário criado com sucesso!');
      console.log('📧 Username: admin');
      console.log('🔑 Password: admin123');
    } else {
      console.log('ℹ️ ', result.message);
      console.log('💡 Tente fazer login com: admin / admin123');
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Erro:', e.message);
  console.log('💡 Certifique-se de que o servidor está rodando na porta 3001');
});

req.write(data);
req.end();
