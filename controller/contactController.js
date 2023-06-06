//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const getContacts = (req,res)=>{
    res.status(200).json({message:"Get all Contacts"});
};

//@desc Create New Contact
//@route POST /api/contacts
//@access public
const createContact = (req,res)=>{
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are Mandatory")
    }
    res.status(201).json({message:"Create Contact"});
};


//@desc GET a single Contact
//@route GET /api/contacts/id
//@access public
const getContact = (req,res)=>{
    res.status(200).json({message:`Get Contact for ${req.params.id}`});
}

//@desc Update Contact
//@route PUT /api/contacts/id
//@access public
const updateContact = (req,res)=>{
    res.status(200).json({message:`Update Contact for ${req.params.id}`});
};


//@desc Delete Contact
//@route DELETE /api/contacts/id
//@access public
const deleteContact = (req,res)=>{
    res.status(200).json({message:`Contact deleted for ${req.params.id}`});
};


module.exports = { 
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact 
};