# wwire

## Instructions
In order to make this application run be sure to download and install Docker and Docker Compose. 

[Docker](https://docs.docker.com/install/)

[Docker-Compose](https://docs.docker.com/compose/install/)

Once installed run the following commands when your at the root directory of this project. __The webApp will run on port 3000 and the backEnd service on port 5000__.

`docker-compose build`

`docker-compose up -d`

*to confirm that the containers are running:*

`docker ps -a`

*open up the your "last version" browser and go to:*

"http://localhost:3000" 


[clientApp](http://localhost:3000)

*if you wanna stop the containers*

`docker-compose down`

## Notes
This simple client solution could be extend to whatever granularity deemed necessary. A table was created in order to display the content of the text file once it was parsed by the backend. The data could have been dumped into a database or some type of search tool __(ElasticSearch)__ for optimization in regards to pure query methods but again this a scunk-works project to help better determine what tools should be used to solve this type of problem.