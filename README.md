
# 🔥 PM2 Endpoint Monitor

Este é um script Node.js que monitora a saúde de um endpoint HTTP e, caso detecte falhas ou respostas inesperadas, reinicia todos os processos gerenciados pelo **PM2** automaticamente.

## 🚀 Funcionalidade

- Faz requisições periódicas para um endpoint específico.
- Caso o endpoint retorne um status fora da faixa **200-299** ou ocorra um erro (como timeout ou conexão recusada), o script executa um **restart de todos os processos PM2**.
- Útil para garantir que aplicações críticas se mantenham rodando em caso de falhas externas detectáveis via HTTP.

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Crie o arquivo `.env`

Crie um arquivo chamado `.env` na raiz do projeto com as seguintes variáveis:

```env
CHECK_ENDPOINT=https://seu-endpoint.com/health
CHECK_INTERVAL_MINUTES=1
```

- **CHECK_ENDPOINT:** URL do endpoint que será monitorado.
- **CHECK_INTERVAL_MINUTES:** Intervalo (em minutos) entre cada verificação. (Valor padrão é 1, caso não seja definido.)

---

## 🚦 Uso

Execute o script com Node:

```bash
node index.js
```

Ou, preferencialmente, rode o monitor pelo próprio PM2:

```bash
pm2 start index.js --name monitor-endpoint
```

Assim ele ficará rodando em segundo plano junto com seus outros processos PM2.

---

## 🛠️ Requisitos

- Node.js (versão 14 ou superior recomendada)
- PM2 instalado globalmente

Instalação do PM2 (se necessário):

```bash
npm install -g pm2
```

---

## 📜 Logs

O script irá gerar logs no console indicando:

- Sucesso na checagem do endpoint.
- Avisos caso o status HTTP não esteja na faixa esperada.
- Erros de conexão.
- Informações sobre tentativas de restart dos processos PM2.

---

## 🛡️ Atenção

- Use com cautela. Toda vez que o endpoint monitorado falhar, **todos os processos PM2 serão reiniciados.**
- Ideal para endpoints de health-check que refletem o status geral da aplicação ou serviço.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
