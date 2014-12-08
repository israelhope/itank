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
*		showval: Muestra el valor actual del tanque. Default false.
*		units: Unidades de lectura, se mostrará solo si showval es true. Default ''.
*		decimals: Numero de decimales, solo se mostrará solo si showval es true. Default 0.
*		duration: Duración de la animación en milisegundos, Default 400.
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
		value:0,
		showval: false,
		units: '',
		decimals:0,
		duration:400
	};
	$.fn.itank = function(options, param1){

		var c_settings = {};
		$.extend(c_settings, settings);
		if(typeof options === "object")
			$.extend(c_settings, options);

		if(options === "getValue")
			return getValue(this);

		this.each(function(){
			var element = $(this); /* Single element */
			/* Customize settings apply to individual element */
			/* This settings are modified by data attributes */
			var i_settings = getCustomProps(element, c_settings);

			_init(element, i_settings);

			if(typeof options === "number" || !isNaN(parseInt(options)))
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
			el.append('<div class="midly"><div class="inner"><div class="desc'+( (options.showval) ? "" : " noshow" )+'"><span>'+options.value+'</span>'+options.units+'</div></div></div>');
			$.each(options, function(i, val){
				el.data(i, val);
			})
			el.data("value", options.min); // Se establece el valor inicial (cero)
			update(el, options.value);
		}
	}
	function update(el, value){
		var max = el.data('max');
		var min = el.data('min');

		if(value > max)
			value = max
		if(value < min)
			value = min

		var oldv = getValue(el);
		var el_txt = el.find('.inner>.desc span');
		var round = Math.pow(10, el.data('decimals'));
		
		el.find('.inner').animate({
			height: parseInt(((value - min) / (max - min))*100)+'%'
		},
		{
			duration: el.data('duration'),
			queue:false,
			progress:function(animation, progress, remainingMs){
				var vact = Math.round(((value - oldv) * progress + oldv) * round) / round ;
				el_txt.text(vact);
				el.data('value', vact);
			}
		}); 
	}
	function getValue(el){
		return el.data('value');
	}
	function getCustomProps(el, c_settings){
		return $.extend({}, c_settings, getPropData(el));
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