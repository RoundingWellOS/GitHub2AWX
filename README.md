# GitHub 2 AWX

## Purpose
This tool originated as a way for us to utilize Ansible AWX to automate code builds in our primary code repository.While we use an `after_success` block in our `.travis.yml` configuration for pull request builds, we needed a solution that would also build develop after commits were merged and any release builds.

## Configuration
There are 2 required environment variables.
    1. TEMPLATE_URL - URL to the AWX job template you want to call ie. https://<awx-server>/api/v2/job_templates/<template-number>/launch/
    2. AWX_TOKEN - The Oauth token used to access the AWX API. See AWX's [docs](https://github.com/ansible/awx/blob/devel/docs/auth/oauth.md).

Additionally, your payloads may require different extra_vars. Update the `postData` object in `index.js` to reflect your environment's needs.

We're using the Amazon SNS service in GitHub. got to https://github.com/<user>/<repo>/settings/installations and select the drop-down next to Services to add the Amazon SNS service.

See the blog post [Dynamic GitHub Actions with AWS Lambda](https://aws.amazon.com/blogs/compute/dynamic-github-actions-with-aws-lambda/) from Amazon for instructions on configuring the service and creating your Lambda function.

## Installation    
After you've cloned this repository,
1. Run `npm install`
2. Type `node_modules/node-lambda/bin/node-lambda setup` to create the .env and configuration files for the node-lambda module.
3. Type Type `node_modules/node-lambda/bin/node-lambda run` to test your package.
4. Type `node_modules/node-lambda/bin/node-lambda package` to build your deploy package
5. Type `node_modules/node-lambda/bin/node-lambda deploy` to deploy your package.

For more infomration, see the node-lambda [README](https://github.com/motdotla/node-lambda/blob/master/README.md)

## Test data
The test-data directory contains a few data examples of GitHub SNS events for testing.