// middleware/role.middleware.js
export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role.mainRole)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };
  