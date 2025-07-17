/*GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: 'Travel Page' });
};

module.exports = {
    travel
};