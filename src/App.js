import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import './css/home.css';
import SlotComponent from './SlotComponent';
import {Navbar,NavbarToggler,NavbarBrand} from 'reactstrap'

const weekday=new Array(7);
  weekday[0]="Sunday";
  weekday[1]="Monday";
  weekday[2]="Tuesday";
  weekday[3]="Wednesday";
  weekday[4]="Thursday";
  weekday[5]="Friday";
  weekday[6]="Saturday";
const options = [
  { value: '1', label: 'Pawan' },
  { value: '8', label: 'Dr Ambanna Gowda' }
];

class App extends Component {
  
  constructor(props){
    
    super(props);
    
    this.state = {isClicked: false,
                  message:'',
                  serviceFor:'',
                  slotsDisplay:1,
                  list: null,
                  day: 0,
                  selectedSlot:null,
                  appointment_date:new Date(),
                  selectedDoctor:null};
    
    this.handleSlotClick = this.handleSlotClick.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.apptDateChange = this.apptDateChange.bind(this);
    this.docChange = this.docChange.bind(this);
  }

  apptDateChange(date){
    this.setState({
      appointment_date: date, day:weekday[date.getDay()]
    },function(){
      this.fetchSlots();
    });
    
  }
  
  docChange(selectedDoctor){
    this.setState({ selectedDoctor },function(){
      this.fetchSlots();
    });
  }

  getFormattedDate(date){
      
      let day = date.getDate(),month = date.getMonth(), year = date.getFullYear();
      month+=1;
      date = year+"-"+month+"-"+day;
      return date;
  }

  handlePayment(){

      // Get doctor id,appointment date,slot id,
      let slotid = this.state.selectedSlot;
      let date = this.getFormattedDate(this.state.appointment_date);
      
      fetch(`http://admin.cureassist.co/api/doctor/book/slot?id=${encodeURIComponent(slotid)}&appointment_date=${encodeURIComponent(date)}`,{
          method:"POST"
      }).then(response => response.json())
        .then(
          (result) => {
            
              let retVal = window.confirm('Proceeding to razorpay');
              let status = 3;
              if(retVal===true){
                  status = 3;
              }
              else{
                  status = 4;
              }
              
              let bookingid = result.booking_id;
              let paymentid = "rzp_1234";
              
              fetch(`http://localhost:8000/api/doctor/slot/status/update?appointment_id=${encodeURIComponent(bookingid)}&payment_id=${encodeURIComponent(paymentid)}&status=${encodeURIComponent(status)}`,{method:"POST"})
              .then(response => response.json())
              .then(
                (result) => {
                  this.setState({selectedSlot:null},function(){
                    this.fetchSlots();
                  })
                  
                },(error) => {
                  this.fetchSlots();
                }
              );

          },(error) => {
            console.log(error);
          }
        );
  }

  componentDidMount(){
    // this.fetchSlots();
    this.setState({
      day:weekday[new Date().getDay()]
    },function(){
      this.fetchSlots();
    });
  }

    fetchSlots(){
      
      let doctor_id = (this.state.selectedDoctor==null)?null:this.state.selectedDoctor.value;
      let appointment_date = this.getFormattedDate(this.state.appointment_date);
      
      fetch(`http://localhost:8000/api/doctor/slot?appointment_date=${appointment_date}&doctor_id=${encodeURIComponent(doctor_id)}`)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.hasOwnProperty("slots")){
            this.setState({list:result.slots})
          }
        },(error) => {
          console.log(error);
        }
      );
    }

  handleSlotClick(event){
    
    let prevSelectedSlot = this.state.selectedSlot;
    let currSelectedSlot = event.currentTarget.dataset.id;

    let isBooked = event.currentTarget.getAttribute('data-booked');

    if(isBooked=="booked")return;

    if(prevSelectedSlot==currSelectedSlot){
      this.setState({selectedSlot:null},function(){
      });
    }
    else{
        this.setState({selectedSlot:event.currentTarget.dataset.id},function(){
          let currSelectedSlot = this.state.selectedSlot;
      });
    }
  }


  slotDisplay = (slots, key) => {

    let slot_class = (this.state.selectedSlot==slots.id)?"slot_selected":"slot_deselected";
    
    return (
      <React.Fragment key={key}>
        <td data-id={slots.id} className={slot_class} style={slots.isBooked?{color:"red"}:{color:"green"}} 
            onClick={(e) => this.handleSlotClick(e)}>{slots.start_time}-{slots.end_time}
        </td>
      </React.Fragment>
    )
  }

  render() {
    const { list } = this.state;
    return (
      
      <div className="container">
          <Navbar style={{backgroundColor:"#3fc1be"}} light expand="md">
              <NavbarBrand href="/">
                  <img src="https://4.s.portea.com/wp-content/uploads/2015/04/logo-portea.png"/>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle}></NavbarToggler>
          </Navbar>
          <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center">
                        Select slots for Doctor
                    </h2>
                
                <Select className="selectwidth"
                  onChange={this.docChange}
                  options={options}/>
                
                <DatePicker selected={this.state.appointment_date} onChange={this.apptDateChange} minDate={new Date()}/>

                <SlotComponent selectedSlot={this.state.selectedSlot} list={this.state.list} day={this.state.day}
                    handleSlotClick={this.handleSlotClick}/>
                </div>    
          </div>
          <button  className="btn btn-lg btn-success float-right" onClick={this.handlePayment}>Proceed to Pay</button>
      </div>
    );
  }
}

export default App;
