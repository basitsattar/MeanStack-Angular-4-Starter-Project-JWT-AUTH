# MeanStack-Angular-4-Starter-Project-JWT-AUTH
Starter Project for Express and Angular4 with JWT Authentication and signup.

This is a simple MeanStack with Angular4 project with JWT Authentication. You can use it as a sarter project. I have add 
very minimal styles and functionality. 

The client directory is the angular4 directory generated using angular cli and all angular cli commnads will work inside this directory.

ng build will generate output in the public folder of root directory and express will server those static files.

I have used absolute urls in angular service so that you can use angular-cli's own ng serve command too and can run both express and
angular servers separately during development if you want. Just remember to change those absolute urls before final build.

To run this project

Clone this git repo

Go to main folder and run 

npm start

or nodemon if you have that. It'll start express server.

Now, go to client directory

cd client 

ng serve

make sure you have mongo installed and running locally. Else just change database url in env.js file in config folder.

That's it. Happy Coding.
