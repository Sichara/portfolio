jQuery(document).ready(function($) {
    var msgProcessor = new msgProcessorClass();
});


var msgProcessorClass = function() {
    var self = this;
    
    this.eventsMsgOne = function(msgOne) {
        msgOne.find('.icon-grey-favorite').on('click', function(e) {
            e.preventDefault();
            
            var el = $(this);
            var isActive = el.hasClass('active');
            var url = el.data('url');
            var id = msgOne.data('id');
            
            updateMsgStar({
                el: el,
                isActive: isActive,
                url: url,
                id: id
            });
            
            return false;
        });
    };
    
    this.eventsMsgList = function(msgList) {
        jQuery('select[name=item-limit]').change(function() {
            window.location.href = $(this).val();
        });

        msgList.find('.icon-grey-favorite, .icon-grey-trash, .icon-grey-trash-restore, .icon-grey-trash-empty').on('click', function(e) {
            e.preventDefault();
            
            var el = $(this);
            var url = el.data('url');
            var id = el.closest('tr').data('id');
            
            var options = {
                el: el,
                url: url,
                id: id,
            };
            
            if (el.hasClass('icon-grey-favorite')) {
                options.isActive = el.hasClass('active');
                options.realfield = el.data('rfield');
                updateMsgStar(options);
            } else if (el.hasClass('icon-grey-trash')) {
                moveMsgToArchive(options);
            } else if (el.hasClass('icon-grey-trash-restore')) {
                restoreMsgFromArchive(options);
            } else if (el.hasClass('icon-grey-trash-empty')) {
                deleteMsg(options);
            }

            
            return false;
        });
        
        jQuery('.toolbar .icon-grey-favorite, .toolbar .icon-grey-trash, .toolbar .icon-grey-trash-restore, .toolbar .icon-grey-trash-empty').on('click', function(e) {
            e.preventDefault();

            var btn = $(this);

            var checked = msgList.find('tbody input:checked');
            var isActive = false;
            
            var el = [];
            
            $(checked).each(function() {
                var row = $(this).closest('tr');
                var star = row.find('.icon-grey-favorite');
                
                if (typeof el[star.data('subtype')] === 'undefined') {
                    el[star.data('subtype')] = [];
                }
                
                el[star.data('subtype')].push(star);
            });
            
            $.each(el, function(index) {
                if (this.length)  {
                    var elements = this;
                    var id = [];
                    var url = '';

                    $.each(this, function() {
                        id.push(this.closest('tr').data('id'));
                        url = this.data('url');
                    });

                    id = id.join(',');

                    var options = {
                        el: elements,
                        isActive: isActive,
                        url: url,
                        id: id,
                        realfield: elements.data('rfield')
                    };
                    console.log(options);
                   
                    if (btn.hasClass('icon-grey-favorite')) {
                       updateMsgStar(options);
                    } else if (btn.hasClass('icon-grey-trash')) {
                        moveMsgToArchive(options);
                    } else if (btn.hasClass('icon-grey-trash-restore')) {
                        restoreMsgFromArchive(options);
                    } else if (btn.hasClass('icon-grey-trash-empty')) {
                        deleteMsg(options);
                    }
                   
                   
               }
            });
            
            return false;
        });
        
    };

    this.eventsMsgAdd = function(msgAdd) {
        msgAdd.find('a.btn').on('click', function(e) {
            e.preventDefault();
            
            msgAdd.submit();
            
            return false;
        });
    }

    this.eventsMsgChat = function(msgChat) {
        msgChat.find('.icon-grey-favorite').on('click', function(e) {
            e.preventDefault();
            
            var el = $(this);
            var isActive = el.hasClass('active');
            var url = el.data('url');
            var id = msgChat.data('id');
            
            updateMsgStar({
                el: el,
                isActive: isActive,
                url: url,
                id: id,
                realfield:  el.data('rfield')
            });
            
            return false;
        });
        
        msgChat.find('a.btn').on('click', function(e) {
            e.preventDefault();
            
            jQuery(this).closest('form').submit();
            
            return false;
        });
    }
    
    
    this.eventsMsgSuccess = function(msgSuccess) {
        setTimeout(function() { 
            window.location.href = msgSuccess.data('redirecturl');
        }, 10000);
    }

    
    this.init = function() {
        var msgList = jQuery('#msg-list');
        var msgOne = jQuery('#msg-one');
        var msgChat = jQuery('#msg-chat');
        var msgAdd = jQuery('#message-add');
        var msgSuccess = jQuery('#message-success');
        
        if (msgList.length > 0) {
            self.eventsMsgList(msgList);
        } else if (msgOne.length > 0) {
            self.eventsMsgOne(msgOne);
        } else if (msgSuccess.length > 0) {
            self.eventsMsgSuccess(msgSuccess);
        } else if (msgChat.length > 0) {
            self.eventsMsgChat(msgChat);
        } else if (msgAdd.length > 0) {
            self.eventsMsgAdd(msgAdd);
        }
        
    };
    
    this.init();
};


