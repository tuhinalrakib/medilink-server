/**
 * doctor-appointment-backend/
│── src/
│   ├── config/
│   │   ├── db.js            # MongoDB connection
│   │   ├── redis.js         # Redis connection
│   │   └── env.js           # Environment variables
│   │
│   ├── controllers/
│   │   ├── authController.js        # Login, register, logout
│   │   ├── doctorController.js      # Doctor CRUD & listing
│   │   └── appointmentController.js # Appointment CRUD
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js        # JWT auth & role check
│   │   └── errorMiddleware.js       # Error handling
│   │
│   ├── models/
│   │   ├── User.js                  # Doctor/Patient schema
│   │   ├── Appointment.js
│   │   └── Specialization.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── appointmentRoutes.js
│   │
│   ├── utils/
│   │   ├── generateToken.js         # JWT generation
│   │   ├── setCookie.js             # Cookie helper
│   │   └── validateRequest.js       # Input validation
│   │
│   └── server.js                    # Express app entry
│
├── .env                             # DB URI, JWT secret, etc.
├── package.json
└── package-lock.json

 */