const fs = require('fs');
const path = require('path');
const os = require('os');
const util = require('util'); // For better object inspection

const logFilePath = path.join(__dirname, 'backend.log');

// Function to write log
const writeLog = (...data) => {
    try {
        // Combine multiple arguments into one log message
        const logMessage = data.map(item => {
            if (typeof item === 'object') {
                return util.inspect(item, { depth: null, colors: false });
            } else if (item instanceof Error) {
                // Always store the full stack trace of errors
                return `${item.message}\n${item.stack}`;
            }
            return String(item); // Convert other types to string
        }).join(' ');

        // Prepare log entry with timestamp
        const logEntry = `[${new Date().toISOString()}] ${logMessage}${os.EOL}`;

        // Append the log asynchronously to the file
        fs.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                console.error('Error writing to log file', err);
            }
        });
    } catch (err) {
        console.error('Error in writeLog function', err);
    }
};

// Function to read the last 20 lines from the log file
const readLog = async () => {
    try {
        const data = await fs.promises.readFile(logFilePath, 'utf8');
        const lines = data.split(os.EOL).filter(line => line.trim() !== ''); // Filter out empty lines

        const last20Lines = lines.slice(-20).join(os.EOL);

        return last20Lines;
    } catch (err) {
        console.error('Error reading log file', err);
        return 'Error reading log file';
    }
};

module.exports = { writeLog, readLog };
