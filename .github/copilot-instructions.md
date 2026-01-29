# FMS API Copilot Instructions

## Project Overview

FMS (FASSET Management System) API is a Node.js/Express REST API for managing tenders, job positions, applications, documents, articles, and administrative functions. Built with Sequelize ORM for PostgreSQL, JWT authentication, and file upload capabilities.

## Architecture

### Core Stack

- **Runtime**: Node.js 18
- **Framework**: Express.js with async/await pattern
- **Database**: PostgreSQL (via Sequelize ORM)
- **Auth**: JWT tokens (access, refresh, reset) with Bearer scheme
- **File Handling**: express-fileupload with 500MB limit, temp files in `/tmp/`
- **Email**: Nodemailer via Office365 SMTP

### Environment-Based Routing

All API routes are prefixed with `/api/{NODE_ENV}` (default: `/api/dev`). This is critical - routes defined in `routes/**` are mounted at this dynamic base URL in `app.js`.

### Module Structure

```
controllers/
  admin/          # Admin-only operations (departments, modules, users, articles)
  auth/           # Authentication (login, addUser, reset password)
  user/           # Domain controllers: scm, humanResource, cse
routes/
  admin/admin.js
  auth/auth.js
  user/           # scm.js, humanResource.js, cse.js
models/           # Sequelize models with associations
migrations/       # Timestamped DB migrations (run via npm run migrate)
uploads/          # Static file storage organized by feature
```

## Critical Patterns

### Response & Error Handling

**Always use these utilities** - never throw raw errors:

```javascript
const { ApiError, ApiResponse } = require("../../utils/response");

// Success responses
return res
  .status(200)
  .json(ApiResponse("Success message", "dataKey", dataObject));
// Key defaults to "data" if omitted

// Errors (caught by errorHandler middleware)
throw new ApiError("User not authorized", 401);
```

All async route handlers must call `next(err)` in catch blocks. The `errorHandler` middleware centralizes error responses.

### Authentication Flow

- **Middleware**: `AuthMid` extracts `Bearer {token}` from `authorization` header
- Validates JWT using `JWT_ACCESS_KEY` from env
- Attaches decoded claims to `req.user`
- Protected routes: `router.post("/endpoint", AuthMid, controller)`
- Public routes: omit `AuthMid`

### File Upload Pattern

```javascript
const file = req?.files?.fieldName;
if (!file) throw new ApiError("File required", 400);

const save = file.mv(`${process.env.FOLDER_ENV_VAR}/${file.name}`);
if (!save) throw new ApiError("Error saving file", 400);

// Store filename in DB, serve via /uploads static route
```

Upload folders defined in `config.env`: `TENDER_DOCUMENT_FOLDER`, `POSITION_DOCUMENT_FOLDER`, `BANNER_IMAGE_FOLDER`, etc.

### Controller Pattern

Export objects with named methods (not individual exports):

```javascript
const ControllerName = {
  methodOne: async (req, res, next) => {
    try {
      // logic
      return res.status(200).json(ApiResponse("Success"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
};
module.exports = ControllerName;
```

### Database Transactions

Use transactions for multi-table operations:

```javascript
const t = await sequelize.transaction();
try {
  await Model.create({...}, { transaction: t });
  await RelatedModel.create({...}, { transaction: t });
  await t.commit();
} catch (err) {
  await t.rollback();
  next(err);
}
```

### Model Associations

Defined in static `associate` method of each model. Common patterns:

- `belongsTo` for foreign keys (e.g., User -> Department)
- `hasMany` for one-to-many (e.g., Department -> Users)
- Always specify `as` for include queries
- Use `{onDelete: "CASCADE", hooks: true}` for referential integrity

## Database Workflow

### Migrations

```bash
npm run migrate    # Undo all + re-run (destructive!)
npm run seed       # Seed initial data
```

**Never edit existing migrations** - create new ones. Migration naming: `YYYYMMDDHHMMSS-create-table-name.js`.

### Model Conventions

- Primary keys: UUID v4 (`defaultValue: DataTypes.UUIDV4`)
- Timestamps: Sequelize auto-adds `createdAt`, `updatedAt`
- Foreign keys: Named `{model}Id` (e.g., `departmentId`)

## Development Workflow

### Local Setup

1. Database runs in Docker: `docker-compose up` (postgres service)
2. Update `config/config.json` if needed (default: `postgres/@Password123` on localhost)
3. Run migrations: `npm run migrate`
4. Start dev server: `npm run dev` (nodemon)

### Docker Deployment

- Uses `pm2` in production (`npm start`)
- Environment variables in `docker-compose.yml` override `config.env`
- Exposed on port 5000 (container) mapped to host 5000

### Testing Endpoints

- Health check: `GET /` and `GET /test`
- Auth required endpoints return 401 without valid Bearer token
- Use Morgan logs (console) to track request/response times

## Key Files Reference

- **`app.js`**: Entry point, middleware setup, dynamic route prefix
- **`routes/index.js`**: Aggregates all route modules
- **`middlewares/authMid.js`**: JWT verification logic
- **`utils/helper.js`**: JWT signing/verification functions
- **`utils/sendEmail.js`**: Nodemailer wrapper for SMTP emails
- **`models/index.js`**: Sequelize auto-loader for models

## Common Pitfalls

1. **Route paths**: Remember the `/api/{NODE_ENV}` prefix - don't hardcode `/api/dev`
2. **File uploads**: Check `req?.files?.fieldName` existence before accessing
3. **Transactions**: Always rollback in catch blocks
4. **Auth headers**: Format must be `Bearer {token}`, not just the token
5. **Email sending**: Wrapped in try/catch - failures shouldn't crash requests
6. **Environment vars**: Loaded via dotenv from `config/config.env`, not `.env`
7. **Static files**: Served from `uploads/` and `public/` directories

## Controller Implementation Examples

### Create with Transaction (Multi-table)

See [authController.js](controllers/auth/authController.js#L24-L60) - `addUser` method shows:

- Creating related records (User + UserModule) in same transaction
- Sending confirmation email after successful commit
- Always passing `{ transaction: t }` to create/update operations

### Domain Controllers

- [scmController.js](controllers/user/scmController.js) - Supply Chain Management
- [humanResourceController.js](controllers/user/humanResourceController.js) - HR functions
- [cseController.js](controllers/user/cseController.js) - Corporate Services

### Admin Operations

[adminController.js](controllers/admin/adminController.js) contains:

- Department/Module CRUD operations (all protected with `AuthMid`)
- Article management (create, read, update, delete with pagination)
- NewsLetter generation and distribution

## Data Models Overview

Key entities in [models/](models/):

- **User** - belongs to Department & Role, hasMany UserModule
- **Department** - hasMany Users
- **Article** - content for newsletters, tracks views & shares via ArticleView
- **Application** - job applications with ApplicationAnswer responses
- **Tender/Position** - job postings with qualification requirements
- **Banner/Board/Committee** - institutional information
- **SubscriptionEmail** - manages email subscriptions (for newsletters)

Association pattern: Define in model's `static associate()` method, include as `{...include: [{association: 'as', attributes: [...]}]}`

## Testing with Postman

Common endpoints:

- `GET /` - Health check
- `POST /api/dev/auth/login` - Public login
- `POST /api/dev/admin/department` - Requires AuthMid
- `GET /api/dev/articles` - Public articles list
- `GET /uploads/{path}` - Serve static files

When testing auth: Include header `Authorization: Bearer {jwt_token}` in all protected routes.
