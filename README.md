# Wrike Email To Task Link Translator

For when you recieve an email with a wrike task cc'd to it and you want to quickly get to the task.
For example, if you had an email with a cc'd task like `wrike+123456789@wrike.com`, this tool would translate it into a url
such as `https://www.wrike.com/open.htm?id=123456789`.


## What's In Here?
Google Apps Script code that can be used to translate Wrike email links to Wrike task links as an active add-on for Google Workspace.
- (TODO) A Rust script that can be used to translate Wrike email links to Wrike task links.
-- Lives on your path, so you can use it from the command line. Copies the new url to your clipboard automatically.\


## Installation
### Google Apps Script
1. This lives in Google Workspace as an extention, which you can download [here](https://workspace.google.com/marketplace/app/wrik)

#### Deploy / Use Yourself
In order to deploy this yourself, follow [this guide](https://developers.google.com/workspace/add-ons/quickstart/cats-quickstart) 
to set up your project. Just copy and paste the code & you're good to go.


### [Rust] Terminal Script
TODO

