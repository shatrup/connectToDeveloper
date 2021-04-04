### connectToDeveloper
This is web based application to connect developer profile. This project use MERN Stack and including REDUX.

### This project is host on heroku platform , You can see output of the project.
url is https://mysterious-crag-14705.herokuapp.com/

### How to start the project
step 1 : pull the project

### Install all node modules
step 2 : npm install 

### Connect mogoDB with credentials
Add one file in config folder with key_dev.js and put your mongoDB credentials and secret or Key

### key_dev.js content

module.exports = {
  mongoURI: "Your mongo DB URL ",
  secretOrKey: "Your mongoDB secret key"
};

### First, create an .env file in the root of your project, i.e. where you would run react-scripts start (or yarn start) outside of your src folder.

Then, add 
GITHUB_CLIENT_ID = '5426233' like this
GITHUB_CLIENT_SECRET = '2sd58f4gd66vf4' like this

### Build and run the Project
npm run dev



