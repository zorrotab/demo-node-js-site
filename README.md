# demo-node-js-site

## Overview

Current used versions:
 - Node JS: v22.19.0
 - Express
 - NPM: 10.9.3
 - NVM: v0.40.3

## Requirements

```sh
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Use nvm to install latest version or a specific version
nvm install --lts

# Verify nodejs and npm are installed
node -v
npm -v

# Alternative: install nodejs and npm via package manager
sudo apt update
sudo apt install nodejs npm

# Install additional node js modules
npm install express
npm install body-parser
npm install ejs
```

## Changes planned

The website currently allows one to put numbers in two text boxes and run an add, substract, multiply or divide on it and see the result.

The current change is to add a button that toggles a feature to save the result and make it show up again in the first text box for doing several calculations together. I have added the button and clicking it changes a value between 0 and 1 in a text file. Need to do the following:
1. Make the button highlight or not based on the value in the text file
2. Refactor and clean up the code. See if I can add functions.
3. Implemenet the feature that the result gets returned to the first text field.

Can then add feature so that value is saved in text file and a button can be clicked to reload it.