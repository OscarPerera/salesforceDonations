import { LightningElement, track, api } from 'lwc';
import createContactRecord from '@salesforce/apex/ContactController.createContactRecord';

//Comienza sección que involucra a la inserción del objeto






export default class App extends LightningElement {

    @track nombre = '';
    @track apellido = '';
    @track correo = '';
    @track value = [''];
    @track cantidadComidas= 0;
    @track money = 0;

    @track buttonStatefulState = false;
    @track buttonIconStatefulState = false;
    
    
    
    
    
        openmodal() {
            this.openmodel = true
        }
        closeModal() {
            this.openmodel = false
        } 
        saveMethod() {
            alert('Guardado');
            this.closeModal();
        }
    
       actualizaNombre(event){
            this.nombre = event.target.value;
        }
        actualizaApellido(event){
            this.apellido = event.target.value;
        }
        actualizaCorreo(event){
            this.correo = event.target.value;
        }
        
    
    
    
    /* nuevo metodo para validar campos funciona con el required del html*/
    
    darClick(evt) {
        console.log('Valor de la entrada: ' + evt.target.value);
    
        const todoValido = [...this.template.querySelectorAll('lightning-input')].reduce((validado, entradasFaltantes) => {
                        entradasFaltantes.reportValidity();
                        return validado && entradasFaltantes.checkValidity();
            }, true);
        if (todoValido) {
            alert('Todo esta correcto');
            this.openmodel = true
            /*Este es el metodo de oscar, lo llame en esta parte si no funciona.. copiar todo lo que esta dentro
            de insertarContacto arriba de this.openmodel = true */
            insertarContacto(); 
           
        } else {
            alert('Reintenta de nuevo..');
        }
    }
    
    
    
    
       
        insertarContacto(){
        
            let cont = { 'sobjectType': 'Contact' };
            cont.FirstName = this.nombre;
            cont.LastName = this.apellido;
            cont.Email = this.correo;
    
            createContactRecord({newRecord: cont})
            .then(result => {
                this.recordId = result;
                console.log(result);
            })
            .catch(error => {
                console.log(error);
                this.error = error;
            });
    
        }
    
    
    
    
    //Finaliza Sección
    
       get options() {
            return [
                { label: 'Facebook', value: 'option1' },
                { label: 'Twitter', value: 'option2' },
            ];
        }
    
        get selectedValues() {
            return this.value.join(',');
        }
    
        handleChange(e) {
            this.value = e.detail.value;
        }
    
           comidasSeleccionadas(event) {
           
            const buttonNumber = event.target.dataset.buttonNumber;
            this.cantidadComidas = event.target.value;
            this.money = 0;
        }
    
        equivalenciaDolar(event) {
          
        this.money = event.target.value*this.cantidadComidas;
    
        }
    
        equivalenciaPeso(event) {
          
        this.money = event.target.value*this.cantidadComidas;
    
        }
    
    
    
    
        
    
    
     icono = {
            picture: 'direccion de logo'
        };
    
    /*
    
        handleButtonStatefulClick() {
            this.buttonStatefulState = !this.buttonStatefulState;
        }
    
        handleButtonIconStatefulClick() {
            this.buttonIconStatefulState = !this.buttonIconStatefulState;
        }
    
    */
    }
    