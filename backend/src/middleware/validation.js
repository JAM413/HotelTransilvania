const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errorDetails
      });
    }
    
    // Substituir req.body pelos dados validados
    req.body = value;
    next();
  };
};

module.exports = {
  validate
};