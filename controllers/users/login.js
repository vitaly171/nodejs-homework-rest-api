const createError = require("http-errors");
const { User, schemas } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;


const login =async(req, res, next)=> {
    try {
        const {error} = schemas.register.validate(req.body);
        if(error){
            throw new createError(400, error.message)
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            throw new createError(401, "Email or password is wrong");
        }
        const compareResult = await bcrypt.compare(password, user.password);
        if(!compareResult){
            throw new createError(401, "Email or password is wrong");
        }
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

        const { _id } = req.user;

        await User.findByIdAndUpdate(_id, { token });

        res.json({
            status: "success",
            code: 200,
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = login;

