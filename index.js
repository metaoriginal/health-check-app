require('dotenv').config();
const axios = require('axios');
const pm2 = require('pm2');

const INTERVAL_MINUTES = parseFloat(process.env.CHECK_INTERVAL_MINUTES) || 1;
const ENDPOINT = process.env.CHECK_ENDPOINT;

if (!ENDPOINT) {
  console.error('As variáveis CHECK_ENDPOINT devem estar definidas no .env');
  process.exit(1);
}

console.log(`Fazendo check no endpoint ${ENDPOINT} a cada ${INTERVAL_MINUTES} minuto(s).`);

async function checkEndpoint() {
  try {
    const response = await axios.get(ENDPOINT);
    if (response.status >= 200 && response.status < 300) {
      console.log(`[${new Date().toISOString()}] Endpoint OK - status: ${response.status}`);
    } else {
      console.warn(`[${new Date().toISOString()}] Status inesperado: ${response.status}. Executando arquivo.`);
      restartAllProcesses();
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Erro ao acessar endpoint:`, error.message);
    restartAllProcesses();
  }
}

function restartAllProcesses() {
  console.log('Tentando reiniciar todos os processos PM2...');

  pm2.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no PM2:', err);
      return;
    }

    pm2.restart('all', (err, proc) => {
      pm2.disconnect(); // desconecta do PM2 após a operação

      if (err) {
        console.error('Erro ao reiniciar processos PM2:', err);
        return;
      }

      console.log('Todos os processos PM2 foram reiniciados com sucesso.');
    });
  });
}

setInterval(checkEndpoint, INTERVAL_MINUTES * 60 * 1000);