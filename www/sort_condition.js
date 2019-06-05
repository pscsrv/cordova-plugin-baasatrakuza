/**
 * 並び順クラス
 */
var SortCondition = (function() {
    var SortCondition = function(type, columnName) {
        this.type = type;
        this.columnName = columnName;
    };

    SortCondition.prototype = {
        asc: function(columnName) {
            return new SortCondition("0001", columnName);
        },
        desc: function(columnName) {
            return new SortCondition("0002", columnName);
        },
        withFavorite: {
            updateDate: {
                asc: function() {
                    return new SortCondition("0001", "sys_favorite:update_dte");
                },
                desc: function() {
                    return new SortCondition("0002", "sys_favorite:update_dte");
                },
            },
            favoriteCount: {
                asc: function() {
                    return new SortCondition("0001", "sys_favorite_sum:favorite_count");
                },
                desc: function() {
                    return new SortCondition("0002", "sys_favorite_sum:favorite_count");
                },
            }
        },
        convertToJson: function() {
            // 設定された検索条件をJSON形式に変換する
            return {
                'type': this.type,
                'columnName': this.columnName
            };
        }
    };
    return SortCondition;
})();

module.exports = new SortCondition('', '');
