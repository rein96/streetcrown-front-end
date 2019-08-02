import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addProduct, getProducts, deleteProduct, editProduct } from '../../actions/index'


class ManageProducts extends Component {

    state = {
        edit : false
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

        // window.location.reload()
    }

    // deleteProductButton = async (productID) => {
    //    await this.props.deleteProduct(productID)
    //    await this.props.getProducts()
    // }

    editProductButton = async (productID) => {
        await this.props.editProduct(productID)
        
    }

    renderProductList = () => {
        let render = this.props.productsSTATE.map(product => {
            return (
                <tr key={product.id}>
                    {/* <th scope="col">{product.id}</th> */}
                    <th scope="col">{product.name}</th>
                    <th scope="col">{product.category}</th>
                    <th scope="col">{product.description}</th>
                    <th scope="col">{product.price}</th>
                    <th scope="col">
                        <img src={`http://localhost:2019/products/${product.image}`} style={{ width: "150px" }} />
                    </th>
                    <th scope="col">
                        <button className="btn btn-warning" onClick={ () => this.editProductButton(product.id)}>Edit</button>
                        <button className="btn btn-danger"  onClick={ () => this.deleteProductButton(product.id, product.name, product.category, product.description, product.price )}>Delete</button>
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
                                                    <input placeholder="Product Name" ref={input => this.productName = input} className="form-control mb-2" type="text" required/>
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
                                                    <input placeholder="Product Price" ref={input => this.productPrice = input} className="form-control mb-2" type="number" required />
                                                </form>

                                                Description :
                                                <form className="input-group">
                                                    <textarea placeholder="Product Description" ref={input => this.productDescription = input} className="form-control mb-2" type="text" style={{ height: "200px" }} required/>
                                                </form>

                                                Picture :
                                                <input type='file' className="custom-file" ref={input => this.productPicture = input} required /> 

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
                                {/* render all products */}
                                {this.renderProductList()}

                            </tbody>
                        </table>

                    </div>      {/* end div col */}
                    
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
