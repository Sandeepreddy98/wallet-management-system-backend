# Wallet Management System - API Documentation

This is a **Node.js Express API** for managing user wallets, transactions (credit/debit), and exporting transaction history.

---

## 🚀 Features
- ✅ Create and Manage Wallets
- ✅ Credit/Debit Transactions
- ✅ Fetch Transactions with Pagination & Sorting
- ✅ Export Transactions as CSV

---

## 🛠️ **Tech Stack**
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Database:** MongoDB Atlas
---

## 📌 **API Endpoints**

### **1️⃣ Create a Wallet**
| Method | Endpoint | Request Body | Response |
|--------|---------|--------------|----------|
| **POST** | `/api/wallet/setup` | ```json { "name": "John Doe", "balance": 1000 } ``` | ```json {"_id": "67cf3dc492f273e6e28eeb53", "balance": 1000,"name": "Sandep","date": "2025-03-10T19:30:12.383Z"} ``` |

---

### **2️⃣ Get Wallet by ID**
| Method | Endpoint | Request Params | Response |
|--------|---------|----------------|----------|
| **GET** | `/api/wallet/:id` | `walletId` in URL path |  ```json {"_id": "67cf3dc492f273e6e28eeb53", "balance": 1000,"name": "Sandep","date": "2025-03-10T19:30:12.383Z"} ``` |

---

### **3️⃣ Credit/Debit a Wallet**
| Method | Endpoint | Request Body | Response |
|--------|---------|--------------|----------|
| **POST** | `/api/transact/:walletId` | ```json {"amount": 200, "type": "CREDIT" } ``` | ```json "balance":1200,"transactionId":"67cf3f3692f273e6e28eeb62" ``` |

---

### **4️⃣ Get Transactions (with Pagination & Sorting)**
| Method | Endpoint | Query Params | Response |
|--------|---------|--------------|----------|
| **GET** | `/api/transact` | `?walletId=wallet123&page=1&limit=10&sort=amount` | ```[ {"_id": "67cf3f3692f273e6e28eeb62","walletId": "67cf3dc492f273e6e28eeb53","amount": 100, "balance": 1200,"type": "CREDIT","createdAt": "2025-03-10T19:36:22.036Z","updatedAt": "2025-03-10T19:36:22.036Z",}] } ``` |

---
