const typesMiddleware = (req, res, next) => {
    const { name, email, phone, college, year, events, amount, transactionLink, transactionID } = req.body;

    const expectedTypes = {
        name: 'string',
        email: 'string',
        phone: 'string',
        college: 'string',
        year: 'number',
        events: 'object',
        amount: 'number',
        transactionLink: 'string',
        transactionID: 'string'
    };
    for (const field in expectedTypes) {
        if (req.body[field] !== undefined && typeof req.body[field] !== expectedTypes[ field ]) {
            return res.status(400).json({ message: `Invalid type for ${field}. Expected ${expectedTypes[ field ]}.` });
        }
    }
    if (events && !Array.isArray(events)) {
        return res.status(400).json({ message: "Invalid type for events. Expected an array." });
    }

    next(); 
};

module.exports = typesMiddleware;
