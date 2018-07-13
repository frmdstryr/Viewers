import { OHIF } from 'meteor/ohif:core';
import makeRequest from './makeRequest';

DICOMWeb.getJSON = async function (geturl, options) {
    if (options.logRequests) {
        OHIF.log.info(geturl);
    }

    if (options.logTiming) {
        OHIF.log.time(geturl);
    }

    const result = await makeRequest(geturl, options);

    if (options.logTiming) {
        OHIF.log.timeEnd(geturl);
    }

    if (options.logResponses) {
        OHIF.log.info(result);
    }

    return result;
};
