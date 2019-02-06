import React from 'react';
import './App.css';
import './css/home.css';

class SlotComponent extends React.Component{

    slotDisplay = (slots, key) => {
    if(slots==null) return (
      <React.Fragment>
        <td>-</td>
      </React.Fragment>
    ) 

    let slot_class = (this.props.selectedSlot==slots.id)?"slot_selected":"slot_deselected";
    return (
      <React.Fragment key={key}>
        <td data-id={slots.id} data-booked={slots.isBooked?"booked":"free"} className={slot_class} style={slots.isBooked?{color:"red",cursor:"not-allowed"}:{color:"green"}} 
            onClick={(e) => this.props.handleSlotClick(e)}>{slots.start_time}-{slots.end_time}
        </td>
      </React.Fragment>
    )
  }

    displayEmptySlots(){
      return(
      <React.Fragment>
          <td data-title="Monday">-</td>
          <td data-title="Tuesday">-</td>
          <td data-title="Wednesday">-</td>
          <td data-title="Thursday">-</td>
          <td data-title="Friday">-</td>
          <td data-title="saturday">-</td>
        </React.Fragment>);
    }

    render() {
        const { list,day } = this.props;
        
        return (

                <div id="no-more-tables">
                    <table className="col-sm-12 table table-bordered table-striped table-condensed cf">
                        <tbody>
                          { list
                            ? 
                            <React.Fragment>
                              {
                                day
                                ? (day === 'Monday') && <tr>
                                    <td data-id="day_1">Monday</td>
                                    {
                                      list.hasOwnProperty("MONDAY")? 
                                      list.MONDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                    }
                                  </tr>
                                : <tr>
                                    <td data-id="day_1">Monday</td>
                                    {
                                      list.hasOwnProperty("MONDAY")? 
                                      list.MONDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                    }
                                  </tr>
                              }
                              {
                                day
                                ? (day === 'Tuesday') && <tr>
                                  <td data-id="day_2">Tuesday</td>
                                    {
                                      list.hasOwnProperty("TUESDAY")? 
                                      list.TUESDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                    }
                                  </tr>
                                : <tr>
                                  <td data-id="day_2">Tuesday</td>
                                    {
                                      list.hasOwnProperty("TUESDAY")? 
                                      list.TUESDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                    }
                                  </tr>
                              }
                              { day
                                ? (day === 'Wednesday') && 
                                <tr>
                                  <td data-id="day_3">Wednesday</td>
                                  {
                                    list.hasOwnProperty("WEDNESDAY")? 
                                    list.WEDNESDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                  }
                                </tr>
                                : <tr>
                                  <td data-id="day_3">Wednesday</td>
                                  {
                                    list.hasOwnProperty("WEDNESDAY")? 
                                    list.WEDNESDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                  }
                                </tr>
                              }
                              { day
                                ? (day === 'Thursday') && 
                                <tr>
                                    <td data-id="day_4">Thursday</td>
                                    {
                                      list.hasOwnProperty("THURSDAY")? 
                                      list.THURSDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                    }
                                </tr>
                                : <tr>
                                    <td data-id="day_4">Thursday</td>
                                    {
                                      list.hasOwnProperty("THURSDAY")? 
                                      list.THURSDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                    }
                                </tr>
                              }
                              
                              { day
                                ? (day === 'Friday') && 
                                <tr>
                                  <td data-id="day_5">Friday</td>
                                  {
                                    list.hasOwnProperty("FRIDAY")? 
                                    list.FRIDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                  }
                                  
                                </tr>
                                : <tr>
                                  <td data-id="day_5">Friday</td>
                                  {
                                    list.hasOwnProperty("FRIDAY")? 
                                    list.FRIDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                  }
                                  
                                </tr>
                              }
                              
                              { day
                                ? (day === 'Saturday') && 
                                <tr>
                                  <td data-id="day_6">Saturday</td>
                                    {
                                      list.hasOwnProperty("SATURDAY")? 
                                      list.SATURDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                    }
                                </tr>
                                : <tr>
                                  <td data-id="day_6">Saturday</td>
                                    {
                                      list.hasOwnProperty("SATURDAY")? 
                                      list.SATURDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                    }
                                </tr>
                              }
                              { day
                                ? (day === 'Sunday') && 
                                <tr>
                                  <td data-id="day_0">Sunday</td>
                                    {
                                      list.hasOwnProperty("SUNDAY")? 
                                      list.SUNDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                    }
                                </tr>
                                : <tr>
                                  <td data-id="day_0">Sunday</td>
                                    {
                                      list.hasOwnProperty("SUNDAY")? 
                                      list.SUNDAY.map((item, key) => this.slotDisplay(item, key)):this.displayEmptySlots()
                                    }
                                </tr>
                              }
                            </React.Fragment>
                            : <tr><td>no data</td></tr>
                          }
                    </tbody>
                  </table>
                </div>
        );
  }
}

export default SlotComponent;