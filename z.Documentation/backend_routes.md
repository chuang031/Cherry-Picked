# API-Routes

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

##  Profile
* A logged in customer or brand user can create, view, or edit their profile.
  * `POST /api/users`
  * `GET /api/users`
  * `PUT /api/users/:userId`
  * `DELETE /api/users/:userId`



## Products

* A logged in brand user can get, create, edit or delete a product post with visible confirmation without causing a refresh/redirect.
  
  * `POST /api/products`
  * `GET /api/products`
  * `PUT /api/products/:productId`
  * `DELETE /api/products/:productId`

## Reviews

* A logged in customer user can get, create, edit or delete a review with visible confirmation without causing a refresh/redirect.
  
  * `POST /api/reviews`
  * `GET /api/reviews`
  * `PUT /api/reviews/:reviewId`
  * `DELETE /api/reviews/:reviewId`

## Following/Followers
  * `GET /api/followers` current user viewing their followers
  * `GET /api/following` current user viewing their following
  * `GET /api/users/:userId/followers` view anothers user's followers list
  * `GET /api/users/:userId/following` view another user's following list

  * `POST /api/followers/:userId` add a follower
  * `DELETE /api/followers/:userId` delete a follower