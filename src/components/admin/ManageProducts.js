import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct, getProducts, deleteProduct, editProduct } from '../../actions/index'

import Spinner from '../Spinner'

class ManageProducts extends Component {

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
        let productName = this.productName.value
        let productCategory = this.selectedCategory.value
        let productPrice = this.productPrice.value      //string
        let productDescription = this.productDescription.value
        let productPicture = this.productPicture.files[0]
        console.log(productDescription)

        if(productName.length === 0) { return alert('Please input the product name') }
        if(productPrice.length === 0) { return alert('Please input the product price') }
        if(productDescription.length === 0) { return alert('Please input the description') }
        if(productPicture === undefined) { return alert('Please Choose File to upload a product image')}
        if(productPicture.size > 1000000 ) { return alert('Maximal Product Image size is 1 MB') }

        const formData = new FormData()

        formData.append('name', productName)
        formData.append('category', productCategory)
        formData.append('price', productPrice)
        formData.append('description', productDescription)
        formData.append('productImage', productPicture)     //multerProductConfiguration.single('productImage') productRouter.js
        // console.log(productName, productCategory, productPrice, productDescription, productPicture )

        await this.props.addProduct(formData)
        await this.props.getProducts()

        this.productName.value = ''
        this.productPrice.value = ''
        this.productDescription.value = ''
    }

    deleteProductButton = async (productID) => {
       await this.props.deleteProduct(productID)
       await this.props.getProducts()
    }

    renderProductList = () => {
        let render = this.props.productsSTATE.map(product => {
            let { id, name, category, description, price, image } = product
            return (
                <tr key={id}>
                    {/* <th scope="col">{product.id}</th> */}
                    <th scope="col"><p>{name}</p></th>
                    <th scope="col">{category}</th>
                    <th scope="col"><p>{description}</p></th>
                    <th scope="col">{price}</th>
                    <th scope="col">
                        <img src={`http://localhost:2019/products/${image}`} style={{ width: "150px" }} />
                    </th>
                    <th scope="col">
                        {/* <button className="btn btn-warning" onClick={ async () => this.editProductModal(id, name, category, description, price, image)} data-toggle="modal" data-target="#editProductModal" >Edit</button> */}
                        <Link to={`/editproduct/${id}`} >
                            <button className="btn btn-warning" >Edit</button>
                        </Link>

                        <button className="btn btn-danger"  onClick={ () => this.deleteProductButton(id)}>Delete</button>
                    </th>
                </tr>
            )
        })

        return render
    }


    render() {

        if (this.props.objectUser.is_admin === 0 || this.props.objectUser.username === '') {
            return <h1>Access Denied</h1>
        }

        return (
            <div>
                
                <br/> <center> <h2> Manage Products </h2> </center>

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
                        { this.props.productsSTATE.length === 0 && <Spinner /> }
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

const mapStateToProps = state => ({
        productsSTATE: state.product.products,
        objectUser: state.auth
})

export default connect(mapStateToProps, { addProduct, getProducts, deleteProduct, editProduct })(ManageProducts);
