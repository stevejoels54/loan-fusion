# Loan Application Backend Service (JAVA)

A Spring Boot microservice that handles loan applications with CRUD operations.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+
- Docker (optional)

## Tech Stack

- **Framework**: Spring Boot 3.x
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: PostgreSQL
- **Testing**: JUnit 5, Mockito
- **Documentation**: Swagger/OpenAPI (optional)

## Database Setup

### Option 1: Local PostgreSQL

1. Install PostgreSQL
2. Create a database:
```sql
CREATE DATABASE loan_db;
```

### Option 2: Docker PostgreSQL

```bash
docker run --name postgres-loan \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=loan_db \
  -p 5432:5432 \
  -d postgres
```

## Application Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Configure database connection in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/loan_db
spring.datasource.username=postgres
spring.datasource.password=postgres
```

3. Build the application:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## API Endpoints

### Create Loan Application
```http
POST /api/loans/apply
Content-Type: application/json

{
    "customerId": "string",
    "loanAmount": number,
    "repaymentPeriod": number,
    "loanPurpose": "string"
}
```

### Get Loan Status
```http
GET /api/loans/{loanId}
```

### Update Loan Application
```http
PUT /api/loans/{loanId}
Content-Type: application/json

{
    "loanAmount": number,
    "repaymentPeriod": number,
    "loanPurpose": "string"
}
```

## Running Tests

Run all tests:
```bash
mvn test
```

Run specific test class:
```bash
mvn -Dtest=LoanServiceTest test
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Monitoring and Health Check

Health check endpoint:
```http
GET /actuator/health
```

## Development

### Adding New Features

1. Create feature branch:
```bash
git checkout -b feature/name
```

2. Make changes and test
3. Create pull request

### Code Style

The project follows standard Java conventions and Spring Boot best practices.

## Troubleshooting

Common issues and solutions:

1. Database Connection Issues:
    - Verify PostgreSQL is running
    - Check database credentials
    - Ensure database exists

2. Build Failures:
    - Verify Java 17 is installed: `java -version`
    - Clean Maven cache: `mvn clean`

3. Runtime Errors:
    - Check application logs
    - Verify all required environment variables

## Environment Variables

The following environment variables can be used to override default configurations:

```properties
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/loan_db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
SERVER_PORT=8080
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Create pull request

## License

[Add your license information here]