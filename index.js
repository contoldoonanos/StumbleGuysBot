const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

const GoStumble = (auth) => new Promise((resolve, reject) => {

    fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
        method: 'GET',
        headers: {
            'authorization': auth
        }
    })
    .then(res => res.text())
    .then(data=> {
        resolve(data);
    })
    .catch(err => {
        reject(err);
    });

});

(async () => {

    console.log(`
███████ ████████ ██    ██ ███    ███ ██████  ██      ███████         
██         ██    ██    ██ ████  ████ ██   ██ ██      ██           
███████    ██    ██    ██ ██ ████ ██ ██████  ██      █████          
     ██    ██    ██    ██ ██  ██  ██ ██   ██ ██      ██            
███████    ██     ██████  ██      ██ ██████  ███████ ███████    
By : ${chalk.red('ZoraGanteng')} - ${chalk.blue('ZORA GANTENG NIH BOS')}
`);

    const auth = rs.question('[+] Paste Token Kamu Disini : ');
    console.log('');

    while (true) {

        const result = await GoStumble(auth);
        if (!result) {

            console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Anda Harus Menang Terlebih Dahulu !`));
            break;

        } else if (result.includes('User')) {

            const data = JSON.parse(result);
            const username = data.User.Username;
            const country = data.User.Country;
            const trophy = data.User.SkillRating;
            const crown = data.User.Crowns;
            
            console.log(chalk.magenta(`\r[ ${moment().format('HH:mm:ss')} ] Nickname : ${username} | Country : ${country} | ${chalk.red(`Trophy : ${trophy}`)} | ${chalk.red(`Crown : ${crown}`)}`));
            
        } else if (result == 'AKUN STUMBLE ANDA DI BANNED') {
            console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Banned !`));
            break;
        }
    }
    


})();
