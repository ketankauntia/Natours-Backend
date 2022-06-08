# Natours-Backend
Built a restfull api with CRUD operations using mongoDb and mongoose. Server side rendering with Pug template and authentication added to data stored via encrypting it.

- To run, connect to the database cluster
- Install all node modules using : npm i
- Now start the project using : npm start

![image](https://user-images.githubusercontent.com/44080191/172593334-9f714660-2b35-4754-90cb-4287672d616b.png)

-login credentials :

admin@natours.io
test1234

login screen :
![Screenshot (105)](https://user-images.githubusercontent.com/44080191/172594221-790bce01-63b2-41f7-ba6b-27cb2875af80.png)

To book a tour, select a tour, and go to the bottom of the tour and click on "BOOK TOUR NOW".
It will be processed and you will be taken to stripe checkout,

dev card number : 4242 4242 4242 4242 [only this will work on development server]

![image](https://user-images.githubusercontent.com/44080191/172595307-d1e59303-9693-4ebe-a458-e906703f5218.png)

after sucessfull booking, Go to account and check under bookings, the booking will be shown there :)


## add config.env file to the project to run.
contains :

<!-- NODE_ENV = development
PORT=3000
DATABASE_PASSWORD = 
DATABASE=

JWT_SECRET=
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_HOST=
EMAIL_PORT=

EMAIL_FROM=

SENDGRID_USERNAME=
SENDGRID_PASSWORD=

STRIPE_SECRECT_KEY= -->



--- x ----

