const logout = (req, res) => {
    res.cookie('jsonwebtoken', '', { maxAge: 1 });
    res.json({ user: 'user signed out' });
    res.redirect('/');
};

// export default { logout };
export { logout as default };