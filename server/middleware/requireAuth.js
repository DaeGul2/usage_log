function requireAuth(req, res, next) {
    const token = req.cookies?.admin_auth || req.headers['authorization'];
    if (token !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ status: 'unauthorized' });
    }
    next();
  }
  