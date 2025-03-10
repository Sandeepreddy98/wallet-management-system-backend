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
| **POST** | `/api/wallet/create` | ```json { "name": "John Doe", "balance": 1000 } ``` | ```json { "success": true, "wallet": { "_id": "wallet123", "name": "John Doe", "balance": 1000 } } ``` |

---

### **2️⃣ Get Wallet by ID**
| Method | Endpoint | Request Params | Response |
|--------|---------|----------------|----------|
| **GET** | `/api/wallet/:id` | `walletId` in URL path | ```json { "wallet": { "_id": "wallet123", "name": "John Doe", "balance": 1000 } } ``` |

---

### **3️⃣ Credit/Debit a Wallet**
| Method | Endpoint | Request Body | Response |
|--------|---------|--------------|----------|
| **POST** | `/api/wallet/transact` | ```json { "walletId": "wallet123", "amount": 200, "type": "CREDIT" } ``` | ```json { "success": true, "wallet": { "_id": "wallet123", "balance": 1200 } } ``` |

---

### **4️⃣ Get Transactions (with Pagination & Sorting)**
| Method | Endpoint | Query Params | Response |
|--------|---------|--------------|----------|
| **GET** | `/api/transact` | `?walletId=wallet123&page=1&limit=10&sort=amount` | ```json { "transactions": [ { "amount": 200, "type": "CREDIT", "balance": 1200, "createdAt": "2025-03-10T15:52:23.391Z" } ] } ``` |

---

### **5️⃣ Export Transactions as CSV**
| Method | Endpoint | Query Params | Response |
|--------|---------|--------------|----------|
| **GET** | `/api/transact/export` | `?walletId=wallet123` | A **CSV file download** containing transactions |

---

## 🔧 **Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/wallet-management-system.git
cd wallet-management-system
