Package.describe({
    name: 'ohif:dicom-services',
    summary: 'DICOM Services: DICOMWeb and DIMSE C-Service functions',
    version: '0.0.1'
});

Npm.depends({
    'url-parse': '1.4.1',
    'isomorphic-fetch': '2.2.1'
});

Package.onUse(function(api) {
    api.versionsFrom('1.4');

    api.use('http');
    api.use('ecmascript');

    // DICOMWeb functions
    api.addFiles('both/DICOMWeb/namespace.js');
    api.addFiles('both/DICOMWeb/getJSON.js');
    api.addFiles('both/DICOMWeb/getName.js');
    api.addFiles('both/DICOMWeb/getNumber.js');
    api.addFiles('both/DICOMWeb/getString.js');
    api.addFiles('both/DICOMWeb/getModalities.js');
    api.addFiles('both/DICOMWeb/getAttribute.js');
    api.addFiles('both/DICOMWeb/getBulkData.js');

    api.export('DICOMWeb');

    // DIMSE functions
    api.addFiles('server/DIMSE/require.js', 'server');
    api.addFiles('server/DIMSE/constants.js', 'server');
    api.addFiles('server/DIMSE/elements_data.js', 'server');
    api.addFiles('server/DIMSE/Field.js', 'server');
    api.addFiles('server/DIMSE/RWStream.js', 'server');
    api.addFiles('server/DIMSE/Data.js', 'server');
    api.addFiles('server/DIMSE/Message.js', 'server');
    api.addFiles('server/DIMSE/PDU.js', 'server');
    api.addFiles('server/DIMSE/CSocket.js', 'server');
    api.addFiles('server/DIMSE/Connection.js', 'server');
    api.addFiles('server/DIMSE/DIMSE.js', 'server');

    api.export('DIMSE', 'server');
});
