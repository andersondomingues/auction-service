# ===== Useful Serverless Commands =====

# TODO: update commands for Node 16 

# new project (from the base template, Node 12)
# can replace the URL to point to this repo if using Node 16
sls create --name auction-service --template-url https://github.com/codingly-io/sls-base

# simple deploy, enable verbose to show commands step-by-step 
sls deploy --verbose

# deploy only a single function (requires function to be deployed once)
sls deploy --function hello

# remove the entire stack
sls remove

# tailing logs for a single function
sls logs --function processAuctions -t