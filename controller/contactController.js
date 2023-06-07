const ansyncHandler = require('express-async-handler');
const Contact = require("../models/ContactModel");

//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const getContacts = ansyncHandler(async (req,res)=>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create New Contact
//@route POST /api/contacts
//@access public
const createContact = ansyncHandler(async (req,res)=>{
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone 
    });

    res.status(201).json(contact);
});


//@desc GET a single Contact
//@route GET /api/contacts/id
//@access public
const getContact = ansyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }   
    res.status(200).json(contact);
});

//@desc Update Contact
//@route PUT /api/contacts/id
//@access public
const updateContact = ansyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updateContact);
});


//@desc Delete Contact
//@route DELETE /api/contacts/id
//@access public
const deleteContact = ansyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});


module.exports = { 
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact 
};