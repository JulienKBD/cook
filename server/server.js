const express = require('express');
const cookieParser = require('cookie-parser');
const authenticateToken = require('./middleware/auth.js');
const { bodyParser, loggingMiddleware, corsMiddleware } = require('./middleware/middleware.js');
const { googleOAuthHandler, getAuthStatus, deleteSession} = require('./controller/session.controller.js');
const routerAuth = require('./routes/auth/auth.js');
const routerComments = require('./routes/comments/comments.js');
const routerRecipes = require('./routes/recipes/recipes.js');
const routerUser = require('./routes/user/user.js');
const routerEdamam = require('./routes/api_edamam/api_edamam.js');
const notFound = require('./middleware/notFound.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(loggingMiddleware);
app.use(corsMiddleware);

// Authentication
app.post('/inscription', routerAuth);
app.post('/connexion', routerAuth);

// Google OAuth 2.0
app.get('/api/sessions/oauth/google', googleOAuthHandler);
app.get('/api/sessions/auth-status', getAuthStatus);
app.post('/api/sessions/logout', deleteSession);

// Comments
app.get('/comments/:recipeId', routerComments);
app.post('/comments/:recipeId', routerComments);
app.put('/comments/:commentId', routerComments);
app.delete('/comments/:recipeId', routerComments);

// Recipes
app.get('/recipe/:recipeId', routerRecipes);
app.post('/recipe', routerRecipes);
app.put('/recipe/:recipeId', routerRecipes);
app.delete('/recipe/:recipeId', routerRecipes);

// API Edamam
app.get('/recipe/macro-nutrients/:query', routerEdamam);

// User
app.get('/users', routerUser);
app.get('/user/:userId', routerUser);
app.put('/user/:userId', routerUser);
app.delete('/user/:userId', routerUser);

// 404 Not Found
app.use(notFound);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
