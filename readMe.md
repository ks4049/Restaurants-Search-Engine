## Restaurant Search Engine

We developed a search engine for restaurants using the Zomato restaurants dataset at Kaggle. Handled large datasets using MongoDB and deployed the data onto mLab cloud. In this application, the user can make multiple search requests and filter his search by choosing one of the filter types such as country, nearby restaurants, Cuisine types, etc. Also implemented geospatial queries to show the nearby restaurants and integrating with googleMaps API to show the location of the restaurant.  
#### Tech Stack: <MongoDB (mLab), NodeJS, HTML, JavaScript, jQuery/>

### Requirements

- Install Node on your system using the following command for MacOS:
```
brew install node
```
- Type in the following command in Terminal to check the Node and NPM version
```
node -v
npm -v
```

- Set Url in the server.js file as follows:

#### To connect to the mLab cloud database service:
```
mongodb+srv://<username>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority

```
OR
#### To connect to the local mongo data:
Import the data folder to your local mongo server.
```
mongodb://localhost:27017/project
mongodb://localhost:27017/gridfs
```
	
### Steps to run:
Clone the repository and change directory to the cloned repository.
```
git clone https://github.com/ks4049/Restaurants-Search-Engine.git
cd Restaurants-Search-Engine/krtmongoproject
```
Install the dependencies required for the application.
```
npm install
```

#### Command to run the server:
```
npm start
```

#### Command to run the application on your local machine:
```
localhost:3000
```

