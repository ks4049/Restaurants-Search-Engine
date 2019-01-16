
Step 1: Install NodeJS in the system
	
Step 2: Install the required npm packages:
	1. npm install express
	2. npm install body-parser
	3. npm install ejs-lint
	4. npm install mongodb
	5. npm install mongoose
	6. npm install grids-stream
	7. npm install base64-stream

Step 3: Set Url in the server.js file as follows:

	To connect to the mLab cloud database service:
	mongodb://ks4049:project123@ds227332.mlab.com:27332/project"
	mongodb://ks4049:project123@ds157493.mlab.com:57493/gridfs"
		
	OR

	To connect to the local mongo data:
	mongodb://localhost:27017/project
	mongodb://localhost:27017/gridfs
	
Step 4: Go into the "krtmongoproject" directory in the command prompt
	
Step 5: Run the server.js file with following command
	node server.js

Step 6: Open the browser and enter the url as "localhost:3000"


