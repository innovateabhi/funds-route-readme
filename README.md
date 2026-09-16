# FundsRoute — One India to Global Remittance

> A web-based remittance platform prototype designed to enable secure, simple, and transparent money transfers from India to international destinations.

![Project Status](https://img.shields.io/badge/status-prototype-orange)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![Flask](https://img.shields.io/badge/Flask-Web%20Framework-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![Nginx](https://img.shields.io/badge/Nginx-Reverse%20Proxy-green)
![Gunicorn](https://img.shields.io/badge/Gunicorn-WSGI%20Server-green)
![AWS](https://img.shields.io/badge/AWS-EC2-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📌 Overview

**FundsRoute — One India to Global Remittance** is a full-stack web application prototype for an international remittance platform.

The project is designed around the concept of allowing users in India to register, complete KYC verification, manage their profile and banking information, select recipients, view currency exchange rates, and initiate international money transfers.

The platform also includes an administrative portal through which administrators can review and approve customer KYC applications before customers are allowed to access the platform.

The project is being developed with a focus on:

- Simple user experience
- Secure authentication
- KYC-based account verification
- International currency exchange
- Recipient management
- Bank account management
- Remittance transaction management
- Administrative control
- Cloud deployment
- PostgreSQL-based data management

> **Important:** FundsRoute is currently a software prototype for development, learning, demonstration, and academic/project purposes. It is **not a licensed financial service or production remittance provider**.

---

## 🎯 Project Objective

The primary objective of FundsRoute is to develop a complete software architecture for an India-to-global remittance platform.

The system aims to provide a workflow such as:

```text
Customer Registration
        ↓
KYC Submission
        ↓
KYC Pending
        ↓
Admin Verification
        ↓
KYC Approved
        ↓
Customer Login
        ↓
Recipient Selection
        ↓
Transfer Amount
        ↓
Currency Conversion
        ↓
Fee Calculation
        ↓
Transfer Confirmation
        ↓
Remittance Transaction
        ↓
Transaction Tracking
```

---

## ✨ Key Features

### 👤 Customer Portal

Customers can:

- Create an account
- Submit personal information
- Submit KYC information
- Upload KYC documents
- Upload selfie
- Add contact information
- Add address information
- Add bank account information
- Login after KYC approval
- View their dashboard
- View and update their profile
- Manage account settings
- View exchange rates
- Manage recipients
- View transactions
- Initiate money transfers

### 🪪 KYC Verification

FundsRoute uses a KYC-based account verification workflow.

During registration, the user can provide:

- Full name
- Date of birth
- Gender
- Nationality
- Occupation
- Email
- Phone number
- Address
- Postal code
- KYC document type
- KYC document number
- KYC document file
- Selfie

New accounts are initially created with:

```
kyc_pending
```

The user cannot login until the administrator verifies the account.

After approval:

```
kyc_pending
      ↓
   verified
```

The user can then access the customer portal.

### 🔐 Authentication

The application provides:

- User registration
- Password hashing
- User login
- Session-based authentication
- Logout
- KYC-based login restriction
- Session timeout
- HTTP-only session cookies
- SameSite cookie protection

The current authentication workflow ensures that only users with:

```
status = verified
```

can access the customer login system.

### 🛠️ Admin Portal

FundsRoute includes a lightweight administrative portal.

Current admin functionality includes:

- Admin login
- KYC application list
- Customer information review
- KYC status display
- KYC approval
- KYC rejection
- Admin logout

Admin workflow:

```text
Admin Login
     ↓
KYC Dashboard
     ↓
View Pending Users
     ↓
Review Application
     ↓
Approve / Reject
```

The current admin portal is intentionally kept small during the prototype stage.

### 💱 Currency Exchange

FundsRoute includes a currency exchange-rate service.

The application exposes:

```
/api/rates
```

Example:

```
/api/rates?base=INR
```

The system can retrieve exchange-rate information for supported currencies.

The exchange-rate service is designed so that the remittance calculation system can later use current currency rates when calculating international transfers.

### 💸 Remittance System

The planned remittance workflow is:

```text
Select Recipient
       ↓
Select Currency
       ↓
Enter INR Amount
       ↓
Fetch Exchange Rate
       ↓
Calculate Transfer Amount
       ↓
Calculate Fees
       ↓
Show Final Amount
       ↓
Review Transfer
       ↓
Confirm
       ↓
Create Transaction
```

The database already contains the required transaction-related structures for developing this workflow.

### 👥 Recipient Management

The database supports recipient management.

A customer can have multiple recipients.

Recipient information can include:

- Recipient name
- Country
- Contact information
- Bank information
- Account details
- Currency information

This allows the same recipient to be used for future remittance transactions.

### 🏦 Bank Account Management

FundsRoute supports storing customer banking information required for the remittance workflow.

The database includes a dedicated:

```
bank_accounts
```

table.

The system architecture is designed to support:

- Bank account information
- Account type
- Account number
- IFSC information
- Bank name
- Account holder information
- Verification status

### 📊 Transaction Management

The application database includes a dedicated remittance transaction system.

The transaction architecture supports:

- Transaction amount
- Source currency
- Destination currency
- Exchange rate
- Transfer amount
- Transaction status
- Transaction timestamps
- Recipient information
- Status history

Transaction statuses are represented using a PostgreSQL enum.

A separate:

```
transaction_status_history
```

table is used to maintain transaction status changes.

---

## 🗄️ Database

FundsRoute uses PostgreSQL.

PostgreSQL is currently deployed on the same AWS EC2 instance as the Flask application.

Architecture:

```text
AWS EC2
│
├── Nginx
│
├── Gunicorn
│
├── Flask
│
└── PostgreSQL
```

PostgreSQL is not intended to be publicly exposed.

### 🧱 Database Structure

The current database contains the following major tables:

```text
users
│
├── user_profiles
├── user_contacts
├── user_addresses
├── kyc_records
├── bank_accounts
├── recipients
├── remittance_transactions
└── transaction_status_history
```

#### Main Tables

| Table | Purpose |
|---|---|
| users | Authentication and account status |
| user_profiles | Personal information |
| user_contacts | Email and phone information |
| user_addresses | Customer address information |
| kyc_records | KYC information and verification |
| bank_accounts | Customer bank account information |
| recipients | Remittance recipients |
| remittance_transactions | Money-transfer transactions |
| transaction_status_history | Transaction status history |

---

## 🏗️ Technology Stack

**Backend**
- Python
- Flask
- Flask-SQLAlchemy
- SQLAlchemy
- Gunicorn
- python-dotenv
- psycopg2

**Frontend**
- HTML5
- CSS3
- JavaScript
- Responsive UI

**Database**
- PostgreSQL

**Web Server**
- Nginx

**Application Server**
- Gunicorn

**Cloud**
- Amazon Web Services
- AWS EC2

**Operating System**
- Ubuntu Linux

---

## 🏛️ System Architecture

```text
                         INTERNET
                            │
                            ▼
                     ┌─────────────┐
                     │    NGINX    │
                     │   :80/443   │
                     └──────┬──────┘
                            │
                            ▼
                     ┌─────────────┐
                     │  GUNICORN   │
                     │   :5000     │
                     └──────┬──────┘
                            │
                            ▼
                     ┌─────────────┐
                     │    FLASK    │
                     │ APPLICATION │
                     └──────┬──────┘
                            │
                ┌───────────┼───────────┐
                │           │           │
                ▼           ▼           ▼
           PostgreSQL   Currency API   File Storage
              │
              ▼
       Remittance Database
```

---

## 📁 Project Structure

```text
FundsRoute/
│
├── app.py
├── config.py
├── requirements.txt
├── .env
├── .gitignore
│
├── database/
│   └── __init__.py
│
├── routes/
│   ├── auth.py
│   ├── customer.py
│   ├── send_money.py
│   └── admin.py
│
├── services/
│   └── currency_service.py
│
├── utils/
│   └── auth.py
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   └── register.html
│
├── templates/
│   │
│   ├── base.html
│   │
│   ├── admin/
│   │   ├── login.html
│   │   └── index.html
│   │
│   └── customer/
│       ├── base-customer.html
│       ├── dashboard.html
│       ├── profile.html
│       ├── settings.html
│       ├── send-money.html
│       ├── exchange-rates.html
│       ├── notifications.html
│       └── transactions.html
│
├── static/
│   │
│   ├── css/
│   │   ├── customer.css
│   │   ├── send-money.css
│   │   └── profile.css
│   │
│   └── js/
│       ├── dashboard.js
│       ├── session.js
│       └── send-money.js
│
└── uploads/
    └── kyc/
        ├── documents/
        └── selfies/
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/FundsRoute.git
```

Enter the project:

```bash
cd FundsRoute
```

### 🐍 2. Create Virtual Environment

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

### 📦 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 🗄️ 4. Configure PostgreSQL

Create the PostgreSQL database:

```sql
CREATE DATABASE remittance_app;
```

Create a dedicated database user:

```sql
CREATE USER fundsroute_user WITH PASSWORD 'YOUR_PASSWORD';
```

Grant permissions:

```sql
GRANT ALL PRIVILEGES ON DATABASE remittance_app TO fundsroute_user;
```

The application expects PostgreSQL to run locally on:

```
localhost:5432
```

### ⚙️ 5. Configure Environment Variables

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=remittance_app
DB_USER=fundsroute_user
DB_PASSWORD=YOUR_POSTGRES_PASSWORD

SECRET_KEY=YOUR_SECRET_KEY
```

Do not commit `.env` to GitHub.

### 🔒 6. Protect Environment File

On Linux:

```bash
chmod 600 .env
```

### ▶️ 7. Run the Application

Activate the virtual environment:

```bash
source venv/bin/activate
```

Start Flask:

```bash
python app.py
```

The application will be available at:

```
http://127.0.0.1:5000
```

---

## 🌐 Application Routes

### Public

- `/` — Homepage.
- `/register` — Customer registration.
- `/login` — Customer login.

### Customer Portal

- `/customer/` — Customer dashboard.
- `/customer/profile` — Customer profile.
- `/customer/settings` — Account settings.
- `/customer/send-money` — Send money.
- `/customer/exchange-rates` — Exchange rates.
- `/customer/transactions` — Transactions.

### Admin Portal

- `/admin/login` — Admin login.
- `/admin/` — KYC verification dashboard.

### API

Test database connection:

```
/api/test-db
```

Exchange rates:

```
/api/rates?base=INR
```

---

## 🔑 Authentication Flow

### Customer Registration

```text
Registration Form
       ↓
Validate Input
       ↓
Check Duplicate Account
       ↓
Create User
       ↓
Create Profile
       ↓
Create Contact
       ↓
Create Address
       ↓
Create KYC Record
       ↓
Create Bank Account
       ↓
Status = kyc_pending
```

### Admin Verification

```text
Admin Login
     ↓
Pending KYC List
     ↓
Review Customer
     ↓
Approve
     ↓
User Status = verified
     ↓
KYC Status = verified
```

### Customer Login

```text
Username + Password
        ↓
Find User
        ↓
Verify Password
        ↓
Check Status
        ↓
        ├── kyc_pending → Login Blocked
        │
        └── verified → Login Allowed
```

---

## 🔐 Security Considerations

The current prototype includes several security mechanisms:

- Password hashing
- Session authentication
- HTTP-only cookies
- SameSite cookies
- Database transactions
- PostgreSQL
- Environment-based configuration
- Restricted database exposure
- Nginx reverse proxy

However, this project is still under development.

Before production use, additional security measures are required, including:

- HTTPS
- CSRF protection
- Strong admin authentication
- Password policies
- Rate limiting
- Login attempt protection
- Secure KYC file serving
- File-type validation
- Malware scanning
- Encryption of sensitive financial data where appropriate
- Audit logging
- Proper secrets management
- Database backups
- Monitoring and alerting
- Production-grade authorization
- Compliance controls

---

## ☁️ AWS Deployment

FundsRoute is designed to run on an AWS EC2 instance.

Deployment architecture:

```text
                         AWS
                          │
                    ┌─────▼─────┐
                    │    EC2    │
                    │  Ubuntu   │
                    └─────┬─────┘
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
       Nginx          Gunicorn        PostgreSQL
       :80/:443        :5000             :5432
          │               │                │
          └───────────────┴────────────────┘
                          │
                        Flask
```

### ⚡ Gunicorn

Gunicorn is used as the production WSGI application server.

Example:

```bash
gunicorn \
    --workers 3 \
    --bind 127.0.0.1:5000 \
    app:app
```

### 🔄 Systemd Service

FundsRoute can run continuously using a systemd service.

Example service:

```ini
[Unit]
Description=FundsRoute Flask Application
After=network.target postgresql.service

[Service]
User=ubuntu
Group=www-data

WorkingDirectory=/home/ubuntu/FundsRoute

Environment="PATH=/home/ubuntu/FundsRoute/venv/bin"

ExecStart=/home/ubuntu/FundsRoute/venv/bin/gunicorn \
    --workers 3 \
    --bind 127.0.0.1:5000 \
    app:app

Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable:

```bash
sudo systemctl daemon-reload
sudo systemctl enable fundsroute
sudo systemctl start fundsroute
```

Check status:

```bash
sudo systemctl status fundsroute
```

### 🌍 Nginx

Nginx acts as the reverse proxy.

Example:

```nginx
server {

    listen 80;
    listen [::]:80;

    server_name _;

    location / {

        proxy_pass http://127.0.0.1:5000;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header X-Forwarded-For
            $proxy_add_x_forwarded_for;

        proxy_set_header X-Forwarded-Proto
            $scheme;
    }
}
```

Test configuration:

```bash
sudo nginx -t
```

Restart:

```bash
sudo systemctl restart nginx
```

### 🔥 Recommended AWS Security Group

The EC2 Security Group should expose only the required services.

| Port | Protocol | Purpose |
|---|---|---|
| 22 | TCP | SSH |
| 80 | TCP | HTTP |
| 443 | TCP | HTTPS |

PostgreSQL:

```
5432
```

should not be publicly exposed.

Gunicorn:

```
5000
```

should also not be publicly exposed.

Both should remain accessible only internally on the EC2 server.

---

## 🧪 Testing

Database connection:

```
/api/test-db
```

Expected response:

```json
{
    "success": true
}
```

Exchange rate:

```
/api/rates?base=INR
```

Registration:

```
/register
```

Admin:

```
/admin/login
```

---

## 🛣️ Development Roadmap

### Phase 1 — Foundation
- [x] Flask application
- [x] PostgreSQL database
- [x] Database schema
- [x] Environment configuration
- [x] Customer registration
- [x] Password hashing
- [x] Customer login
- [x] Session management

### Phase 2 — KYC
- [x] KYC registration
- [x] Document upload
- [x] Selfie upload
- [x] KYC pending state
- [x] Admin login
- [x] Admin KYC dashboard
- [x] KYC approval
- [x] KYC rejection
- [x] Verified-user login

### Phase 3 — Customer Portal
- [x] Customer dashboard
- [x] Profile
- [x] Settings
- [x] Exchange rates
- [x] Send Money UI
- [x] Transactions UI
- [ ] Complete recipient management
- [ ] Complete bank account management
- [ ] Notifications

### Phase 4 — Remittance Engine
- [ ] Recipient selection
- [ ] Currency selection
- [ ] Exchange-rate calculation
- [ ] Transfer-fee calculation
- [ ] Final amount calculation
- [ ] Transaction creation
- [ ] Transaction validation
- [ ] Transaction status management
- [ ] Transaction history
- [ ] Status history

### Phase 5 — Admin Portal
- [x] Admin authentication
- [x] KYC approval
- [x] KYC rejection
- [ ] Customer management
- [ ] Transaction management
- [ ] Transaction status updates
- [ ] Customer search
- [ ] Admin dashboard statistics
- [ ] Audit logs

### Phase 6 — Production Security
- [ ] HTTPS
- [ ] Secure admin authentication
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Secure file storage
- [ ] Secure KYC file access
- [ ] Database backups
- [ ] Monitoring
- [ ] Logging
- [ ] Secrets management

---

## 🔮 Future Development

Future versions of FundsRoute may include:

- Multi-currency support
- Real payment gateway integration
- International banking integrations
- Transfer tracking
- Automated transaction notifications
- Email notifications
- SMS notifications
- Two-factor authentication
- Advanced fraud detection
- Transaction risk scoring
- Exchange-rate locking
- Fee optimization
- Admin analytics
- Customer support system
- Mobile application
- API integrations
- Automated reconciliation
- Financial reporting

---

## ⚠️ Financial Compliance Disclaimer

FundsRoute is currently a software prototype.

It does not currently operate as a licensed money-transfer, banking, payment, or financial institution.

Actual deployment of an international remittance service would require appropriate legal, regulatory, financial, security, privacy, KYC/AML, payment-processing, and licensing requirements to be addressed in the relevant jurisdictions.

**No real-money transactions should be processed through this prototype unless and until all applicable requirements have been independently satisfied.**

---

## 🤝 Contributing

Contributions are welcome.

To contribute:

```bash
git clone https://github.com/YOUR_USERNAME/FundsRoute.git
cd FundsRoute
```

Create a branch:

```bash
git checkout -b feature/your-feature
```

Make your changes and commit:

```bash
git add .
git commit -m "Add your feature"
```

Push:

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

## 🐛 Issues

If you find a bug or have a feature request, please create an issue in the GitHub repository.

When reporting a bug, include:

- Operating system
- Python version
- PostgreSQL version
- Error message
- Steps to reproduce
- Relevant logs

**Never upload passwords, API keys, database credentials, KYC documents, or other sensitive information to an issue.**

---

## 📄 License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abhinandan Roy**

---

## ⭐ Project

**FundsRoute — One India to Global Remittance**

*Building a simple digital route for global money movement.*

---

## 🚀 Current Status

FundsRoute currently has the core application foundation in place:

```text
                    FUNDSROUTE
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
    CUSTOMER          ADMIN            SYSTEM
        │               │                │
        │               │                │
    Register         KYC Review      PostgreSQL
        │               │                │
        ▼               ▼                ▼
       KYC            Approve          Currency
        │               │                │
        ▼               ▼                ▼
      Login           Users          Transactions
        │
        ▼
   Dashboard
        │
        ├── Profile
        ├── Settings
        ├── Exchange Rates
        ├── Send Money
        └── Transactions
```

The next major development milestone is completing the backend remittance transaction engine, connecting the existing Send Money interface to recipients, exchange rates, fees, and the PostgreSQL transaction system.
