# Security Policy

## Supported Versions

Currently, this project is actively maintained and any security vulnerabilities will be addressed in the main branch.

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to muhammadtahir@example.com. All security vulnerabilities will be promptly addressed.

## Security Practices

This project follows these security practices:

### Environment Variables
- All sensitive information (database credentials, API keys, secrets) must be stored in environment variables
- The `.env` file is included in `.gitignore` to prevent accidental commits
- An `.env.example` file is provided to document required environment variables without exposing actual values

### Sensitive Information
The following types of information should NEVER be committed to the repository:
- Database connection strings with credentials
- API keys and secrets
- Private keys
- Passwords
- JWT secrets

### MongoDB Security
- Use strong, unique passwords for database users
- Limit database user permissions to only what is necessary
- Use environment variables for connection strings
- Enable MongoDB Atlas network access controls

### JWT Security
- Use strong, randomly generated secrets
- Store JWT secrets in environment variables
- Rotate secrets periodically
- Use appropriate token expiration times

## Setup Instructions for New Developers

1. Clone the repository
2. Copy `.env.example` to `.env` in the backend directory
3. Update the values in `.env` with your actual credentials
4. Never commit your `.env` file to the repository

## Additional Security Recommendations

1. Regularly update dependencies to address known vulnerabilities
2. Use HTTPS in production
3. Implement proper input validation and sanitization
4. Use rate limiting for API endpoints
5. Implement proper authentication and authorization
6. Regularly backup your database
7. Monitor application logs for suspicious activity