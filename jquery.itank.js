/**
*	Libreria Javascript para simular el nivel de un tanque.
*	Version 1.0.0
*	Author: Israel Rocha (@israel_hope)
*	MIT license
*	Require jQuery
*
* 	Funcionamiento: 
*	$('.mitanque').itank();
*	$('.mitanque').itank(50); // equivalente a $('.mitanque').itank("setValue", 50);
*	$('.mitanque').itank({min:0, max:100, value:50});
*	$('.mitanque').itank("getValue"); // return 50
*
*	Opciones
*		min: Establece el minimo valor del contenedor o tanque. Default 0.
*		max: Establece el máximo valor del contenedor o tanque. Default 100.
*		value: Establece el valor del nivel del tanque. Default 0.
*
*	Funciones
*		setValue: Establece el valor del tanque
*		getValue: Devuelve el valor del tanque
*
**/

(function($){
			/* Defaul global settings */
			var settings = {
				min: 0,
				max: 100,
				value:0
			};
			$.fn.itank = function(options, param1){

				if(typeof options === "object")
					$.extend(settings, options);

				if(options === "getValue")
					return getValue(this);

				this.each(function(){
					var element = $(this); /* Single element */
					/* Customize settings apply to individual element */
					/* This settings are modified by data attributes */
					var c_settings = getCustomProps(element);

					_init(element, c_settings);

					if(typeof options === "number")
						update(element, options);

					if(options === "setValue" && typeof param1 !== "undefined")
						update(element, param1)

				});
				return this;
			}
			
			function _init(el, options){
				if(el.data('inited') !== true){
					el.data('inited', true);
					el.addClass('itank-wrap');
					el.append('<div class="midly"><div class="inner"></div></div>');
					$.each(options, function(i, val){
						el.data(i, val);
					})
					update(el, options.value);
				}
			}
			function update(el, value){
				el.data('value', value);
				el.find('.inner').animate({
					height: Math.min(parseInt((value/el.data('max'))*100),100)+'%'
				},300);
			}
			function getValue(el){
				return el.data('value');
			}
			function getCustomProps(el){
				return $.extend({}, settings, getPropData(el));
			}
			function getPropData(el){
				var res = {};
				$.each(settings, function(i, value){
					if(typeof el.data(i) !== "undefined"){
						res[i] = el.data(i);
					}
				});
				return res;
			}

		})(jQuery);