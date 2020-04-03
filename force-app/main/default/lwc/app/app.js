import { LightningElement, track, api } from 'lwc';
import createContactRecord from '@salesforce/apex/ContactController.createContactRecord';




export default class App extends LightningElement {

    @track nombre = '';
    @track apellido = '';
    @track correo = '';
    

    actualizaNombre(event){
        this.nombre = event.target.value;
    }
    actualizaApellido(event){
        this.apellido = event.target.value;
    }
    actualizaCorreo(event){
        this.correo = event.target.value;
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




VALOR_COMIDA=50;
@track value = [''];
@track cantidadComidas= 0;
@track money = 0;
date = Date.now();
nameOpportunity = "nueva oportunidad"

    insertarOpportunity(){
        let opot = {'sobjectType': 'Opportunity'};
        opot.Name = this.nameOpportunity;
        opot.CloseDate = this.date;
        opot.Amount = this.cantidadComidas*VALOR_COMIDA;

        createOpportunityRecord({newRecord: opot})
        .then(result => {
            this.recordId = result;
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            this.error = error;
        });


    }


    dobleInsercion(){

        this.insertarContacto();
        this.insertarOpportunity();
        
    }

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




}
