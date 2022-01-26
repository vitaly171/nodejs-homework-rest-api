const express = require('express');
const CreateError = require("http-errors");

const contacts = require('../../models/contacts');
const {contactSchema} = require("../../schemas/index");

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.getAllContacts()
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getById(id)
    if(!result){
            throw new CreateError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
            const {error} = contactSchema.validate(req.body);
        if(error){
            throw new CreateError(400, error.message)
        }
        const {name, email, phone } = req.body;
        const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);

    } catch (error) {
        next(error);
    }
})


router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await contacts.removeContact(id);
    if(!result){
            throw new CreateError(404, "Not found")
    }
    res.json({ message: "contact deleted" })
  }catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
            const {error} = contactSchema.validate(req.body);
        if(error){
            throw new CreateError(400, error.message)
      }
        const {id} = req.params;
        const {name, email, phone } = req.body;
        const result = await contacts.updateContact(id,name, email, phone);
      if(!result){
            throw new CreateError(404, "Not found")
        }
      res.json(result);

    } catch (error) {
        next(error);
    }
  
})

module.exports = router;
