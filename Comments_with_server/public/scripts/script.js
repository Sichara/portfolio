/**
 * Created by 1 on 10.11.2015.
 */

var FormComments = (function () {
    function Constructor(formWrap) {
        this._formWrap = document.querySelector(formWrap);
        this.createForm(this._formWrap);
        API._get('comment', this._callback());
    }

    function toNormalDate(dateToConvert) {
        var date = new Date(dateToConvert);
        var normalDate = {
            YYYY: date.getFullYear(),
            MM: (date.getMonth() < 10) ? ('0' + date.getMonth()) : (date.getMonth()),
            DD: (date.getDate() < 10) ? ('0' + date.getDate()) : (date.getDate()),
            hh: (date.getHours() < 10) ? ('0' + date.getHours()) : (date.getHours()),
            mm: (date.getMinutes() < 10) ? ('0' + date.getMinutes()) : (date.getMinutes())
        };

        return normalDate.YYYY + '/' + normalDate.MM + '/' + normalDate.DD + ' ' + normalDate.hh + ':' + normalDate.mm;
    }

    Constructor.prototype._callback = function () {
        var self = this;

        return function (res) {
            self._messages = res;
            self.printMessages();
        }
    };

    Constructor.prototype.createForm = function (containerWrap) {
        this._inputAuthor = document.createElement('input');
        this._inputAuthor.classList.add('b-i-name');

        this._inputAge = document.createElement('input');
        this._inputAge.classList.add('b-i-age');
        this._inputAge.setAttribute('type', 'number');

        this._inputMessage = document.createElement('textarea');
        this._inputMessage.classList.add('b-a-message');

        this._btnAdd = document.createElement('button');
        this._btnAdd.classList.add('btn-save');
        this._btnAdd.innerHTML = 'save';

        this._btnClear = document.createElement('button');
        this._btnClear.classList.add('btn-clear');
        this._btnClear.innerHTML = 'clear';

        this._outputSections = document.createElement('div');
        this._outputSections.classList.add('b-messages-wrap');


        containerWrap.appendChild(this._inputAuthor);
        containerWrap.appendChild(this._inputAge);
        containerWrap.appendChild(this._inputMessage);
        containerWrap.appendChild(this._btnAdd);
        containerWrap.appendChild(this._btnClear);
        containerWrap.appendChild(this._outputSections);
    };

    Constructor.prototype.render = function (objComment) {
        return '<div class="b-message-text">' + objComment.text +
            '</div>' +
            '<div class="b-author fl-right">' + objComment.author +
            '</div>' +
            '<div class="b-date fl-left">' + toNormalDate(objComment.date) +
            '</div>';
    };

    Constructor.prototype.saveMessage = function () {
        var message = {
            author: null,
            age: null,
            text: null
        };

        message.author = this._inputAuthor.value;
        message.age = this._inputAge.value;
        message.text = this._inputMessage.value;

        if (parseInt(message.age) > 18) {
            this._inputAge.classList.remove('brd-red');
            API._post('comment', message, this._callback());
            this._clearInput();
        } else {
            this._inputAge.classList.add('brd-red');
        }
    };

    Constructor.prototype._clearInput = function () {
        this._inputAuthor.value = '';
        this._inputAge.value = '';
        this._inputMessage.value = '';
    };

    Constructor.prototype.printMessages = function () {
        var messageContainer = null;
        var self = this;
        var _btnDelete = null;

        this._outputSections.innerHTML = '';

        this._messages.forEach(function (item, index) {
            messageContainer = document.createElement('div');
            _btnDelete = document.createElement('a');
            _btnDelete.classList.add('btn-delete');
            _btnDelete.text = 'x';

            messageContainer.appendChild(_btnDelete);
            messageContainer.innerHTML += self.render(item);

            messageContainer.classList.add('b-message-wrap');
            messageContainer.classList.add('clearfix');

            _btnDelete.addEventListener('click', function () {
                self.deleteItem(item.id);
            });

            messageContainer.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                self.edit(this, item.id, index);
            });

            self._outputSections.appendChild(messageContainer);

        });
    };

    Constructor.prototype.edit = function (htmlElem, id, itemIndex) {

        function toggleClasses(itemDelete, itemShow) {
            itemShow.classList.remove('hide');
            itemDelete.parentNode.removeChild(itemDelete);
        }

        var textArea = document.createElement('textarea');
        var textToEdit = htmlElem.querySelector('.b-message-text');
        var self = this;

        textToEdit.classList.add('hide');
        textArea.classList.add('ta-edit');

        htmlElem.insertBefore(textArea, textToEdit);

        textArea.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                if (!!this.value && e.shiftKey) {
                    self._messages[itemIndex].text = this.value;
                    API._put('comment', self._messages[itemIndex], self._messages[itemIndex].id, self._callback());
                }
                return;
            }

            if (e.keyCode === 27) {
                toggleClasses(textArea, textToEdit);
            }
        });

        textArea.onblur = function () {
            toggleClasses(textArea, textToEdit);
        };

        textArea.focus();
        textArea.value = self._messages[itemIndex].text;

    };

    Constructor.prototype.deleteItem = function (id) {
        API._delete('comment', id, this._callback());
    };

    Constructor.prototype.init = function () {
        var self = this;

        this._btnAdd.addEventListener('click', function () {
            self.saveMessage();
        });


    };

    return Constructor;
})();




