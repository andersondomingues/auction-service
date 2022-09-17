# new project
sls create --name auction-service --template-url https://github.com/codingly-io/sls-base

# simple deploy
sls deploy --verbose

# deploy only a single function (requires function to be deployed once)
sls deploy --function hello

# remove the entire stack
sls remove