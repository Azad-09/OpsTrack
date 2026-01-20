# OpsTrack – Internal Operations Management System

## Overview

**OpsTrack** is a backend system designed to demonstrate how enterprise applications handle **secure authentication and authorization** using modern Spring Boot practices.

The project focuses on building a **production-grade security architecture** with **JWT-based stateless authentication**, **role-based access control**, and **request-level authorization** using **Spring Security**.

This system mirrors real-world internal tools used by organizations to protect APIs and manage user access securely.

---

## Tech Stack

- Java 17
- Spring Boot 3.x
- Spring Security
- JWT (jjwt)
- Spring Data JPA / Hibernate
- PostgreSQL
- Maven
- Lombok

---

## Authentication & Authorization Design

OpsTrack uses **stateless authentication** based on **JWT (JSON Web Tokens)**.

### Authentication Flow

1. User logs in using email and password
2. Credentials are validated using Spring Security
3. On successful authentication, a JWT token is generated
4. Client sends the JWT token with every subsequent request
5. A custom JWT filter validates the token on each request
6. Authenticated user details are stored in the SecurityContext

This approach avoids server-side sessions and supports scalable, distributed systems.

---

## Key Security Components

### CustomUserDetailsService
- Loads user data from the database during authentication
- Acts as a bridge between the domain User entity and Spring Security
- Maps application roles to Spring Security roles

### JWT Authentication Filter
- Intercepts every incoming request
- Extracts and validates the JWT token
- Authenticates the request before it reaches controllers

### Role-Based Authorization
- Implemented using `@PreAuthorize`
- Enforces access control at method level
- Ensures only authorized roles can access protected APIs

---

## Role-Based Access Control

| Role  | Access Level |
|------|-------------|
| ADMIN | Admin APIs + User APIs |
| USER  | User APIs only |

Unauthorized access attempts result in **403 Forbidden** responses.

---

## Database & Auditing

- PostgreSQL is used as the primary database
- JPA/Hibernate handles ORM mapping
- All entities inherit from a common `BaseAuditableEntity` which automatically tracks:
    - `createdAt`
    - `updatedAt`
    - `createdBy`
    - `updatedBy`

This ensures consistent auditing across the application.

---

## How to Run the Project

### Prerequisites
- Java 17
- PostgreSQL
- Maven

### Steps

1. Create database:
   ```sql
   CREATE DATABASE opstrack;

2. Update application.properties:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/opstrack
    spring.datasource.username=postgres
    spring.datasource.password=postgres
    
    spring.jpa.hibernate.ddl-auto=create
    spring.jpa.show-sql=true

3. Build and run:
   ```properties
    mvn clean install
    mvn spring-boot:run
   
## Sample API Usage

### Login
```
POST /auth/login
```
    {
    "email": "admin@opstrack.com",
    "password": "admin123"
    }

#### Response
```properties
JWT_TOKEN
```

### Access Protected Endpoint
```properties
GET /admin
Authorization: Bearer <JWT_TOKEN>
```
## Author
*AZAD KUMAR MAHAPATRA*
`Full Stack Engineer (Java + Angular)`