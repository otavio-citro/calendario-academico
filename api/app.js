    import express from 'express';
    import { BD, testarConexao } from "./db.js";
    import rotaUsuarios from './src/routes/rotaUsuarios.js'
    import rotaTurmas from './src/routes/rotaTurmas.js'
    import rotaDisciplinas from './src/routes/rotaDisciplinas.js'
    import rotaTurmasUsuarios from './src/routes/rotaTurmasUsuarios.js'
    import rotaCalendario from './src/routes/rotaCalendario.js'
    import rotaEventos from './src/routes/rotaEventos.js'
    import rotaParticipantes from './src/routes/rotaParticipantes.js'
    
    //usando swwager
    import swaggerUi from 'swagger-ui-express'
    import documentacao from './config/swagger.js';
    import cors from 'cors'

    const app = express();
    app.use(express.json());
    // app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
    app.use(cors())

    // Adicione:
app.get('/swagger', (req, res) => {
 res.send(`<!DOCTYPE html>
<html><head>
  <title>API Ordens de Serviço</title>
  <meta charset="utf-8"/>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
</head><body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      spec: ${JSON.stringify(documentacao)},
      dom_id: '#swagger-ui'})
  </script>
</body></html>`);
});

    app.get('/', async (req, res) => {
        await testarConexao();
        // res.status(200).json('Api funcionando')
        res.redirect('/swagger')
    })
    app.use(rotaUsuarios)
    app.use(rotaDisciplinas)
    app.use(rotaTurmas)
    app.use(rotaTurmasUsuarios)
    app.use(rotaCalendario)
    app.use(rotaEventos)
    app.use(rotaParticipantes)
    

    const porta = 3002
    app.listen(porta, () => {
        console.log(`http://localhost:${porta}`);

    })

