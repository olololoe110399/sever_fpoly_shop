const express = require ('express');
const router = express.Router ();
const controller = require ('../controllers/admin');
const {ensureAuthenticated, forwardAuthenticated} = require ('../config/auth');
const controllerCustomer = require ('../controllers/customer');
const controllerProduct = require ('../controllers/product');

// Page
router.get ('/sign_in', forwardAuthenticated, controller.getSigninPage);
router.get ('/sign_up', forwardAuthenticated, controller.getSignupPage);

//Handle Sign up
router.post ('/sign_up', controller.postSignup);
//Handle Sign in
router.post ('/sign_in', controller.postSignin);
//Handle Log out
router.get ('/log_out', ensureAuthenticated, controller.getLogOut);
module.exports = router;
router.get ('/dashboard', ensureAuthenticated, (req, res) => {
  res.render ('dashboard', {activeDashboard: true, user: req.user.toJSON()});
});
// Customer
router.get ('/customers', ensureAuthenticated, controllerCustomer.getCustomers);
router.get (
  '/customer-add',
  ensureAuthenticated,
  controllerCustomer.getCustomerCreatPage
);
router.post (
  '/customer-add',
  ensureAuthenticated,
  controllerCustomer.postCustomer
);
router.get (
  '/customer-delete-:id',
  ensureAuthenticated,
  controllerCustomer.getDeleteCustomer
);
router.get (
  '/customer-edit-:id',
  ensureAuthenticated,
  controllerCustomer.getCustomerEditPage
);
router.post (
  '/customer-edit-:id',
  ensureAuthenticated,
  controllerCustomer.postCustomerEdit
);
// produt
router.get ('/products', ensureAuthenticated, controllerProduct.getProducts);
router.get (
  '/product-add',
  ensureAuthenticated,
  controllerProduct.getProductCreatePage
);
router.post (
  '/product-add',
  ensureAuthenticated,
  controllerProduct.postProductCreate
);
router.get (
  '/product-edit-:id',
  ensureAuthenticated,
  controllerProduct.getProductEditPage
);
router.post (
  '/product-edit-:id',
  ensureAuthenticated,
  controllerProduct.postProductEdit
);
router.get ('/product-delete-:id', controllerProduct.getDeleteProduct);
// map
router.get ('/maps', ensureAuthenticated, (req, res) =>
  res.render ('maps', {
    activeMap: true,
    user: req.user.toJSON(),
  })
);

//profile
router.get ('/profile', ensureAuthenticated, controller.getProfile);
router.post ('/profile', ensureAuthenticated, controller.postProfile);
