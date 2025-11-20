import User from "../models/userModel.js";

// get all users
async function getAllusers(req, res) {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// get one user
async function getOneuser(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// update user
async function updateuser(req, res) {
    try {
        const updates = { ...req.body };

        // multer.fields() populates req.files (object). check both possible field names
        if (req.files) {
            const fileObj = (req.files.profilePic && req.files.profilePic[0]) || (req.files.profilepic && req.files.profilepic[0]);
            if (fileObj) {
                // set stored path that matches static mount in server.js
                updates.profilepic = `/uploads/${fileObj.filename}`;
            }
        }

        // also support req.file if other middleware used
        if (!updates.profilepic && req.file) {
            updates.profilepic = `/uploads/${req.file.filename || req.file.originalname}`;
        }

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// delete user
async function deleteuser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// export functions
export { getAllusers, getOneuser, updateuser, deleteuser };