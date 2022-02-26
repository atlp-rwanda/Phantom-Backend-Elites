const logout = (req, res) => {
    res.cookie('jsonwebtoken', '', { maxAge: 1 });
    res.json({ user: 'user signed out' });
    res.redirect('/');
};

export default { logout };
// eslint-disable-next-line
console.log("Auth controller to be used");
