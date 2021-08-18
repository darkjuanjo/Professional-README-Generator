const generateToc = projectInfoData => {
    let toc_array = ['* [Installation](#installation)','* [Usage](#usage)'];

    if(projectInfoData.credits)
    {
        toc_array.push( '* [Credits](#credits)');
        toc_array.push( '* [License](#license)');
    } else {
        toc_array.push( '* [License](#license)');
    }

    return toc_array.join('\n');
};

const displayInstallation = steps => {
let counter = 1;
 const steps_array = steps.map(element => {
    let step = `${counter}. ${element.step}`
    counter++;
    return step;

    });
 return steps_array.join('\n');
}

const displayUsage = steps => {
    let counter = 1;
     const steps_array = steps.map(element => {
        let step = `${counter}. ${element.instruction}`;
        if(element.confirm_step_image){
            if(element.local_image)
            {
                step += `![${element.image_name}](${element.local_image})\n`
            } else {
                step +=  `\n\n${element.image_name}!\n\n${element.web_image}\n`
            }
            
        }
        counter++;
        return step;
    
        });
     return steps_array.join('\n');
    }

    const displayCredits =(collaborators,give_credit) => {
        if(give_credit){
        let counter = 1;
         const collaborators_array = collaborators.map(element => {
            let collaborator =  
            '## Credits\n\n\n'+
            `[${element.contributor}](https://github.com/${element.github})`
            counter++;
            return collaborator;
        
            });
         return collaborators_array.join('\n');
        }
        return 'success!';
    }
        

module.exports = projectInfoData => {
    const { title, description, give_credit, installation, usage, credits, license } = projectInfoData;
    return `
# ${title}

## Description 

${description}

## Table of Contents

${generateToc(projectInfoData)}

## Installation

${displayInstallation(installation)}

## Usage 

${displayUsage(usage,projectInfoData)}


${displayCredits(credits,give_credit)}

## License

${license}
    `
};