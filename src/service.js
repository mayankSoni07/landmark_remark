import { find as _find } from 'lodash';
import { filter as _filter } from 'lodash';
import { getUsers, getLocationNotes } from './data';


export default class ServiceController {

    /**
     * Compare the email and password in the user master data
     * and return the user for correct credantials else throw error
     * @param {string} email User email   
     * @param {string} password User password
     * @returns {Promise<Object>} return the Promise
     */
    static loginUser(email, password) {
        return new Promise((resolve, reject) => {
            const users = getUsers();
            const loggedInUser = _find(users, { 'email': email, 'password': password });
            if (!loggedInUser) {
                reject({ 'success': true, 'msg': 'User not found with the given credantials' });
            }
            resolve({ 'success': true, 'user': loggedInUser });
        })
    }

    /**
     * Find the location of provided userId
     * @param {string} id userId of the given user
     * @return {Promise<Array>} return array of the location object
     */
    static getLocationOfUser(id) {
        const location_notes = getLocationNotes();
        const location = _filter(location_notes, { 'userId': id });
        return location;
    }

    /**
     * Find the location of provided userId
     * @param {string} id userId of the given user
     * @return {Promise<Array>} return array of the location object
     */
    static getLoggedInUser(id) {
        const users = getUsers();
        const loggedInUser = _find(users, { 'id': id });
        return loggedInUser;
    }

    /**
     * Find the all user with their location
     * @param {String} id Id of the given user
     * @return {Promise<Array>} return array of the location object
     */
    static getAllLogOutUsersWithLocation(id) {
        const locationWithUsers = [];
        const users = getUsers();
        const location_notes = getLocationNotes();
        users.forEach((user) => {
            if (id !== user.id) {
                const location = _filter(location_notes, { 'userId': user.id });
                locationWithUsers.push({ ...user, 'location': location });
            }
        });
        return locationWithUsers;
    }

    /**
     * Add the notes of provided cordinates of the given location
     * @param {Array<Number>} location Loaction that needs to be entered
     * @param {String} notes User provided text content
     * @param {String} userId User Id
     */
    static addNotesToLocation(location, notes, userId) {
        const location_notes = getLocationNotes();
        location_notes.push({ 'cordinate': location, 'text': notes, 'userId': userId });
        return this.getLocationOfUser(userId);
    }

    /**
     * Get all user with their location
     * @returns {Array<Object>}
     */
    static getAllUsersWithLocation() {
        const users = getUsers();
        const location_notes = getLocationNotes();
        const usersWithLocationNotes = [];
        users.forEach((user) => {
            const location = _filter(location_notes, { 'userId': user.id });
            usersWithLocationNotes.push({ ...user, 'location': location });
        });
        return usersWithLocationNotes;
    }

    /**
     * Search the user on the basis of given text keyword
     * @param {String} escText text keyword
     * @returns {Array<Object>} 
     */
    static searchUser(escText) {
        const usersWithLocationNotes = this.getAllUsersWithLocation();
        const searchedUser = _filter(usersWithLocationNotes, function (obj) {
            return (new RegExp(`.*${escText}.*`, 'i')).test(obj.name) || this.searchUserInLocation(escText, obj.location);
        })
        return searchedUser;
    }

    /**
     * Helper function to evaulate the search keyword in the location list
     * @param {String} escText The text that need to be searched
     * @param {Array} location Array of location in which the text will be searched
     */
    static searchUserInLocation(escText, location = []) {
        for (let i of location) {
            if ((new RegExp(`.*${escText}.*`, 'i')).test(i.text)) {
                return true;
            }
        }
        return false;
    }
}
