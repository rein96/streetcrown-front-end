import React, { Component } from 'react'

import '../css/products.css'


class Products extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }


    render() {
        return (
            // Category and Price Filter column
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-2 mt-2 ">
                        <div className="card make-me-sticky">
                            <article className="card-group-item mt-3">
                                <header className="card-header bg-danger"><h6 className="title text-white"> Category </h6></header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">
                                    <a href="#" className="list-group-item">Exterior <span className="float-right badge badge-light round">10</span> </a>
                                    <a href="#" className="list-group-item">Interior  <span className="float-right badge badge-light round">5</span>  </a>
                                    <a href="#" className="list-group-item">Engine <span className="float-right badge badge-light round">4</span>  </a>
                                    </div>  
                                </div>
                            </article> 
                            <article className="card-group-item">
                                <header className="card-header bg-danger">
                                    <h6 className="title text-white">Price Range Input</h6>
                                </header>
                                    <div className="filter-content">
                                        <div className="card-body">
                                            <div className="form-row">
                                            <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                            <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                            <button onClick={this.onBtnSearch} className="btn btn-outline-danger btn-block mt-5">Search</button>
                                        
                                            </div>
                                        </div>
                                    </div>
                            </article> 
                        </div> 
                    </div>

                    {/* render getProducts() */}
                    <div className="row col-10">




                        {/*  HARD CODE */}
                        <div className="card col-11 col-sm-5 col-md-3 col-lg-3 m-3" key={this.props.key}>
                            <img src="https://www.myborosil.com/media/catalog/product/cache/image/890x660/949a03ce40949dc22ecdcbf899e10376/1/0/109_borosil_drinking_water_glass_bottle_freezer_proof_flame_fridge_.jpg" className="card-img-top" alt="Gambar"/>
                            <div className='card-body'>
                                <h5 className='card-title'> Product Title </h5>
                                <p className='card-text'> Glass Cleaner </p>
                                {/* <p className='card-text'> {this.props.product.desc} </p> */}
                                <p className='card-text'> Rp. 150.000 </p>
                                
                                <button className="btn btn-danger btn-block" >Detail</button>
                            </div>
                        </div>


                        <div className="card col-11 col-sm-5 col-md-3 col-lg-3 m-3" key={this.props.key}>
                            <img src="https://www.myborosil.com/media/catalog/product/cache/image/890x660/949a03ce40949dc22ecdcbf899e10376/1/0/109_borosil_drinking_water_glass_bottle_freezer_proof_flame_fridge_.jpg" className="card-img-top" alt="Gambar"/>
                            <div className='card-body'>
                                <h5 className='card-title'> Product Title </h5>
                                <p className='card-text'> Glass Cleaner </p>
                                {/* <p className='card-text'> {this.props.product.desc} </p> */}
                                <p className='card-text'> Rp. 150.000 </p>
                                
                                <button className="btn btn-danger btn-block" >Detail</button>
                            </div>
                        </div>



                        <div className="card col-11 col-sm-5 col-md-3 col-lg-3 m-3" key={this.props.key}>
                            <img src="https://www.myborosil.com/media/catalog/product/cache/image/890x660/949a03ce40949dc22ecdcbf899e10376/1/0/109_borosil_drinking_water_glass_bottle_freezer_proof_flame_fridge_.jpg" className="card-img-top" alt="Gambar"/>
                            <div className='card-body'>
                                <h5 className='card-title'> Product Title </h5>
                                <p className='card-text'> Glass Cleaner </p>
                                {/* <p className='card-text'> {this.props.product.desc} </p> */}
                                <p className='card-text'> Rp. 150.000 </p>
                                
                                <button className="btn btn-danger btn-block" >Detail</button>
                            </div>
                        </div>


                        <div className="card col-11 col-sm-5 col-md-3 col-lg-3 m-3" key={this.props.key}>
                            <img src="https://www.myborosil.com/media/catalog/product/cache/image/890x660/949a03ce40949dc22ecdcbf899e10376/1/0/109_borosil_drinking_water_glass_bottle_freezer_proof_flame_fridge_.jpg" className="card-img-top" alt="Gambar"/>
                            <div className='card-body'>
                                <h5 className='card-title'> Product Title </h5>
                                <p className='card-text'> Glass Cleaner </p>
                                {/* <p className='card-text'> {this.props.product.desc} </p> */}
                                <p className='card-text'> Rp. 150.000 </p>
                                
                                <button className="btn btn-danger btn-block" >Detail</button>
                            </div>
                        </div>


                        <div className="card col-11 col-sm-5 col-md-3 col-lg-3 m-3" key={this.props.key}>
                            <img src="https://www.myborosil.com/media/catalog/product/cache/image/890x660/949a03ce40949dc22ecdcbf899e10376/1/0/109_borosil_drinking_water_glass_bottle_freezer_proof_flame_fridge_.jpg" className="card-img-top" alt="Gambar"/>
                            <div className='card-body'>
                                <h5 className='card-title'> Product Title </h5>
                                <p className='card-text'> Glass Cleaner </p>
                                {/* <p className='card-text'> {this.props.product.desc} </p> */}
                                <p className='card-text'> Rp. 150.000 </p>
                                
                                <button className="btn btn-danger btn-block" >Detail</button>
                            </div>
                        </div>


                        <div className="card col-11 col-sm-5 col-md-3 col-lg-3 m-3" key={this.props.key}>
                            <img src="https://www.myborosil.com/media/catalog/product/cache/image/890x660/949a03ce40949dc22ecdcbf899e10376/1/0/109_borosil_drinking_water_glass_bottle_freezer_proof_flame_fridge_.jpg" className="card-img-top" alt="Gambar"/>
                            <div className='card-body'>
                                <h5 className='card-title'> Product Title </h5>
                                <p className='card-text'> Glass Cleaner </p>
                                {/* <p className='card-text'> {this.props.product.desc} </p> */}
                                <p className='card-text'> Rp. 150.000 </p>
                                
                                <button className="btn btn-danger btn-block" >Detail</button>
                            </div>
                        </div>


                        <div className="card col-11 col-sm-5 col-md-3 col-lg-3 m-3" key={this.props.key}>
                            <img src="https://www.myborosil.com/media/catalog/product/cache/image/890x660/949a03ce40949dc22ecdcbf899e10376/1/0/109_borosil_drinking_water_glass_bottle_freezer_proof_flame_fridge_.jpg" className="card-img-top" alt="Gambar"/>
                            <div className='card-body'>
                                <h5 className='card-title'> Product Title </h5>
                                <p className='card-text'> Glass Cleaner </p>
                                {/* <p className='card-text'> {this.props.product.desc} </p> */}
                                <p className='card-text'> Rp. 150.000 </p>
                                
                                <button className="btn btn-danger btn-block" >Detail</button>
                            </div>
                        </div>
                        {/* HARD CODE */}
                        
        


                        
                    </div>

                </div>    
            </div>
        )
    }
}

export default Products
