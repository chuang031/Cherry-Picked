# User-facing routes

## `/login`

### Log in page

This page displays a log in form

* `GET /login`
* `POST /login`

## `/signup`

This page displays a signup form.

### Sign up page

* `GET /signup`
* `POST /signup`

##  Discover feed/ Splash/Home Page
This page displays a product feed if user is logged in, as well as a navigation bar with login/signup or logout buttons. If the user is not logged in, they will be taken to a splash/home page.

* `GET /`

## `/:username`

This page displays a users profile as well as their follwers and following list. If the logged in user owns the profile, this page also displays an update and delete button.


 * `GET /:username/followers`
 * `GET /:username/following`
 * `PUT /:username`
 * `DELETE /:username`

## `/products`

This page displays a form with which a logged in brand user can create a product, as well as a navigation bar with login/signup or logout buttons.

  * `POST /products`
  * `GET /products`
products
## `/products/:productId`

This page displays an individual product as well as a navigation bar with login/signup or logout buttons. If the logged in brand user owns the product, this page also displays an update and delete button.

* `GET /products/:productId`
* `PUT /products/:productId`
* `DELETE /products/:productId`

## `/reviews`

This page displays a form with which a logged in customer user can create a review, as well as a navigation bar with login/signup or logout buttons.

  * `POST /reviews`
  * `GET /reviews`
products
## `/reviews/:reviewId`

This page displays an individual review as well as a navigation bar with login/signup or logout buttons. If the logged in brand user owns the review, this page also displays an update and delete button.

* `GET /reviews/:reviewId`
* `PUT /reviews/:reviewId`
* `DELETE /reviews/:reviewId`