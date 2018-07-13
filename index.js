exports.handler = event => {
    const request = require('request');
    const githubEvent = JSON.parse(event.Records[0].Sns.Message);
    const gitFork = githubEvent.repository.owner.name;
    const refSplit = githubEvent.ref.split("/");
    const refScope = refSplit[1];
    const gitRef = refSplit[2];
    const templateURL = process.env.TEMPLATE_URL;
    const awxToken = process.env.AWX_TOKEN;

    console.log('Received GitHub event for: '+githubEvent);
    if (refScope === 'tags' || gitRef === 'develop') {
        const postData =  {
            "extra_vars": {
                target_user: gitFork,
                target_ref: gitRef
            }
        };
        const clientServerOptions = {
            uri: templateURL,
            auth: {
                'bearer': awxToken
            },
            body: JSON.stringify(postData),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        request(clientServerOptions, (error, response) => {
            console.log(error, response.body);
            return;
        });
    }
    else {
        // Not a new tag push
        return;
    };
};
