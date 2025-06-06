const User = require('./models/User'); // O lógica SQL para MySQL
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route    POST api/auth/register
// @desc     Registrar un usuario
// @access   Public
exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email }); // O SELECT para MySQL

        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        user = new User({ email, password }); // O prepara la inserción para MySQL

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save(); // O INSERT para MySQL

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @route    POST api/auth/login
// @desc     Autenticar usuario y obtener token
// @access   Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email }); // O SELECT para MySQL

        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};