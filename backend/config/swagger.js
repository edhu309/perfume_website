const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Scentra Perfume API",
      version: "1.0.0",
      description: "API documentation for Scentra perfume e-commerce backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            token: { type: "string" },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            image: { type: "string" },
            category: { type: "string", enum: ["woody", "fresh", "oriental", "floral", "citrus", "spicy"] },
          },
        },
        CartItem: {
          type: "object",
          properties: {
            product: { $ref: "#/components/schemas/Product" },
            quantity: { type: "integer" },
          },
        },
        Cart: {
          type: "object",
          properties: {
            _id: { type: "string" },
            user: { type: "string" },
            items: { type: "array", items: { $ref: "#/components/schemas/CartItem" } },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            user: { type: "string" },
            items: { type: "array", items: { $ref: "#/components/schemas/CartItem" } },
            totalPrice: { type: "number" },
            status: { type: "string", enum: ["pending", "processing", "shipped", "delivered", "cancelled"] },
          },
        },
      },
    },
    paths: {
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: { type: "string", example: "John Doe" },
                    email: { type: "string", example: "john@example.com" },
                    password: { type: "string", example: "password123" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "User registered successfully" },
            400: { description: "Bad request" },
          },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login user and return JWT",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", example: "john@example.com" },
                    password: { type: "string", example: "password123" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Login successful" },
            401: { description: "Invalid credentials" },
          },
        },
      },
      "/api/auth/make-admin": {
        post: {
          tags: ["Auth"],
          summary: "Promote a user to admin (TEMPORARY, REMOVE IN PRODUCTION)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: { type: "string", example: "admin@example.com" }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "User promoted to admin" },
            404: { description: "User not found" },
            500: { description: "Server error" }
          }
        }
      },
      "/api/products": {
        get: {
          tags: ["Products"],
          summary: "Get all products",
          parameters: [
            { name: "category", in: "query", schema: { type: "string" }, description: "Filter by category" },
          ],
          responses: {
            200: { description: "List of products" },
          },
        },
      },
      "/api/products/{id}": {
        get: {
          tags: ["Products"],
          summary: "Get product by ID",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: { description: "Product details" },
            404: { description: "Product not found" },
          },
        },
      },
      "/api/cart": {
        get: {
          tags: ["Cart"],
          summary: "Get user's cart",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Cart details" },
            401: { description: "Unauthorized" },
          },
        },
      },
      "/api/cart/add": {
        post: {
          tags: ["Cart"],
          summary: "Add item to cart",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["productId"],
                  properties: {
                    productId: { type: "string" },
                    quantity: { type: "integer", default: 1 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Item added to cart" },
            401: { description: "Unauthorized" },
          },
        },
      },
      "/api/cart/update": {
        put: {
          tags: ["Cart"],
          summary: "Update cart item quantity",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["productId", "quantity"],
                  properties: {
                    productId: { type: "string" },
                    quantity: { type: "integer" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Cart updated" },
            401: { description: "Unauthorized" },
          },
        },
      },
      "/api/cart/remove": {
        delete: {
          tags: ["Cart"],
          summary: "Remove item from cart",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["productId"],
                  properties: {
                    productId: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Item removed" },
            401: { description: "Unauthorized" },
          },
        },
      },
      "/api/orders": {
        post: {
          tags: ["Orders"],
          summary: "Create order from cart",
          security: [{ bearerAuth: [] }],
          responses: {
            201: { description: "Order created" },
            400: { description: "Cart is empty" },
            401: { description: "Unauthorized" },
          },
        },
        get: {
          tags: ["Orders"],
          summary: "Get user's orders",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "List of orders" },
            401: { description: "Unauthorized" },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
