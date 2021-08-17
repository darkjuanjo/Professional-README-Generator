const generateREADME = require('./src/template.js');
const inquirer = require('inquirer');

const promptProjectInfo = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter project title. (Required)',
            validate: titleInput => {
                if(titleInput){
                    return  true;
                } else {
                    console.log('Please enter a project title');
                    return false;
                }
            } 
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a description for the project. (Required)',
        validate: descriptionInput => {
            if(descriptionInput) {
                return true;
            } else {
                console.log('Please provide a description!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'give_credit',
        message: 'Was this a collaborative project?',
        default: false
    }
]);
};

const promptInstallation = projectInfoData => {
    if(!projectInfoData.installation)
    {
        projectInfoData.installation = [];
    };
    return inquirer
    .prompt([{
        type: 'input',
        name: 'step',
        message: 'Please provide installation step (Required)',
        validate: stepInput => {
            if(stepInput) {
                return true;
            } else {
                console.log("Please provide installation step!");
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'new_step',
        message: 'Would you like to add another step?',
        default: false
    }
])
.then(InstallStep => {
    projectInfoData.installation.push(InstallStep);
    if(InstallStep.new_step) {
        return promptInstallation(projectInfoData);
    } else {
        return projectInfoData;
    }
}); 
};

const promptUsage = projectInfoData => {
    if(!projectInfoData.usage)
    {
        projectInfoData.usage = [];
    };
    return inquirer
    .prompt([{
        type: 'input',
        name: 'instruction',
        message: 'Please provide a usage instruction (Required)',
        validate: stepInput => {
            if(stepInput) {
                return true;
            } else {
                console.log("Please provide usage instruction!");
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirm_step_image',
        message: 'Would you like to add an image/video as an example?',
        default: false
    },
    {
        type: 'input',
        name: 'step_image',
        message: 'Please enter the image/video path (Required)',
        validate: step_imageInput => {
            if(step_imageInput) {
                return true;
            } else {
                console.log('Please provide image/video path!');
                return false;
            }
        },
        when: ({confirm_step_image}) => {
            if(confirm_step_image) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'new_step',
        message: 'Would you like to add another step?',
        default: false
    }
])
.then(UsageStep => {
    projectInfoData.usage.push(UsageStep);
    if(UsageStep.new_step) {
        return promptUsage(projectInfoData);
    } else {
        return projectInfoData;
    }
}); 
};

const promptCredits = projectInfoData => {
    if(!projectInfoData.credits){
        projectInfoData.credits = [];
    };
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'contributor',
            message: 'Please enter collaborator name (Required)',
            validate: contributorInput => {
                if(contributorInput){
                    return  true;
                } else {
                    console.log('Please enter the name of the collaborator');
                    return false;
                }
            }, 
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please provide the github username (Required)',
        validate: githubInput => {
            if(githubInput) {
                return true;
            } else {
                console.log('Please provide github profile of collaborator!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'new_contributor',
        message: 'Would you like to add another collaborator?',
        default: false
    }
])
.then(creditData => {
    projectInfoData.credits.push(creditData);
    if(creditData.new_contributor){
        return promptCredits(projectInfoData);
    } else {
        return projectInfoData;
    }
});
};

const giveCreditresponse = (projectInfoData) => {
    return new Promise(( resolve, reject ) => {
        try {
            if(projectInfoData.give_credit) {
               let object = promptCredits(projectInfoData);
               resolve(object);
               return;
            } else {
                resolve(projectInfoData);
                return;
            }
        }
        catch {
            reject(projectInfoData);
            return;
        }
    });
};

const promptLicense = projectInfoData => {
  return inquirer
  .prompt([{
      type: 'input',
      name: 'license',
      message: 'Please type project license',
      default: 'MIT'
  }])
  .then(licenseInfo => {
      projectInfoData.license = licenseInfo.license
      return projectInfoData;
    });
};

promptProjectInfo()
.then(promptInstallation)
.then(promptUsage)
.then(giveCreditresponse)
.then(promptLicense)
.then(projectInfoData => {
    console.log(projectInfoData);
    console.log(generateREADME(projectInfoData))
});