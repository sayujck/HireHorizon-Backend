const Company = require('../models/companyModel')

// register
exports.registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json("Company already registered")
        };
        company = await Company.create({
            name: companyName,
            userId: req.userId
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// get company
exports.getCompany = async (req, res) => {
    try {
        const userId = req.userId; // logged in user id
        const companies = await Company.find({ userId });
        console.log(userId);
        
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
exports.getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        console.log(companyId);
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// update company
exports.updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        // cloudinary
    
        const updateData = { name, description, website, location };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}