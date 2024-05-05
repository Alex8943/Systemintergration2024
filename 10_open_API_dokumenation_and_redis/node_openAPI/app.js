import express from "express"; 
import usersRouter from './routes/usersRouter.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from "swagger-jsdoc";

const app = express(); 

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Users API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(usersRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
