module.exports = templateData => {
    const { title, description, toc, installation, usage, credits, license } = templateData;
    return `
    # ${title}

## Description 

${description}

## Table of Contents

${toc}

## Installation

${installation}


## Usage 

${usage}


## Credits

${credits}


## License

${license}
    `
};