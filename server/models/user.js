const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'el nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'el correo es necesario'],
    },
    password: {
        type: String,
        required: [true, 'la contraseña es necesaria'],
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type:String,
        default: 'USER_ROLE',
        enum:rolesValidos,
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: Number,
        required: [true, 'El telefono es requerido'],
    }
});

userSchema.methods.toJSON = function() {

    let userS = this;
    let userObject = userS.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator,{ message: '{PATH} debe de ser único'})

module.exports = mongoose.model('user', userSchema);