const joi = require("joi")

const productSchema = joi.object({
    name: joi.string()
                        .min(3)
                        .max(100)
                        .trim()
                        .required()
                        .messages({
                            'string.base': 'El nombre debe ser una cadena de texto',
                            'string.empty': 'El nombre no puede estar vacio',
                            'string.min': 'La cantida de caracteres minima es 3',
                            'string.max': 'La cantida de caracteres maxima es de {#limit}',
                            'any.require': 'El nombre es un dato requerido'
                        }),
    price: joi.number(),
    description: joi.string(),
    category: joi.string(),
    createdAt: joi.number(),
    active: joi.boolean().optional()
})

module.exports = productSchema