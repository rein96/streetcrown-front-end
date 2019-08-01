import React, { Component } from 'react'

class ManageProducts extends Component {

    // state = {
    //     categorySelected : ''
    // }

    categoryOptions = () => {
        const categories = ['Exterior','Interior','Engine']
        let result = categories.map( category => {
            return (
                <option value={category}>{category}</option>
            )
        })

        return result
    };

    // handleChange = (event) => {
    //     this.setState({ [event.target.name] : event.target.value })
    //     console.log(this.state.categorySelected);
    // }

    addProduct = () => {
        const productName = this.productName.value
        const productCategory = this.selectedCategory.value
        const productPrice = this.productPrice.value
        const productDescription = this.productDescription.value
        const productPicture = this.productPicture.files[0]

        
        console.log(productName, productCategory, productPrice, productDescription, productPicture )
    }



    render() {

        return (
            <div>

                <div className="row mt-5">
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        {/* Input Product */}
                        <h1 className=" text-center">Input Product</h1>
                        <div className="card">
                                <header className="card-header bg-dark">
                                    <h6 className="title text-white">Add Product</h6>
                                </header>
                                    <div className="filter-content">
                                        <div className="card-body">
                                            <div className="form-row">
                                                Name :
                                                <form className="input-group">
                                                    <input placeholder="Product Name" ref={input => this.productName = input} className="form-control mb-2" type="text" />
                                                </form>

                                                Category : 
                                                <form className="input-group">
                                                    <select class="custom-select" name="selectedCategory" ref={input => this.selectedCategory = input} >
                                                        {this.categoryOptions()}
                                                        {/* <option selected>Open this select menu</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option> */}
                                                    </select>
                                                </form>

                                                Price :
                                                <form className="input-group">
                                                    <input placeholder="Product Name" ref={input => this.productPrice = input} className="form-control mb-2" type="number" />
                                                </form>

                                                Description :
                                                <form className="input-group">
                                                    <textarea placeholder="Product Description" ref={input => this.productDescription = input} className="form-control mb-2" type="text" style={{ height: "200px" }} />
                                                </form>

                                                Picture :
                                                <input type='file' className="custom-file" ref={input => this.productPicture = input}  /> 

                                                <button onClick={this.addProduct} className="btn btn-outline-danger btn-block mt-5">Add</button>
                                        
                                            </div>
                                        </div>
                                    </div>
                            </div> 

                    </div> {/* end div col */}

                    <div className="col"> 

                        {/* List Products */}
                        <h1 className=" text-center">List Product</h1>
                        <table className="table table-hover mb-5">
                            <thead>
                                <tr>
                                    {/* <th scope="col">ID</th> */}
                                    <th scope="col">NAME</th>
                                    <th scope="col">CATEGORY</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                    
                                {/* {this.renderList()} */}

                            </tbody>
                        </table>

                    </div>      {/* end div col */}
                    

                </div>  {/* end div row */}





                    



            </div>  // end div container
        )
    }
}

export default ManageProducts
