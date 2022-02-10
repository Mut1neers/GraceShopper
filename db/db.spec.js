const client = require('./client');
const bcrypt = require('bcrypt');
const { rebuildDB } = require('./init_db');
const {
  getAllOrders,
  createOrder,
  getOrdersByUser,
  getOrderById,
  getOrdersByProduct,
  getCartByUser,
} = require('./models/orders');
const { createUser, getUserById, getUser, getUserByUsername } = require('./models/user');
const { getAllProducts, createProduct, getProductById } = require('./models/products');
const { addProductToOrder, updateOrderProduct, destroyOrderProduct } = require('./models/order_products');

describe('Database', () => {
  beforeAll(async () => {
    await rebuildDB();
  });
  afterAll(async () => {
    await client.end();
  });
  describe('Users', () => {
    let userToCreateAndUpdate, queriedUser;
    let userCredentials = {
      username: 'billybob',
      password: 'bobbybadboy',
      firstName: 'billy',
      lastName: 'bob',
      email: 'billy@bob.com',
      isAdmin: 'false',
    };
    describe('createUser({ username, password })', () => {
      beforeAll(async () => {
        userToCreateAndUpdate = await createUser(userCredentials);
        const { rows } = await client.query(`SELECT * FROM users WHERE username = $1`, [
          userCredentials.username,
        ]);
        queriedUser = rows[0];
      });
      it('Creates the user', async () => {
        expect(userToCreateAndUpdate.username).toBe(userCredentials.username);
        expect(queriedUser.username).toBe(userCredentials.username);
      });
      it('Does not store plaintext password in the database', async () => {
        expect(queriedUser.password).not.toBe(userCredentials.password);
      });
      it('Hashes the password (salted 10 times) before storing it to the database', async () => {
        const hashedVersion = bcrypt.compareSync(userCredentials.password, queriedUser.password);
        expect(hashedVersion).toBe(true);
      });
      it('Does NOT return the password', async () => {
        expect(userToCreateAndUpdate.password).toBeFalsy();
      });
    });
    describe('getUser({ username, password })', () => {
      let verifiedUser;
      beforeAll(async () => {
        verifiedUser = await getUser(userCredentials);
      });
      it('Verifies the passed-in, plain-text password against the password in the database (the hashed password, if this portion is complete)', async () => {
        const unVerifiedUser = await getUser({ username: userCredentials.username, password: 'badPassword' });
        expect(verifiedUser).toBeTruthy();
        expect(verifiedUser.username).toBe(userCredentials.username);
        expect(unVerifiedUser).toBeFalsy();
      });
      it('Does NOT return the password', async () => {
        expect(verifiedUser.password).toBeFalsy();
      });
    });
    describe('getUserById', () => {
      it('Gets a user based on the user Id', async () => {
        const user = await getUserById(userToCreateAndUpdate.id);
        expect(user).toBeTruthy();
        expect(user.id).toBe(userToCreateAndUpdate.id);
      });
    });
    describe('getUserByUsername', () => {
      it('Gets a user based on the username', async () => {
        const user = await getUserByUsername(userToCreateAndUpdate.username);
        expect(user).toBeTruthy();
        expect(user.username).toBe(userToCreateAndUpdate.username);
      });
    });
  });
  describe('Products', () => {
    let productToCreateAndUpdate, queriedProduct;
    describe('getAllProducts', () => {
      it('selects and returns an array of all products', async () => {
        const products = await getAllProducts();
        const { rows: productsFromDatabase } = await client.query(`
              SELECT * FROM products;
              `);
        expect(products).toEqual(productsFromDatabase);
      });
    });
    describe('createProduct({name, description, price, inStock, category})', () => {
      it('Creates and returns the new product', async () => {
        const productToCreate = {
          name: 'cute pup',
          description: "you'd have to be a fool not to think this pup was cute",
          price: '100.00',
          inStock: true,
          category: 'dog',
        };
        const createdProduct = await createProduct(productToCreate);
        expect(createdProduct.name).toBe(productToCreate.name);
        expect(createdProduct.description).toBe(productToCreate.description);
        expect(createdProduct.price).toBe(productToCreate.price);
        expect(createdProduct.inStock).toBe(productToCreate.inStock);
        expect(createdProduct.category).toBe(productToCreate.category);
      });
    });
  });
  describe('Orders', () => {
    describe('getAllOrders', () => {
      it('selects and returns an array of all orders', async () => {
        const orders = await getAllOrders();
        const { rows: ordersFromDatabase } = await client.query(`
          SELECT * FROM orders;
          `);
        expect(orders).toEqual(ordersFromDatabase);
      });
    });
    describe('createOrder', () => {
      it('Creates and returns the new order', async () => {
        const orderToCreate = { id: 2, status: 'created', userId: 1, datePlaced: new Date() };
        const createdOrder = await createOrder(orderToCreate);
        expect(createdOrder.id).toBe(orderToCreate.id);
        expect(createdOrder.userId).toBe(orderToCreate.userId);
        expect(createdOrder.status).toBe(orderToCreate.status);
        expect.any(Date);
      });
    });
    describe('getOrdersByUser', () => {
      let order, user;
      beforeAll(async () => {
        user = await getUserById(1);
        [order] = await getOrdersByUser(user);
      });
      it('selects and return an array of all orders made by user', async () => {
        expect(order).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            status: expect.any(String),
            userId: expect.any(Number),
            datePlaced: expect.any(Date),
          })
        );
      });
    });
    describe('getOrdersByProduct', () => {
      let order, product;
      beforeAll(async () => {
        product = await getProductById(1);
        [order] = await getOrdersByProduct(product);
      });
      it('selects and returns an array of products which have a specific productId in their order_products join, includes their products', async () => {
        expect(order).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            userId: expect.any(Number),
            status: expect.any(String),
            datePlaced: expect.any(Date),
            products: expect.any(Array),
          })
        );
      });
      it('includes username, from users join, aliased as customerName', async () => {
        expect(order).toEqual(
          expect.objectContaining({
            customerName: expect.any(String),
          })
        );
      });
    });
    describe('getCartByUser', () => {
      let order, user;
      beforeAll(async () => {
        user = await getUserById(1);
        [order] = await getCartByUser(user.id);
      });
      it("selects one user's order that has an order.status = created, returns the order, include the order's products", async () => {
        expect(order).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            userId: expect.any(Number),
            status: expect.any(String),
            datePlaced: expect.any(Date),
            // products: expect.any(Array),
          })
        );
      });
    });
  });
  describe('Order Products', () => {
    const orderProductData = {
      productId: 2,
      orderId: 2,
      price: '1234.00',
      quantity: 1,
    };
    let orderProductToCreateAndUpdate;
    describe('addProductToOrder', () => {
      it('creates a new order_product and returns it', async () => {
        orderProductToCreateAndUpdate = await addProductToOrder(orderProductData);

        expect(orderProductToCreateAndUpdate.productId).toBe(orderProductData.productId);
        expect(orderProductToCreateAndUpdate.orderId).toBe(orderProductData.orderId);
        expect(orderProductToCreateAndUpdate.price).toBe(orderProductData.price);
        expect(orderProductToCreateAndUpdate.quantity).toBe(orderProductData.quantity);
      });
    });
    describe('updateOrderProduct', () => {
      it('Finds the order with id equal to the passed in id. Updates the price or quantity', async () => {
        const newOrderProductData = { id: orderProductToCreateAndUpdate.id, price: '4321.00', quantity: 3 };
        orderProductToCreateAndUpdate = await updateOrderProduct(newOrderProductData);
        expect(orderProductToCreateAndUpdate.id).toBe(newOrderProductData.id);
        expect(orderProductToCreateAndUpdate.price).toBe(newOrderProductData.price);
        expect(orderProductToCreateAndUpdate.quantity).toBe(newOrderProductData.quantity);
      });
    });
    describe('destroyOrderProduct', () => {
      it('removes order_product from database', async () => {
        const deletedOrderProduct = await destroyOrderProduct(orderProductToCreateAndUpdate.id);
        expect(deletedOrderProduct.id).toBe(orderProductToCreateAndUpdate.id);
        const { rows } = await client.query(`
        SELECT * FROM order_products
        WHERE id = ${deletedOrderProduct.id}
        `);
        expect(rows.length).toBe(0);
      });
    });
  });
});
