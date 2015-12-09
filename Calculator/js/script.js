/**
 * Created by 1 on 13.10.2015.
 */

(function () {

    var CalculatorClass = (function () {
        var number;
        var resultEval = 0;
        var action = {
            symbol: '',
            pushed: true
        };

        function Calculator(wrap) {
            this.wrap = document.querySelector(wrap);
            this.evalBox = document.createElement('input');
            this.numList = [];
            this.actionList = [];
            this.evalBtn = document.createElement('div');
        }

        Calculator.prototype.init = function () {
            var i;
            var ul;
            var self = this;

            this.evalBox.classList.add('eval-box');
            this.evalBox.setAttribute('readonly','true');
            this.evalBox.setAttribute('value', '0');
            this.wrap.appendChild(this.evalBox);

            ul = document.createElement('ul');
            ul.classList.add('num-list');
            for (i = 0; i < 10; i += 1) {
                this.numList[i] = document.createElement('li');
                this.numList[i].classList.add('num');
                this.numList[i].innerHTML = (i < 9) ? i+1 : 0;
                ul.appendChild(this.numList[i]);
            }
            this.wrap.appendChild(ul);

            ul = document.createElement('ul');
            ul.classList.add('action-list');
            for (i = 0; i < 4; i += 1) {
                this.actionList[i] = document.createElement('li');
                this.actionList[i].classList.add('action');
                switch (i) {
                    case 0:
                        this.actionList[i].innerHTML = '+';
                        break;
                    case 1:
                        this.actionList[i].innerHTML = '-';
                        break;
                    case 2:
                        this.actionList[i].innerHTML = '*';
                        break;
                    case 3:
                        this.actionList[i].innerHTML = '/';
                        break;
                }
                ul.appendChild(this.actionList[i]);
            }
            this.wrap.appendChild(ul);

            this.evalBtn.classList.add('eval');
            this.evalBtn.innerHTML = '=';
            this.wrap.appendChild(this.evalBtn);

            bindEvent(this.numList, 'click', function () {
                clickOnNumbers(self, this);
            });
            bindEvent(this.actionList, 'click', function () {
                clickOnActions(self, this);
            });

            this.evalBtn.addEventListener('click',function () {
                evalResult(self);
            });

        };

        Calculator.prototype.addToEvalBox = function (symToAdd) {
            this.evalBox.value += String(symToAdd);
        };

        Calculator.prototype.eraseEvalBox = function () {
            this.evalBox.value = '';
        };

        Calculator.prototype.getCurrentNum = function () {
            return Number(this.evalBox.value);
        };

        //событие для кнопки "числа"
        function clickOnNumbers(self, numberBox) {
            var symToAdd = numberBox.innerHTML;

            if (action.pushed) {
                self.eraseEvalBox();
                action.pushed = false;
            }

            self.addToEvalBox(symToAdd);
        }

        //событие для кнопки "действие"
        function clickOnActions(self, actionBox) {
            number = self.getCurrentNum();
            action.pushed = true;

            if (action.symbol === '') {
                resultEval = number;
                action.symbol = actionBox.innerHTML;
            } else {
                resultEval = toCalculate(resultEval, action.symbol, number);
                action.symbol = actionBox.innerHTML;
            }

            self.evalBox.value = String(resultEval);
        }

        //вычисление результата
        function toCalculate(numberA, symbol, numberB) {
            var actions = {
                '+': numberA + numberB,
                '-': numberA - numberB,
                '*': numberA * numberB,
                '/': numberA / numberB
            };

            return actions[symbol];
        }

        //событие для кнопки "равно"
        function evalResult(self) {
            number = self.getCurrentNum();
            action.pushed = true;
            resultEval = toCalculate(resultEval, action.symbol, number);

            action.symbol = '';
            self.evalBox.value = String(resultEval);

            resultEval = 0;
        }

        //Привязка кнопок к действиям
        function bindEvent(buttons, action, handler) {
            var i;

            for (i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener(action, handler);
            }
        }

        return Calculator;
    })();

    var calculator = new CalculatorClass('.calculator');
    calculator.init();
    var calculator2 = new CalculatorClass('.calc2');
    calculator2.init();

})();
