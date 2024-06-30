const getHomePage = (req, res) => {
    const blogs = [
        {
            id: 1,
            title: 'First Blog Post',
            user: { username: 'user1' },
            date: new Date(),
            content: 'This is the content of the first blog post.'
        },
        {
            id: 2,
            title: 'Second Blog Post',
            user: { username: 'user2' },
            date: new Date(),
            content: 'This is the content of the second blog post.'
        }
    ];

    // Check if the user is logged in
    const loggedIn = req.session.user ? true : false;

    res.render('layouts/main', { blogs, loggedIn }); // Pass the loggedIn status to the template
};

module.exports = {
    getHomePage
};
