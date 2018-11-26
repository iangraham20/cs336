<dbuser> == igc2

To connect using the mongo shell:
mongo ds217350.mlab.com:17350/cs336 -u <dbuser> -p <dbpassword>
To connect using a driver via the standard MongoDB URI:
mongodb://<dbuser>:<dbpassword>@ds217350.mlab.com:17350/cs336

install mongo:
npm install mongodb@2.2.19 --save

Terminal command for setting the password:
export MONGO_PASSWORD=''

Terminal command for checking the current password:
printenv| grep MONGO
