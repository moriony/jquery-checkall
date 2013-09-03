(function($) {
    var methods = {
        changeMaster: function(master, slaves, opts) {
            slaves.prop('checked', master.prop('checked'));
            opts.onMasterChange.call(master, master, slaves);
        }
        , changeSlave: function(slave, master, slaves, opts) {
            var checkedSlaves = slaves.filter(':checked');
            master.prop('checked', slaves.length == checkedSlaves.length);
            opts.onSlaveChange.call(slave, master, slaves);
        }
    };
    $.fn.checkAll = function(slaves, options) {
        var opts = $.extend({}, $.fn.checkAll.defaults, options)
            , $slaves = $(slaves).not(this);

        return this.each(function() {
            var $master = $(this);
            $master.on('change', function() {
                methods.changeMaster($master, $slaves, opts);
            });
            $slaves.on('change', function() {
                methods.changeSlave($(this), $master, $slaves, opts);
            });
        });
    };
    $.fn.checkAll.defaults = {
        onMasterChange: function() {}
        , onSlaveChange: function() {}
    };
})(jQuery);