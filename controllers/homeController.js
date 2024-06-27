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

    res.render('layouts/main', { blogs }); // Ensure this path matches your directory structure
};

module.exports = {
    getHomePage
};
