/**
 * Presentation Layer: Express Application
 * 
 * This sets up the Express application and wires everything together.
 * This is where dependency injection happens.
 * 
 * In a real application, you would use a dependency injection container.
 */

import express, { Express } from 'express';
import { UserController } from '../controllers/UserController';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { InMemoryUserRepository } from '../../infrastructure/persistence/UserRepository';

// Create Express app
const app: Express = express();
app.use(express.json());

// Dependency Injection: Wire everything together
// 1. Create infrastructure (repository)
const userRepository = new InMemoryUserRepository();

// 2. Create application (use case) with infrastructure dependency
const createUserUseCase = new CreateUserUseCase(userRepository);

// 3. Create presentation (controller) with application dependency
const userController = new UserController(createUserUseCase);

// Routes
app.post('/users', (req, res) => {
  userController.createUser(req, res);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