function updateMsgStar(options) {
    optionsDefault = {
        act: 'set',
        fld: 'star',
        realfield: ''
    };
    options = $.extend(optionsDefault, options);
    
    $.ajax({
        url: options.url,
        data: {
            id: options.id,
            act: options.act,
            fld: options.fld,
            realfield: options.realfield,
            val: (options.isActive) ? 0 : 1
        },
        method: 'post',
        async: true,
        dataType: 'json',
        success: function(data) {
            if (typeof data === 'object' && data !== null) {
                $.each(data, function(index) {
                    if (this == 1) {
                        if (options.el.length == 1) {
                            $(options.el).addClass('active');
                        } else {
                            $('#msg-list tr[data-id='+index+'] .icon-grey-favorite').addClass('active');
                        }
                    } else {
                        if (options.el.length == 1) {
                            $(options.el).removeClass('active');
                        } else {
                            $('#msg-list tr[data-id='+index+'] .icon-grey-favorite').removeClass('active');
                        }
                    }
                });
            } else if (data !== null) {
                if (data !== false) {
                    if (data == 1) {
                        $(options.el).addClass('active');
                    } else {
                        $(options.el).removeClass('active');
                    }
                }
            }

        }
    });
}


function moveMsgToArchive(options) {
    
    $.ajax({
        url: options.url,
        data: {
            id: options.id,
            act: 'set',
            fld: 'archive',
            val: 1
        },
        method: 'post',
        async: true,
        dataType: 'json',
        success: function(data) {
            console.log(data);
            if (typeof data === 'object') {
                $.each(data, function(index) {
                    if (this == 1) {
                        if (options.el.length == 1) {
                            $(options.el).closest('tr').slideUp('slow', function() {
                                $(this).remove();
                            });
                        } else {
                            $('#msg-list tr[data-id='+index+']').slideUp('slow', function() {
                                $(this).remove();
                            });
                        }
                    }
                });
            } else {
                if (data !== false) {
                    if (data == 1) {
                        $(options.el).addClass('active');
                    } else {
                        $(options.el).removeClass('active');
                    }
                }
            }
        }
    });
}


function restoreMsgFromArchive(options) {
    
    $.ajax({
        url: options.url,
        data: {
            id: options.id,
            act: 'set',
            fld: 'archive',
            val: 0
        },
        method: 'post',
        async: true,
        dataType: 'json',
        success: function(data) {
            console.log(data);
            if (typeof data === 'object') {
                $.each(data, function(index) {
                    if (this == 0) {
                        if (options.el.length == 1) {
                            $(options.el).closest('tr').slideUp('slow', function() {
                                $(this).remove();
                            });
                        } else {
                            $('#msg-list tr[data-id='+index+']').slideUp('slow', function() {
                                $(this).remove();
                            });
                        }
                    }
                });
            } else {
//                if (data !== false) {
//                    if (data == 1) {
//                        $(options.el).addClass('active');
//                    } else {
//                        $(options.el).removeClass('active');
//                    }
//                }
            }
        }
    });
}


function deleteMsg(options) {
    
    $.ajax({
        url: options.url,
        data: {
            id: options.id,
            act: 'set',
            fld: 'trash',
            val: 1
        },
        method: 'post',
        async: true,
        dataType: 'json',
        success: function(data) {
            console.log(data);
            if (typeof data === 'object') {
                $.each(data, function(index) {
                    if (this == 1) {
                        if (options.el.length == 1) {
                            $(options.el).closest('tr').slideUp('slow', function() {
                                $(this).remove();
                            });
                        } else {
                            $('#msg-list tr[data-id='+index+']').slideUp('slow', function() {
                                $(this).remove();
                            });
                        }
                    }
                });
            } else {
//                if (data !== false) {
//                    if (data == 1) {
//                        $(options.el).addClass('active');
//                    } else {
//                        $(options.el).removeClass('active');
//                    }
//                }
            }
        }
    });
}
