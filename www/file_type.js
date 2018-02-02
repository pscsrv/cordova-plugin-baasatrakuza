/**
 * ファイルアップロードクラス
 */
var FileType = (function() {
    var FileType = function() {};

    FileType.prototype = {
        png: function(fileName, base64data) {
            return {
                '__type__' : '__rkzUploadFileData__',
                'upload_file' : base64data,
                'file_name' : fileName,
                'mime_type' : 'image/png'
            };
        },
        jpg: function(fileName, base64data) {
            return {
                '__type__' : '__rkzUploadFileData__',
                'upload_file' : base64data,
                'file_name' : fileName,
                'mime_type' : 'image/jpeg'
            };
        },
        gif: function(fileName, base64string) {
            return {
                '__type__' : '__rkzUploadFileData__',
                'upload_file' : base64data,
                'file_name' : fileName,
                'mime_type' : 'image/gif'
            };
        },
        mp4: function(filename, base64string) {
            return {
                '__type__' : '__rkzUploadFileData__',
                'upload_file' : base64data,
                'file_name' : fileName,
                'mime_type' : 'video/mp4'
            };
        }
    };
    return FileType;
})();

module.exports = new FileType();
