import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import { editProduct, editProductImage, deleteProductImage } from '../../actions/index'

const imageStyle = {
    width: '200px'
}

class EditProduct extends Component {

    state = {
        selectedProduct : []    // [ { id, name, category, price, image, description} ]
    }
   
    async componentWillMount() {
        // Define the parameter at App.js, and called from ManageProducts.js
        let productID = this.props.match.params.productID   // STRING NOT NUMBER
        let selectedProduct = this.props.productsSTATE.filter( product => product.id == productID )
        console.log(selectedProduct)
        await this.setState( { selectedProduct : selectedProduct } )
        console.log(this.state.selectedProduct)

        if(selectedProduct.length === 0){ 
            alert('You cannot direct edit using URL, please select product from Manage Product Dashboard')
        }
    }

    categoryOptions = () => {
        const categories = ['Exterior','Interior','Engine']
        let result = categories.map( (category) => {
            const defaultCategory = this.state.selectedProduct[0].category
            if(defaultCategory == category){
                return <option value={defaultCategory} selected>{defaultCategory}</option>
            }
            return (
                <option value={category}>{category}</option>
            )
        })

        return result
    };

    updateProduct = async () => {
        const productID = this.state.selectedProduct[0].id
        const productName = this.productName.value
        const productCategory = this.selectedCategory.value
        const productPrice = this.productPrice.value
        const productDescription = this.productDescription.value

        console.log(productName,productCategory, productPrice, productDescription)

        const resdata = await this.props.editProduct(productID, productName, productCategory, productPrice, productDescription)
        console.log(resdata)
        if(resdata.affectedRows){
            return (
                this.props.history.push('/manageproducts')
            )
        }
    }

    editProductImageBtn = async () => {

        const newImage = this.productImage.files[0]
        console.log(newImage)
        const { id, name } = this.state.selectedProduct[0]
        console.log(name)

        if(newImage){
            console.log('newImage is exist')
            const formData = new FormData()

            formData.append('name', name)
            formData.append('productImage', newImage)     //multerProductConfiguration.single('productImage') productRouter.js
    
            // DELETE
            const resdata1 = await this.props.deleteProductImage(id)
            console.log(resdata1)
    
            const resdata2 = await this.props.editProductImage(id, formData)
            console.log(resdata2)   // full updated [ {} ]
    
            await this.setState( { selectedProduct : resdata2 } )

        }


        
        // const resdata = await this.props.editProductImage(id, name, newImage)
        // console.log(resdata)
    }

    render() {

        if(this.state.selectedProduct.length === 1) {
            const { id, name, category, price, description, image } = this.state.selectedProduct[0]
            
            return (
                <div>
                    {/* Edit Product */}
                    <div className='jumbotron container'>
                        <h1>Edit Product</h1>
                        <div>
                            <img src={`http://localhost:2019/products/${image}`} style={imageStyle}  />
                            <p> Upload to edit image <input type='file' className="custom-file" ref={input => this.productImage = input} onChange={ () => this.editProductImageBtn() } />  </p> 
                            
                        </div>
                        

                            <form onSubmit={this.pressEnterUpdate}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input ref={input => this.productName = input} defaultValue={name} type="text" className="form-control" id="name"  />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Category</label>
                                    <select class="custom-select" name="selectedCategory" ref={input => this.selectedCategory = input} >
                                        {this.categoryOptions()}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <input placeholder="Product Price" ref={input => this.productPrice = input} defaultValue={price} className="form-control mb-2" type="number" required />
                                </div>

                                <div className="form-group">
                                    <textarea placeholder="Product Description" ref={input => this.productDescription = input} defaultValue={description} className="form-control mb-2" type="text" style={{ height: "200px" }} required/>
                                </div>

                            </form>
                            
                            <button
                                className='btn btn-primary'
                                onClick={this.updateProduct}
                            >Update Product</button>


                        </div>
                </div>
            )
        } else {
            return <Redirect to='/manageproducts' />
        } 
    }
}

const mapStateToProps = state => ({
    objectUser : state.auth,
    productsSTATE: state.product.products,
})

export default withRouter(connect(mapStateToProps, { editProduct, editProductImage, deleteProductImage } )(EditProduct))
