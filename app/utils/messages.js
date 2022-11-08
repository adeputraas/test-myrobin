const moment = require('moment');

async function formatMessage(dto) {
    return {
        ...dto,
        time: moment().format('h:mm:a')
    }
}

module.exports = formatMessage;