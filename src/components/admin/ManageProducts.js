import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addProduct, getProducts, deleteProduct, editProduct } from '../../actions/index'


class ManageProducts extends Component {

    state = {
        // editProductObj: {}
        id:0 , name: '', category: '', description: '', price: 0, image : ''
    }

    async componentDidMount() {
        await this.props.getProducts()
    }

    categoryOptions = () => {
        const categories = ['Exterior','Interior','Engine']
        let result = categories.map( (category) => {
            return (
                <option value={category}>{category}</option>
            )
        })

        return result
    };

    addProduct = async () => {
        const productName = this.productName.value
        const productCategory = this.selectedCategory.value
        const productPrice = this.productPrice.value
        const productDescription = this.productDescription.value
        const productPicture = this.productPicture.files[0]

        const formData = new FormData()

        formData.append('name', productName)
        formData.append('category', productCategory)
        formData.append('price', productPrice)
        formData.append('description', productDescription)
        formData.append('productImage', productPicture)     //multerProductConfiguration.single('productImage') productRouter.js
        // console.log(productName, productCategory, productPrice, productDescription, productPicture )

        await this.props.addProduct(formData)
        await this.props.getProducts()
    }

    deleteProductButton = async (productID) => {
       await this.props.deleteProduct(productID)
       await this.props.getProducts()
    }

    // LAH KOK MESTI ASYNC AWAIT ???
    editProductModal = async (id, name, category, description, price, image) => {

        await this.setState( { id, name, category, description, price : parseFloat(price), image } )

        console.log(id, name, category, description, price, image)

        console.log(this.state.price)
        
    }

    editProductButton = () => {
        // console.log(this.productNameEdit.value)
        // console.log(this.selectedCategoryEdit.value)
        // console.log(this.productPriceEdit.value)
        console.log(this.state.price)
    }

    renderProductList = () => {
        let render = this.props.productsSTATE.map(product => {
            let { id, name, category, description, price, image } = product
            return (
                <tr key={id}>
                    {/* <th scope="col">{product.id}</th> */}
                    <th scope="col">{name}</th>
                    <th scope="col">{category}</th>
                    <th scope="col">{description}</th>
                    <th scope="col">{price}</th>
                    <th scope="col">
                        <img src={`http://localhost:2019/products/${image}`} style={{ width: "150px" }} />
                    </th>
                    <th scope="col">
                        <button className="btn btn-warning" onClick={ () => this.editProductModal(id, name, category, description, price, image)} data-toggle="modal" data-target="#editProductModal" >Edit</button>
                        <button className="btn btn-danger"  onClick={ () => this.deleteProductButton(id)}>Delete</button>
                    </th>
                </tr>
            )
        })

        return render
    }



    render() {

        return (
            <div>

                <div className="row mt-5">
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        {/* Input Product */}
                        <h3 className=" text-center">Input Product</h3>
                        <div className="card">
                                <header className="card-header bg-dark">
                                    <h6 className="title text-white">Add Product</h6>
                                </header>
                                    <div className="filter-content">
                                        <div className="card-body">
                                            <div className="form-row">

                                                {/* <form onSubmit={this.pressEnterAddProduct}> */}
                                                    Name :
                                                    <form className="input-group">
                                                        <input placeholder="Product Name" ref={input => this.productName = input} className="form-control mb-2" type="text" required/>
                                                    </form>

                                                    Category : 
                                                    <form className="input-group">
                                                        <select class="custom-select" name="selectedCategory" ref={input => this.selectedCategory = input} >
                                                            {this.categoryOptions()}
                                                        </select>
                                                    </form>

                                                    Price :
                                                    <form className="input-group">
                                                        <input placeholder="Product Price" ref={input => this.productPrice = input} className="form-control mb-2" type="number" required />
                                                    </form>

                                                    Description :
                                                    <form className="input-group">
                                                        <textarea placeholder="Product Description" ref={input => this.productDescription = input} className="form-control mb-2" type="text" style={{ height: "200px" }} required/>
                                                    </form>

                                                    Picture :
                                                    <input type='file' className="custom-file" ref={input => this.productPicture = input} required /> 

                                                {/* </form> */}



                                                <button onClick={this.addProduct} className="btn btn-outline-danger btn-block mt-5">Add</button>
                                        
                                            </div>
                                        </div>
                                    </div>
                            </div> 

                    </div> {/* end div col */}

                    <div className="col"> 

                        {/* List Products */}
                        <h3 className=" text-center">Product List</h3>
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
                                {/* render all products */}
                                {this.renderProductList()}

                            </tbody>
                        </table>

                    </div>      {/* end div col */}


                    {/*  */}
                    <div className="modal fade" id="editProductModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="form-row">


    Name :
    <form className="input-group">
        <input defaultValue={this.state.name}  placeholder="Product Name" ref={input => this.productNameEdit = input} className="form-control mb-2" type="text" required/>
    </form>

    Category : 
    <form className="input-group">
        <select defaultValue={this.state.category} class="custom-select" name="selectedCategory" ref={input => this.selectedCategoryEdit = input} >
            {this.categoryOptions()}
        </select>
    </form>

    Price :
    <form className="input-group">
        <input placeholder="Product Price" ref={input => this.productPriceEdit = input}  defaultValue={this.state.price} className="form-control mb-2" type="number" required />
    </form>

    Description :
    <form className="input-group">
        <input type="text" placeholder="Product Description" ref={input => this.productDescriptionEdit = input} className="form-control mb-2" style={{ height: "100px" }} defaultValue={this.state.description} />
    </form>


<button onClick={this.editProductButton} className="btn btn-outline-danger btn-block mt-5">Edit</button>

</div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                    
                </div>  {/* end div row */}

            </div>  // end div container
        )
    }
}

const mapStateToProps = state => {
    return {
        productsSTATE: state.product.products
    }
}

export default connect(mapStateToProps, { addProduct, getProducts, deleteProduct, editProduct })(ManageProducts);
