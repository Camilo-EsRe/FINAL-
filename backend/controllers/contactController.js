const Contact = require('../models/Contact'); // O lógica SQL para MySQL

// @route    GET api/contacts
// @desc     Obtener todos los contactos del usuario
// @access   Private
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }); // O SELECT para MySQL
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @route    POST api/contacts
// @desc     Crear un nuevo contacto
// @access   Private
exports.createContact = async (req, res) => {
    const { nombre, apellido, telefonoFijo, celular, email } = req.body;

    try {
        const newContact = new Contact({
            user: req.user.id,
            nombre,
            apellido,
            telefonoFijo,
            celular,
            email
        });

        const contact = await newContact.save(); // O INSERT para MySQL
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @route    PUT api/contacts/:id
// @desc     Actualizar un contacto
// @access   Private
exports.updateContact = async (req, res) => {
    const { nombre, apellido, telefonoFijo, celular, email } = req.body;

    // Construir el objeto de contacto
    const contactFields = {};
    if (nombre) contactFields.nombre = nombre;
    if (apellido) contactFields.apellido = apellido;
    if (telefonoFijo) contactFields.telefonoFijo = telefonoFijo;
    if (celular) contactFields.celular = celular;
    if (email) contactFields.email = email;

    try {
        let contact = await Contact.findById(req.params.id); // O SELECT para MySQL

        if (!contact) return res.status(404).json({ msg: 'Contacto no encontrado' });

        // Asegurarse de que el usuario posee el contacto
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
        ); // O UPDATE para MySQL

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @route    DELETE api/contacts/:id
// @desc     Eliminar un contacto
// @access   Private
exports.deleteContact = async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id); // O SELECT para MySQL

        if (!contact) return res.status(404).json({ msg: 'Contacto no encontrado' });

        // Asegurarse de que el usuario posee el contacto
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        await Contact.findByIdAndDelete(req.params.id); // O DELETE para MySQL

        res.json({ msg: 'Contacto eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};