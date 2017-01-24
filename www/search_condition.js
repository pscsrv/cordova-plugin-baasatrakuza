var SearchCondition = (function() {
    /**
     * コンストラクタ
     */
    var SearchCondition = function(type, columnName, values) {
        this.type = type;
        this.columnName = columnName;
        this.values = values;
    };

    SearchCondition.prototype = {
        betweenInclude: function(columnName, values) {
            return new SearchCondition("between_include", columnName, values);
        },
        betweenExclude: function(columnName, values) {
            return new SearchCondition("between_exclude", columnName, values);
        },
        in: function(columnName, values) {
            return new SearchCondition("in", columnName, values);
        },
        notIn: function(columnName, values) {
            return new SearchCondition("not_in", columnName, values);
        },
        likeOr: function(columnName, values) {
            return new SearchCondition("like_or", columnName, values);
        },
        equal: function(columnName, value) {
            return new SearchCondition("equal", columnName, [ value ]);
        },
        notEqual: function(columnName, value) {
            return new SearchCondition("not_equal", columnName, [ value ]);
        },
        likeBefore: function(columnName, value) {
            return new SearchCondition("like_before", columnName, [ value ]);
        },
        likeAfter: function(columnName, value) {
            return new SearchCondition("like_after", columnName, [ value ]);
        },
        likeBoth: function(columnName, value) {
            return new SearchCondition("like_both", columnName, [ value ]);
        },
        lessThanInclude: function(columnName, value) {
            return new SearchCondition("less_than_include", columnName, [ value ]);
        },
        greaterThanInclude: function(columnName, value) {
            return new SearchCondition("greater_than_include", columnName, [ value ]);
        },
        convertToJson: function() {
            // 設定された検索条件をJSON形式に変換する
            return {
                'type': this.type,
                'columnName': this.columnName,
                'values': this.values
            };
        }
    };
    return SearchCondition;
})();

module.exports = new SearchCondition('', '', []);
