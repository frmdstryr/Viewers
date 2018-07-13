import { Router } from 'meteor/iron:router';
import { OHIF } from 'meteor/ohif:core';

// TODO: I don't know why I had to remove these. Things don't seem to work with them
/*Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'layout'
});*/

Router.onBeforeAction('loading');

Router.route('/', function() {
    Router.go('studylist', {}, { replaceState: true });
}, { name: 'home' });

Router.route('/studylist', function() {
    this.render('ohifViewer', { data: { template: 'studylist' } });
}, { name: 'studylist' });

Router.route('/viewer/:studyInstanceUids', function() {
    const studyInstanceUids = this.params.studyInstanceUids.split(';');
    OHIF.viewerbase.renderViewer(this, { studyInstanceUids }, 'ohifViewer');
}, { name: 'viewerStudies' });

// OHIF #98 Show specific series of study
Router.route('/study/:studyInstanceUid/series/:seriesInstanceUids', function () {
    const studyInstanceUid = this.params.studyInstanceUid;
    const seriesInstanceUids = this.params.seriesInstanceUids.split(';');
    OHIF.viewerbase.renderViewer(this, { studyInstanceUids: [studyInstanceUid], seriesInstanceUids }, 'ohifViewer');
}, { name: 'viewerSeries' });

Router.route('/IHEInvokeImageDisplay', function() {
    const requestType = this.params.query.requestType;

    if (requestType === "STUDY") {
        const studyInstanceUids = this.params.query.studyUID.split(';');

        OHIF.viewerbase.renderViewer(this, {studyInstanceUids}, 'ohifViewer');
    } else if (requestType === "STUDYBASE64") {
        const uids = this.params.query.studyUID;
        const decodedData = window.atob(uids);
        const studyInstanceUids = decodedData.split(';');

        OHIF.viewerbase.renderViewer(this, {studyInstanceUids}, 'ohifViewer');
    } else if (requestType === "PATIENT") {
        const patientUids = this.params.query.patientID.split(';');

        Router.go('studylist', {}, {replaceState: true});
    } else {
        Router.go('studylist', {}, {replaceState: true});
    }
});
