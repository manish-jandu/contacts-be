const ansyncHandler = require('express-async-handler');
const Contact = require("../models/ContactModel");

//@desc Get all Contacts
//@route GET /api/contacts
//@access private
const getContacts = ansyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc Create New Contact
//@route POST /api/contacts
//@access private
const createContact = ansyncHandler(async (req,res)=>{
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    console.log("creating contact");
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    console;

    res.status(201).json(contact);
});


//@desc GET a single Contact
//@route GET /api/contacts/id
//@access private
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
//@access private
const updateContact = ansyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
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
//@access private
const deleteContact = ansyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
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