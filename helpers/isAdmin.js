function isAdmin(User){
    if(User.rank === 'admin') return true;
    return false;
}
module.exports = isAdmin;