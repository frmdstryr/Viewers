import { Router } from 'meteor/iron:router';

Router.route('/login', function() {
    this.layout('layout', { data: {} });
    this.render('userLogin');
}, { name: 'userLogin' });
