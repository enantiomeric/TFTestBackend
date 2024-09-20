const fs = require('fs')
const path = require('path')
const os = require('os')
const util = require('util')
const logFilePath = path.join(__dirname, '..', 'logs', 'backend.log');

// const writeLog = (...data) => {
//     try {
//         const logMessage = data.map(item => {
//             if (typeof item === 'object') {
//                 return util.inspect(item, { depth: null, colors: false });
//             } else if (item instanceof Error) {
//                 return `${item.message}\n${item.stack}`;
//             }
//             return String(item); 
//         }).join(' ');

//         const logEntry = `[${new Date().toISOString()}] ${logMessage}${os.EOL}`;

//         fs.appendFile(logFilePath, logEntry, (err) => {
//             if (err) {
//                 console.error('Error writing to log file', err);
//             }
//         });
//     } catch (err) {
//         console.error('Error in writeLog function', err);
//     }
// };
const writeLog= (...data) =>{
    
}

const readLog = async () => {
    try {
        const data = await fs.promises.readFile(logFilePath, 'utf8');
        const lines = data.split(os.EOL).filter(line => line.trim() !== '');

        const last20Lines = lines.slice(-20).join(os.EOL);

        return last20Lines;
    } catch (err) {
        console.error('Error reading log file', err);
        return 'Error reading log file';
    }
};

module.exports = { writeLog, readLog };
