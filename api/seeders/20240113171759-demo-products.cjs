'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Amul Taaza',
        packsize: "500ml",
        categoryId: 1,
        MRP: 27,
        image: '/product/images/amul-taaza-milk.jpg',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gokul Cow',
        packsize: "500ml",
        categoryId: 1,
        MRP: 27,
        image: '/product/images/gokulcowmilk.webp',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shimla Apples',
        packsize: "1 kg",
        categoryId: 2,
        MRP: 150,
        image: '/product/images/shimla-apple.jpg',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
