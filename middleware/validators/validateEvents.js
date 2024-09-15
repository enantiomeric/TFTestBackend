function validateEvents(events) {
    const validEvents = ["CodeCrush", "CodeDuet", "CloudVerse", "Bid2Build"];
    if (events.length > 4) {
        return false;
    }
    const uniqueEvents = new Set(events);
    if (uniqueEvents.size !== events.length) {
        return false;
    }
    for (let event of events) {
        if (!validEvents.includes(event)) {
            return false;
        }
    }
    return true;
}

module.exports = validateEvents