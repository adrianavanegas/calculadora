var calculadora = {	
	display: document.getElementById("display"),
	valorDisplay: "0",
	
	init: (function(){
		this.asignarEventoTeclas(".tecla");
		this.asignarEventoFuncion();
	}),
	asignarEventoTeclas: function(selector){
		var teclaNum = document.querySelectorAll(selector);
		for (var i = 0; i<teclaNum.length;i++) {
			teclaNum[i].onclick = this.eventoReducir;
			teclaNum[i].onmouseleave = this.eventoRecuperar;
		};
	},
	eventoReducir: function(event){
		calculadora.reducir(event.target);
	},
	eventoRecuperar: function(event){
		calculadora.recuperar(event.target);
	},		
	reducir: function(elemento){
		var teclaNum = elemento.id;
		if (teclaNum=="1" || teclaNum=="2" || teclaNum=="3" || teclaNum=="0" || teclaNum=="igual" || teclaNum=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "61px";
		} else if(teclaNum=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "90%";
		} else {
			elemento.style.width = "21%";
			elemento.style.height = "61px";
		}
	},
	recuperar: function(elemento){
		var teclaNum = elemento.id;
		
		if (teclaNum=="1" || teclaNum=="2" || teclaNum=="3" || teclaNum=="0" || teclaNum=="igual" || teclaNum=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(teclaNum=="mas") {
			elemento.style.width = "100%";
			elemento.style.height = "100%";
		} else {
			elemento.style.width = "22%";
			elemento.style.height = "62.91px";
		}
	},
	asignarEventoFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {
			calculadora.ingresoNumero("0");
		});
		document.getElementById("1").addEventListener("click", function() {
			calculadora.ingresoNumero("1");
		});
		document.getElementById("2").addEventListener("click", function() {
			calculadora.ingresoNumero("2");
		});
		document.getElementById("3").addEventListener("click", function() {
			calculadora.ingresoNumero("3");
		});
		document.getElementById("4").addEventListener("click", function() {
			calculadora.ingresoNumero("4");
		});
		document.getElementById("5").addEventListener("click", function() {
			calculadora.ingresoNumero("5");
		});
		document.getElementById("6").addEventListener("click", function() {
			calculadora.ingresoNumero("6");
		});
		document.getElementById("7").addEventListener("click", function() {
			calculadora.ingresoNumero("7");
		});
		document.getElementById("8").addEventListener("click", function() {
			calculadora.ingresoNumero("8");
		});
		document.getElementById("9").addEventListener("click", function() {
			calculadora.ingresoNumero("9");
		});
		document.getElementById("on").addEventListener("click", function() {
			calculadora.borrar();
		});
		document.getElementById("sign").addEventListener("click", function() {
			calculadora.negativo();
		});
		document.getElementById("punto").addEventListener("click", function() {
			calculadora.decimal();
		});
		document.getElementById("igual").addEventListener("click", function() {
			calculadora.verResultado();
		});
		document.getElementById("dividido").addEventListener("click", function() {
			calculadora.calcular("/");
		});
		document.getElementById("por").addEventListener("click", function() {
			calculadora.calcular("*");
		});
		document.getElementById("menos").addEventListener("click", function() {
			calculadora.calcular("-");
		});
		document.getElementById("mas").addEventListener("click", function() {
			calculadora.calcular("+");
		});
	},
	borrar: function(){ 
	    this.valorDisplay = "0";
		this.operacion = "";
		this.resultado = 0;
		this.updateDisplay();
	},	
	negativo: function(){
		if (this.valorDisplay !="0") {
			var aux;
			if (this.valorDisplay.charAt(0)=="-") {
				aux = this.valorDisplay.slice(1);
			}	else {
				aux = "-" + this.valorDisplay;
			}
		this.valorDisplay = "";
		this.valorDisplay = aux;
		this.updateDisplay();
		}
	},	
	decimal: function(){
		if (this.valorDisplay.indexOf(".")== -1) {
			if (this.valorDisplay == ""){
				this.valorDisplay = this.valorDisplay + "0.";
			} else {
				this.valorDisplay = this.valorDisplay + ".";
			}
			this.updateDisplay();
		}
	},	
	ingresoNumero: function(valor){
		if (this.valorDisplay.length < 8) {		
			if (this.valorDisplay=="0") {
				this.valorDisplay = "";
				this.valorDisplay = this.valorDisplay + valor;
			} else {
				this.valorDisplay = this.valorDisplay + valor;
			}
		this.updateDisplay();
		}
	},	
	calcular: function(operation){
		this.num1 = parseFloat(this.valorDisplay);
		this.valorDisplay = "";
		this.operacion = operation;
		this.igual = false;
		this.updateDisplay();
	},	
	verResultado: function(){
		if(!this.igual){
			this.num2 = parseFloat(this.valorDisplay);
			this.num3 = this.num2;
			this.realizarCalculo(this.num1, this.num2, this.operacion);		
		} else {
			this.realizarCalculo(this.num1, this.num3, this.operacion);
		}
		this.num1 = this.resultado;
		this.valorDisplay = "";
		if (this.resultado.toString().length < 9){
			this.valorDisplay = this.resultado.toString();
		} else {
			this.valorDisplay = this.resultado.toString().slice(0,8) + "...";
		}
		this.igual = true;		
		this.updateDisplay();
	},	
	realizarCalculo: function(num1, num2, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(num1 + num2);
			break;
			case "-": 
				this.resultado = eval(num1 - num2);
			break;
			case "*": 
				this.resultado = eval(num1 * num2);
			break;
			case "/": 
				this.resultado = eval(num1 / num2);
		}
	},	
	updateDisplay: function(){
		this.display.innerHTML = this.valorDisplay;
	}	
};
calculadora.init();