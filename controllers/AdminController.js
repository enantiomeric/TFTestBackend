const Admin = require('../models/Admin'); 
const Attendance = require('../models/Attendance');
const Participant = require('../models/Participant');
const Event = require('../models/Event')  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {v4 : UUIDv4 } = require('uuid')
const logger = require('../config/logger')

exports.signUp = async (req, res) => {
    
    try {
        const { name, email, post, password } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: "Admin member already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            name,
            email,
            post,
            readPermission: false,  
            writePermission: false, 
            password: hashedPassword
        });

        await admin.save();
        logger.writeLog("Signup successful")
        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        logger.writeLog(error)
        res.status(500).json({ message: "Server Error" });
        console.log(" ERROR OCCURED IN SIGNUP ");
        console.log(error);
    }
};

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        logger.writeLog("Login Successful")
        res.status(200).json({ token, admin: { id: admin._id, email: admin.email } });
    } catch (error) {
        logger.writeLog(error)
        res.status(500).json({ message: "Server Error" });
        console.log("AN ERROR OCCURED IN SIGNIN");
        console.log(error);
    }
};


exports.addAttendance = async (req, res) => {
    try {
        const { UUID, event, present } = req.body;  
        const adminId = req.admin.id;
        const admin = await Admin.findById(adminId);

        if (!admin.readPermission || !admin.writePermission) {
            return res.status(403).json({ message: "You do not have permission to add attendance" });
        }

        const eventDoc = await Event.findOne({ name: event });
        if (!eventDoc) {
            return res.status(400).json({ message: "Event not found" });
        }

        const participant = await Participant.findOne({ UUID });
        if (!participant) {
            return res.status(404).json({ message: "Participant not found" });
        }

        if (!participant.events.includes(event)) {
            return res.status(400).json({ message: `Participant is not part of the event: ${event}` });
        }
        const attendance = new Attendance({
            present,
            event: eventDoc._id,
            participant: participant._id,
            markingAdmin: adminId,
            time: new Date(),
            UUID : UUIDv4()
        });

        await attendance.save();
        logger.writeLog("Attendance marked successfully")
        res.status(201).json({ message: "Attendance marked successfully" });
    } catch (error) {
        console.log("An Error Occured")
        logger.writeLog(error)
        console.log(error)
        res.status(500).json({ message: "Failed to mark attendance" });
    }
};

exports.deleteAttendance = async (req, res) => {
    
    try {
        const { UUID, event } = req.body; 
        const adminId = req.admin.id;
        const admin = await Admin.findById(adminId);
        if (!admin.readPermission || !admin.writePermission) {
            return res.status(403).json({ message: "You do not have permission to delete attendance" });
        }

        const eventDoc = await Event.findOne({ name: event });
        if (!eventDoc) {
            return res.status(400).json({ message: "Event not found" });
        }

        const participant = await Participant.findOne({ UUID });
        if (!participant) {
            return res.status(404).json({ message: "Participant not found" });
        }

        const attendance = await Attendance.findOneAndDelete({
            participant: participant._id,
            event: eventDoc._id
        });

        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }
        logger.writeLog("Attendance deleted sucessfully")
        res.status(200).json({ message: "Attendance deleted successfully" });
    } catch (error) {
        logger.writeLog(error)
        res.status(500).json({ message: "Failed to delete attendance" });
        console.log(error)
    }
};

exports.getParticipants = async (req, res) => {
    
    try {
        const { event } = req.body;  
        const adminId = req.admin.id;
        const validEvents = ["CloudVerse", "CodeDuet", "Bid2Build", "CodeCrush"];
        if (!validEvents.includes(event)) {
            return res.status(400).json({ message: "Invalid event" });
        }
        const admin = await Admin.findById(adminId);
        if (!admin.readPermission) {
            return res.status(403).json({ message: "You do not have permission to view participants" });
        }

        const participants = await Participant.find({ events: event });
        if (participants.length === 0) {
            return res.status(404).json({ message: `No participants found for the event: ${event}` });
        }
        logger.writeLog("Participants fetched sucessfully")
        res.status(200).json({ participants });
    } catch (error) {
        logger.writeLog(error)
        console.log(error)
        res.status(500).json({ message: "Failed to fetch participants" });
    }
};


exports.getAttendance = async (req, res) => {
    
    try {
        const { event } = req.body;
        const adminId = req.admin.id;
        const validEvents = ["CloudVerse", "CodeDuet", "Bid2Build", "CodeCrush"];
        if (!validEvents.includes(event)) {
            return res.status(400).json({ message: "Invalid event" });
        }

        const admin = await Admin.findById(adminId);
        if (!admin.readPermission) {
            return res.status(403).json({ message: "You do not have permission to view attendance" });
        }

        const participants = await Participant.find({ events: event });
        if (participants.length === 0) {
            return res.status(404).json({ message: "No participants found for this event" });
        }
        logger.writeLog("Fetched Attendance successfully")
        res.status(200).json({ participants });
    } catch (error) {
        logger.writeLog(error)
        console.log(error)
        res.status(500).json({ message: "Failed to get attendance" });
    }
};