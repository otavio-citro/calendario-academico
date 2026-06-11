import { Pool } from 'pg';

const BD = new Pool({

    connectionString: "postgres://postgres.deqdjbutrwxzhimulrjs:9XHXzmgtnQTFA3BC@aws-1-us-east-1.pooler.supabase.com:5432/postgres",
    ssl: {rejectUnauthorized: false}
})

// const BD = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'calendario_academico',
//     port: 5432,
//     password: 'admin'
// })


const testarConexao = async () => {
    try {
        const cliente = await BD.connect();
        console.log('sucesso');
        cliente.release()
        
    }
    catch (error) {
        console.error('erro', error.message);
        
    }
 }

 export {BD, testarConexao};