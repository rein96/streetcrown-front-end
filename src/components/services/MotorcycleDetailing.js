import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'

class MotorcycleDetailing extends Component {

    async componentWillMount(){
        var result = await Swal.fire({
            title: 'Motorcycle Detailing Form is under construction',
            text: "Take a look of our Car Detailing Service or Detailing Equipment !",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5cb85c',
            cancelButtonColor: '#343A40',
            confirmButtonText: 'Car Detailing',
            cancelButtonText : 'Detailing Equipment'
          })
          console.log(result)

        if (result.value) {
            return this.props.history.push('/cardetailing')
        } else {
            return this.props.history.push('/products')
        }
    }

    render() {
        return (
            <div>
                <center>
                <img src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"  
                    className="img-fluid"
                     />

                </center>
                   
            </div>
        )
    }
}

export default withRouter(MotorcycleDetailing)
